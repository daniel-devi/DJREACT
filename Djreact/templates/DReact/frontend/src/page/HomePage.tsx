import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
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
import { ArrowRight, Github, Code, BarChart } from "lucide-react";
import Loading from "@components/Loader";

// Define types for our API data
interface ApiStatus {
  status: string;
  version: string;
  environment: string;
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);

  useEffect(() => {
    // Simulating API call to Django backend
    const fetchApiStatus = async () => {
      try {
        // In a real app, you would fetch from your Django API
        // const response = await fetch('/api/status/');
        // const data = await response.json();

        // Simulated API response
        setTimeout(() => {
          setApiStatus({
            status: "online",
            version: "1.0.0",
            environment: "development",
          });
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching API status:", error);
        toast({
          title: "Error",
          description: "Failed to connect to API. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchApiStatus();
  }, [toast]);

  if (loading) {
    return <Loading fullScreen message="Connecting to API..." />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          ReactDJ Boilerplate
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A modern boilerplate combining React TypeScript frontend with Django
          REST Framework backend
        </p>

        {apiStatus && (
          <div className="mt-4 flex justify-center gap-2">
            <Badge
              variant={
                apiStatus.status === "online" ? "default" : "destructive"
              }
            >
              API {apiStatus.status}
            </Badge>
            <Badge variant="outline">v{apiStatus.version}</Badge>
            <Badge variant="secondary">{apiStatus.environment}</Badge>
          </div>
        )}
      </header>

      <Tabs defaultValue="getting-started" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
              <CardDescription>
                Follow these steps to get your development environment set up
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <h3 className="font-medium mb-2">
                  Frontend (React TypeScript)
                </h3>
                <pre className="bg-black text-white p-3 rounded text-sm overflow-x-auto">
                  <code>
                    cd frontend{"\n"}
                    npm install{"\n"}
                    npm run dev
                  </code>
                </pre>
              </div>

              <div className="p-4 border rounded-md bg-muted/50">
                <h3 className="font-medium mb-2">Backend (Django)</h3>
                <pre className="bg-black text-white p-3 rounded text-sm overflow-x-auto">
                  <code>
                    cd backend{"\n"}
                    python -m venv venv{"\n"}
                    source venv/bin/activate # On Windows: venv\Scripts\activate
                    {"\n"}
                    pip install -r requirements.txt{"\n"}
                    python manage.py migrate{"\n"}
                    python manage.py runserver
                  </code>
                </pre>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                Open Documentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  TypeScript + React
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Modern frontend with TypeScript for type safety and improved
                  developer experience. Includes shadcn/ui components for
                  beautiful, accessible UI.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  Django REST Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Powerful backend API with Django REST Framework. Includes
                  authentication, permissions, and a browsable API interface.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Helpful Resources</CardTitle>
              <CardDescription>
                Links to documentation and community support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Github className="mr-2 h-5 w-5 mt-0.5" />
                  <span>
                    <a
                      href="https://github.com"
                      className="text-primary font-medium hover:underline"
                    >
                      Project Repository
                    </a>
                    <p className="text-muted-foreground text-sm">
                      Access source code, report issues, and contribute
                    </p>
                  </span>
                </li>

                <li className="flex items-start">
                  <Code className="mr-2 h-5 w-5 mt-0.5" />
                  <span>
                    <a
                      href="https://ui.shadcn.com"
                      className="text-primary font-medium hover:underline"
                    >
                      shadcn/ui Documentation
                    </a>
                    <p className="text-muted-foreground text-sm">
                      Learn about the UI components used in this project
                    </p>
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Join Community</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
