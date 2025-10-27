"use client";

import React, { useState } from "react";
import { Menu, X, Github, Sun, Moon, LogOut } from "lucide-react";
import { Outlet } from 'react-router-dom'
import { useTheme } from "#cli/components/ui/theme-provider.jsx";

import {withMioloContext} from 'miolo-react'

const Layout= ({/*useSsrData,*/ logout}) => {

  // const [authType] = useSsrData('authType', 'guest')
  const {isDark, setTheme} = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for mobile, topbar for desktop */}
      <nav
        className={`fixed top-0 left-0 h-16 md:h-screen w-full md:w-16 bg-white dark:bg-gray-800 shadow-md z-40 transition-all duration-300 ${
          isMobileMenuOpen ? "h-screen" : "h-16 md:h-screen"
        }`}
      >
        <div className="container mx-auto h-full flex flex-col md:items-center p-4">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between h-16">
          <img src="static/img/miolo_logo.png"/>
          </div>

          {/* Navigation Links - Hidden on mobile when menu is closed */}
          <div
            className={`${
              isMobileMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:items-center gap-6 mt-8 md:mt-16`}
          >
            {/* GitHub Link */}
            <a
              href="https://github.com/afialapis/miolo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github size={20} />
              <span className="md:hidden ml-2">GitHub</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                setTheme(isDark ? 'light' : 'dark')
              }}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
            >
              {isDark ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} />
              )}
              <span className="md:hidden ml-2">
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            </button>


            {/* Logout */}
            <button
              onClick={() => {
                logout()
              }}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
            >
              <LogOut size={20} />
              <span className="md:hidden ml-2">
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            </button>            
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 md:pl-16 min-h-screen">
        <div className="p-4 md:p-8"><Outlet/></div>
      </main>
    </div>
  );
}

export default withMioloContext(Layout)