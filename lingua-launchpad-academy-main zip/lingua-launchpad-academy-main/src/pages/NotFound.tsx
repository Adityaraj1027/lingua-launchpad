
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { BookOpenText } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout hideFooter>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <BookOpenText className="h-16 w-16 text-primary mb-6" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Oops! It seems this page is lost in translation.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
