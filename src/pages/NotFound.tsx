import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="text-center">
        <p className="text-8xl font-extrabold text-gradient mb-4">404</p>
        <h1 className="text-xl font-bold text-foreground mb-2">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-8 font-medium max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/">
          <Button className="rounded-xl gradient-primary shadow-glow">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
