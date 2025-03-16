import React, { useState,} from "react";
import { Link, useNavigate} from "react-router-dom";
import {
  AlertCircle,
  Home,
  ArrowLeft,
  Search,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NotFoundProps {
  customMessage?: string;
  showSearch?: boolean;
  suggestionLinks?: Array<{ title: string; path: string }>;
}

const NotFoundPage: React.FC<NotFoundProps> = ({
  customMessage,
  showSearch = false,
  suggestionLinks = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Default suggestion links if none provided
  const defaultSuggestions = suggestionLinks.length
    ? suggestionLinks
    : [
        { title: "Dashboard", path: "/dashboard" },
        { title: "Profile", path: "/profile" },
        { title: "Settings", path: "/settings" },
      ];


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Navigate to search results page
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4 py-12">
      <motion.div
        className="max-w-md w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>

            <CardHeader className="text-center pt-8 pb-4">
              <motion.div
                className="flex justify-center mb-4"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: 2, repeatDelay: 8 }}
              >
                <div className="relative">
                  <AlertCircle className="h-16 w-16 text-destructive/90" />
                  <span className="absolute text-3xl font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    4
                  </span>
                </div>
              </motion.div>

              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                Page Not Found
              </CardTitle>

              <CardDescription className="text-muted-foreground mt-2">
                Oops! We've hit a digital dead end.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-6">
              <motion.p
                className="text-center text-muted-foreground"
                variants={itemVariants}
              >
                {customMessage ||
                  "The page you're looking for has vanished into the digital void. It may have been moved, deleted, or never existed in the first place."}
              </motion.p>

              {showSearch && (
                <motion.div className="space-y-3" variants={itemVariants}>
                  <h3 className="text-sm font-medium text-center">
                    Find what you're looking for:
                  </h3>
                  <form onSubmit={handleSearch} className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 border-muted-foreground/20"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button type="submit" size="icon" variant="default">
                            <Search className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Search</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </form>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <div className="bg-muted/30 rounded-lg p-4 border border-muted/50">
                  <div className="flex items-start space-x-2">
                    <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        You might want to try:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                        <li>Checking the URL for typos</li>
                        <li>Going back to the previous page</li>
                        <li>Starting fresh from the home page</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {defaultSuggestions.length > 0 && (
                <motion.div className="pt-2" variants={itemVariants}>
                  <h3 className="text-sm font-medium mb-3 text-center">
                    Popular destinations:
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {defaultSuggestions.map((link, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        asChild
                        className="rounded-full"
                      >
                        <Link to={link.path}>{link.title}</Link>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </CardContent>

            <CardFooter className="flex justify-center space-x-3 pb-6 pt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go Back</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button asChild className="px-6">
                <Link to="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleRefresh}
                      disabled={isAnimating}
                    >
                      <motion.div
                        animate={isAnimating ? { rotate: 360 } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refresh Page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
