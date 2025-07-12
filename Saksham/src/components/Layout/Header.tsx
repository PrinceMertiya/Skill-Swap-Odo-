import React, { useState } from 'react';
import { User, Bell, Settings, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Discover', id: 'browse', description: 'Find talented people' },
    { name: 'Requests', id: 'requests', description: 'Manage your swaps' },
    { name: 'Profile', id: 'profile', description: 'Your skills & info' },
  ];

  if (isAdmin) {
    navigation.push({ name: 'Admin', id: 'admin', description: 'Platform management' });
  }

  const handleLogout = () => {
    logout();
    onPageChange('login');
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onPageChange('browse')}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-105">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full animate-pulse"></div>
            </div>
            <div className="ml-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                SkillForge
              </span>
              <p className="text-xs text-slate-500 font-medium">Exchange • Learn • Grow</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-slate-900 text-white shadow-medium'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {currentPage !== item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="relative p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-all duration-200 group">
              <Bell className="h-5 w-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
            
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center shadow-soft">
                  <span className="text-slate-700 font-semibold text-sm">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/50 py-6 animate-slide-down">
            <div className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-slate-900 text-white shadow-medium'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-xs text-slate-400">{item.description}</span>
                  </div>
                </button>
              ))}
              
              <div className="pt-4 border-t border-slate-200 mt-4">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
                    <span className="text-slate-700 font-semibold text-sm">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-2xl text-rose-600 hover:bg-rose-50 font-medium transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};