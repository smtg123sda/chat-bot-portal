
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { cn } from "@/lib/utils";
import { News, Play, BookOpen, Settings, LogIn, User } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="hidden sm:inline">ChatBot Portal</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {user && (
            <>
              <Link 
                to="/news" 
                className={cn(
                  "nav-link flex items-center gap-1", 
                  isActive('/news') && "nav-link-active"
                )}
              >
                <News size={18} />
                <span className="hidden sm:inline">News</span>
              </Link>
              <Link 
                to="/play" 
                className={cn(
                  "nav-link flex items-center gap-1", 
                  isActive('/play') && "nav-link-active"
                )}
              >
                <Play size={18} />
                <span className="hidden sm:inline">Play</span>
              </Link>
              <Link 
                to="/learn" 
                className={cn(
                  "nav-link flex items-center gap-1", 
                  isActive('/learn') && "nav-link-active"
                )}
              >
                <BookOpen size={18} />
                <span className="hidden sm:inline">Learn</span>
              </Link>
              <Link 
                to="/settings" 
                className={cn(
                  "nav-link flex items-center gap-1", 
                  isActive('/settings') && "nav-link-active"
                )}
              >
                <Settings size={18} />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={cn(
                    "nav-link flex items-center gap-1", 
                    isActive('/admin') && "nav-link-active"
                  )}
                >
                  <User size={18} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}
            </>
          )}
          
          <div className="ml-4">
            {user ? (
              <Button variant="outline" onClick={logout}>Logout</Button>
            ) : (
              <Link to="/login">
                <Button className="flex items-center gap-2">
                  <LogIn size={16} />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
