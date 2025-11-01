import { LuMoon, LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
            const saved = localStorage.getItem("theme");
            if (saved) return saved === "dark";
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode])

  return (
            <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="relative 
        flex items-center justify-center 
        w-12 h-12 
        rounded-full 
        bg-gradient-to-tr from-zinc-500 to-zinc-700 
        dark:from-yellow-500 dark:to-orange-400
        shadow-md 
        hover:shadow-lg 
        transition-all duration-300 
        text-white"
            >
                <motion.div
                    key={darkMode ? 'sun' : 'moon'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                {darkMode ? <LuSun className="text-2xl"/> : <LuMoon className="text-2xl" />}
                </motion.div>
            </motion.button>
  )
}
