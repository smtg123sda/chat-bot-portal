
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_STORAGE_KEY = "theme";

function getSystemTheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  // On mount, check for stored theme or system theme
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === "dark");
    } else {
      const system = getSystemTheme();
      setTheme(system);
      document.documentElement.classList.toggle('dark', system === "dark");
    }
  }, []);

  // Sync theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <button
      aria-label="Toggle Theme"
      className="p-2 rounded-md focus:outline-none hover:bg-accent transition-colors"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;
