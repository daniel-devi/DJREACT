import React from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LoadingProps {
  message?: string;
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
}

export const Loader: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "medium",
  fullScreen = false,
}) => {
  // Determine size of loader
  const getLoaderSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 40;
      case "medium":
      default:
        return 24;
    }
  };

  // For full screen loading
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <Card className="border shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
            <Loader2
              size={getLoaderSize()}
              className="animate-spin text-primary"
            />
            {message && (
              <p className="text-center text-muted-foreground">{message}</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Inline loading
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-2">
      <Loader2 size={getLoaderSize()} className="animate-spin text-primary" />
      {message && (
        <p className="text-center text-muted-foreground text-sm">{message}</p>
      )}
    </div>
  );
};

export default Loader;
