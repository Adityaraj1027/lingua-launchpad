
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  hideFooter?: boolean;
  className?: string;
}

export default function Layout({ children, requireAuth = false, hideFooter = false, className }: LayoutProps) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (requireAuth && !loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [requireAuth, isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={cn("flex-grow pt-16", className)}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
