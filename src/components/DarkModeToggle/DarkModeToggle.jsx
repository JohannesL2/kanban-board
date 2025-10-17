import { LuMoon, LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme");
            if (saved) return saved === "dark";
            return window.matchMedia("(prefers-color-scheme: dark").matches;
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "");
        }
    }, [darkMode])

  return (
            <button 
            className="bg-transparent p-3 hover:bg-black/10 rounded-lg cursor-pointer dark:hover:bg-zinc-100/10 dark:text-white"
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? <LuSun className="text-2xl"/> : <LuMoon className="text-2xl" />}
            </button>
  )
}
