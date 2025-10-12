import { LuMoon, LuSun } from "react-icons/lu";
import { useState } from "react";

export default function DarkModeToggle() {
    const [ theme, setTheme ] = useState('');

  return (
    <div className={`${theme ? "dark" : ""} grid place-items-center`}>
        <div className="bg-white/50 dark:bg-zinc-800 p-2 rounded-xl">
            <button 
            className="bg-transparent p-3 hover:bg-black/10 rounded-lg cursor-pointer dark:hover:bg-zinc-100/10 dark:text-white"
                onClick={() => {
                    setTheme('')
                }}
            >
                <LuSun/>
            </button>

            <button 
            className="bg-transparent p-3 hover:bg-black/10 rounded-lg cursor-pointer dark:hover:bg-zinc-100/10 dark:text-white"
                onClick={() => {
                    setTheme('dark')
                }}
            >
                <LuMoon/>
            </button>
        </div>
    </div>
  )
}
