import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface NotFoundProps {
  customMessage?: string;
  showSearch?: boolean;
}

const NotFoundPage: React.FC<NotFoundProps> = ({
  customMessage,
  showSearch = false,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality or navigation
    console.log("Search query:", searchQuery);
    // Navigate to search results page
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
      <div className="max-w-md w-full">
        <Card className="border shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold">
              404 - Page Not Found
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              {customMessage ||
                "We couldn't find the page you're looking for. The page may have been moved, deleted, or never existed."}
            </p>

            {showSearch && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Try searching instead:</h3>
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}

            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <p>
                If you believe this is an error, please contact our support
                team.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center space-x-4 pt-2">
            <Button variant="outline" asChild>
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>

            <Button asChild>
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NotFoundPage;
