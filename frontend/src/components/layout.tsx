"use client";

import type React from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { isAuthenticated, removeToken } from "@/lib/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Task Manager
          </Link>
          <nav>
            {authenticated ? (
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <div className="space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
