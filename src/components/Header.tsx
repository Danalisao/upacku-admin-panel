import React from 'react';
import { Search, Bell, User, Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4">
      <div className="flex items-center justify-between max-w-[2000px] mx-auto">
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10
                         hover:from-primary/20 hover:to-secondary/20 transition-colors group">
            <span className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:animate-gradient">
              October 19, 2021
            </span>
          </div>
          <Sparkles className="w-5 h-5 text-secondary animate-pulse-slow" />
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search by date, name or ID..."
              className="w-80 pl-10 pr-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50
                       focus:outline-none focus:ring-2 focus:ring-primary/20 
                       bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300
                       group-hover:bg-white dark:group-hover:bg-gray-800 group-hover:shadow-soft
                       dark:text-gray-200 dark:placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                             group-hover:text-primary transition-colors" size={20} />
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300"
          >
            {isDark ? (
              <Sun className="text-gray-400 hover:text-yellow-500 transition-colors" size={20} />
            ) : (
              <Moon className="text-gray-600 hover:text-primary transition-colors" size={20} />
            )}
          </button>

          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 group">
            <Bell size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full animate-ping"></span>
          </button>

          <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-primary to-secondary 
                          flex items-center justify-center text-white shadow-lg
                          group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <User size={18} className="group-hover:rotate-12 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};