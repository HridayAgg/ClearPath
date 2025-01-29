import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navigation2, Users, MapPin, Activity, Wind, User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const isActive = (path: string) => 
    location.pathname === path ? 'bg-purple-700' : 'hover:bg-purple-600 transition-all duration-300';

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              <Navigation2 
                className={`h-7 w-7 transform transition-all duration-300 ${
                  isHovered ? 'rotate-45 scale-110' : ''
                }`} 
              />
              {isHovered && (
                <div className="absolute -inset-1 bg-white/20 rounded-full blur animate-pulse" />
              )}
            </div>
            <span className="font-bold text-xl tracking-tight relative">
              ClearPath
              {isHovered && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              )}
            </span>
          </Link>
          
          <div className="flex space-x-4">
            {[
              { path: '/', icon: Activity, label: 'Dashboard' },
              { path: '/leaderboard', icon: Wind, label: 'Leaderboard' },
              { path: '/admin', icon: Users, label: 'Admin' },
              { path: '/public', icon: Navigation2, label: 'Public View' },
            ].map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 
                  ${isActive(path)} relative group overflow-hidden`}
              >
                <Icon className="h-4 w-4 transform group-hover:scale-110 transition-transform duration-300" />
                <span>{label}</span>
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            ))}

            {/* User Profile Logo */}
            <Link
              to="/userprofile"
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                location.pathname === '/userprofile' ? 'bg-purple-700' : 'hover:bg-purple-600'
              } transition-colors`}
            >
              <User className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;