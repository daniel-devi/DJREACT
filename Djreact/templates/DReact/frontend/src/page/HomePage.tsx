import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Code,
  BarChart,
  Rocket,
  Book,
  Coffee,
  LogIn,
  UserPlus,
  MessageSquare,
  User,
  LogOut,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import checkAuth from "@/utils/CheckAuth";

interface ApiStatus {
  status: string;
  version: string;
  environment: string;
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [apiCallFailed, setApiCallFailed] = useState<boolean>(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!checkAuth()) return null;

      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/accounts/profile/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          handleLogout();
        }
        throw error;
      }
    },
    //enabled: checkAuth(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("API request timed out")), 3000)
        );

        const fetchPromise = new Promise<ApiStatus>((resolve) => {
          setTimeout(() => {
            resolve({
              status: "online",
              version: "1.0.0",
              environment: "development",
            });
          }, 1500);
        });

        const result = (await Promise.race([
          fetchPromise,
          timeoutPromise,
        ])) as ApiStatus;
        setApiStatus(result);
      } catch (error) {
        console.error("Error fetching API status:", error);
        setApiCallFailed(true);
      } finally {
        setLoading(false);
      }
    };

    fetchApiStatus();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("UserData");
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  };

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const UserData: string = localStorage.getItem("UserData");
    const UserInfo = JSON.parse(UserData);
    

    try {
      axios.post("http://127.0.0.1:8000/api/feedback", {
        user: UserInfo?.id,
        email: user?.email || "",
        feedback_type: "complaint",
        message: feedbackMessage,
      });
      setFeedbackSubmitted(true);
      setFeedbackMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const features = [
    {
      icon: <Code className="h-5 w-5" />,
      title: "TypeScript + React",
      description:
        "Modern frontend with type safety and improved developer experience. Includes shadcn/ui components.",
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      title: "Django REST Framework",
      description:
        "Powerful backend API with authentication, permissions, and a browsable API interface.",
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Fast Development",
      description:
        "Pre-configured tooling and best practices for rapid development and deployment.",
    },
    {
      icon: <Coffee className="h-5 w-5" />,
      title: "Developer Friendly",
      description:
        "Focus on what matters - building your app, not configuring infrastructure.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <motion.div
        className="bg-primary/10 py-2 px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          {user ? (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm">Welcome, {user.username}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Guest User</span>
          )}
          <div className="flex gap-2">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                  className="flex items-center gap-1"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRegister}
                  className="flex items-center gap-1"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Register</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto py-12 px-4 space-y-12">
        <motion.header
          className="text-center space-y-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            ReactDJ Boilerplate
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A modern boilerplate combining React TypeScript frontend with Django
            REST Framework backend
          </p>

          {loading ? (
            <div className="flex justify-center items-center gap-2 mt-4">
              <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <span className="text-sm text-muted-foreground">
                Connecting to API...
              </span>
            </div>
          ) : apiCallFailed ? (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Alert variant="destructive" className="max-w-md mx-auto">
                <AlertDescription className="flex items-center justify-center text-sm">
                  API connection failed, running in offline mode
                </AlertDescription>
              </Alert>
            </motion.div>
          ) : (
            apiStatus && (
              <motion.div
                className="mt-4 flex justify-center gap-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Badge
                  variant={
                    apiStatus.status === "online" ? "default" : "destructive"
                  }
                  className="animate-pulse"
                >
                  API {apiStatus.status}
                </Badge>
                <Badge variant="outline">v{apiStatus.version}</Badge>
                <Badge variant="secondary">{apiStatus.environment}</Badge>
              </motion.div>
            )
          )}
        </motion.header>

        <Tabs defaultValue="getting-started" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger
              value="getting-started"
              className="text-sm md:text-base"
            >
              <Rocket className="mr-2 h-4 w-4 hidden md:inline" />
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="features" className="text-sm md:text-base">
              <Code className="mr-2 h-4 w-4 hidden md:inline" />
              Features
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-sm md:text-base">
              <Book className="mr-2 h-4 w-4 hidden md:inline" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="account" className="text-sm md:text-base">
              <User className="mr-2 h-4 w-4 hidden md:inline" />
              Account
            </TabsTrigger>
          </TabsList>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <TabsContent value="getting-started">
              <motion.div variants={fadeIn}>
                <Card className="border shadow-lg">
                  <CardHeader className="bg-white rounded-t-lg">
                    <CardTitle className="text-2xl">
                      Quick Start Guide
                    </CardTitle>
                    <CardDescription>
                      Follow these steps to get your development environment set
                      up
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div className="p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Code className="mr-2 h-4 w-4" />
                        Frontend (React TypeScript)
                      </h3>
                      <pre className="bg-black text-white p-3 rounded-md text-sm overflow-x-auto">
                        <code>
                          cd frontend{"\n"}
                          npm install{"\n"}
                          npm run dev
                        </code>
                      </pre>
                    </div>

                    <div className="p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <h3 className="font-medium mb-2 flex items-center">
                        <BarChart className="mr-2 h-4 w-4" />
                        Backend (Django)
                      </h3>
                      <pre className="bg-black text-white p-3 rounded-md text-sm overflow-x-auto">
                        <code>
                          cd backend{"\n"}
                          python -m venv venv{"\n"}
                          source venv/bin/activate # On Windows:
                          venv\Scripts\activate
                          {"\n"}
                          pip install -r requirements.txt{"\n"}
                          python manage.py migrate{"\n"}
                          python manage.py runserver
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-white rounded-b-lg flex justify-between">
                    <Button className="group">
                      Open Documentation
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Help & Feedback
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Send Feedback</DialogTitle>
                          <DialogDescription>
                            Help us improve ReactDJ by sharing your experience
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleFeedbackSubmit}>
                          <div className="grid gap-4 py-4">
                            {feedbackSubmitted ? (
                              <Alert
                                variant={"default"}
                                className="bg-green-100 border-green-500 text-green-800"
                              >
                                <CheckCircle className="h-2 w-5" />
                                <AlertDescription>
                                  Feedback Received
                                </AlertDescription>
                              </Alert>
                            ) : (
                              ""
                            )}

                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="feedback">Feedback</Label>
                              <Textarea
                                id="feedback"
                                placeholder="Tell us what you think..."
                                className="min-h-32"
                                required
                                value={feedbackMessage}
                                onChange={(e) => {
                                  setFeedbackMessage(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" disabled={feedbackSubmitted}>
                              {feedbackSubmitted
                                ? "Thank you!"
                                : "Submit Feedback"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="features">
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="cursor-pointer"
                  >
                    <Card className="h-full border shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-lg">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <motion.div variants={fadeIn}>
                <Card className="border shadow-lg">
                  <CardHeader className="bg-white rounded-t-lg">
                    <CardTitle className="text-2xl">
                      Documentation & Resources
                    </CardTitle>
                    <CardDescription>
                      Helpful links and resources for your development journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 py-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="border shadow hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Code className="mr-2 h-4 w-4" />
                            Frontend Resources
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              React Documentation
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              TypeScript Handbook
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Tailwind CSS Guide
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Shadcn UI Components
                            </a>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border shadow hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <BarChart className="mr-2 h-4 w-4" />
                            Backend Resources
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Django Documentation
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Django REST Framework
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              JWT Authentication Guide
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Django Deployment
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border shadow hover:shadow-md transition-shadow mt-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Book className="mr-2 h-4 w-4" />
                          Tutorials & Guides
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Setting up JWT Authentication
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Creating Custom API Endpoints
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              React Query Data Fetching
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Styling with Tailwind CSS
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Deploying Your Application
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Testing React Components
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <CardFooter className="bg-white flex justify-between">
                      <Button variant="outline" className="group">
                        Community Forum
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button>GitHub Repository</Button>
                    </CardFooter>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="account">
              <motion.div variants={fadeIn}>
                <Card className="border shadow-lg">
                  <CardHeader className="bg-white rounded-t-lg">
                    <CardTitle className="text-2xl">
                      Account Information
                    </CardTitle>
                    <CardDescription>
                      View and manage your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-6">
                    {user ? (
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-medium">
                              {user.username}
                            </h3>
                            <p className="text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Card className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                Account Settings
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <Button
                                variant="outline"
                                className="w-full justify-start"
                              >
                                <User className="mr-2 h-4 w-4" />
                                Edit Profile
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start"
                              >
                                <Coffee className="mr-2 h-4 w-4" />
                                Preferences
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-destructive hover:text-destructive"
                              >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                API Access
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="p-3 bg-muted rounded-md">
                                <p className="text-xs font-mono truncate">
                                  {`access_token: ${localStorage
                                    .getItem("access_token")
                                    ?.substring(0, 10)}...`}
                                </p>
                                <p className="text-xs font-mono truncate">
                                  {`refresh_token: ${localStorage
                                    .getItem("refresh_token")
                                    ?.substring(10, 20)}...`}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                className="w-full justify-start"
                              >
                                <Code className="mr-2 h-4 w-4" />
                                View API Keys
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start"
                              >
                                <Rocket className="mr-2 h-4 w-4" />
                                Docs
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 space-y-4">
                        <div className="mx-auto rounded-full bg-primary/10 h-16 w-16 flex items-center justify-center">
                          <User className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-medium">Not Logged In</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Please login or register to view your account
                          information and access all features
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                          <Button onClick={handleLogin}>
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                          </Button>
                          <Button variant="outline" onClick={handleRegister}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Register
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>

        <motion.footer
          className="text-center pt-8 border-t mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ReactDJ Boilerplate. All rights
            reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};
export default HomePage;
