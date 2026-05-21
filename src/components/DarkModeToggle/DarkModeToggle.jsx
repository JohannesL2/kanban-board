import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DarkModeToggle() {
    const [ambientLight, setAmbientLight] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("ambient-light");
            return saved ? saved === "on" : true; // Standard är att ljuset är på
        }
        return true;
    });

    useEffect(() => {
    if (typeof window === "undefined") return;

    if (ambientLight) {
        // Om ljuset är PÅ, ta bort "off"-klassen
        document.documentElement.classList.remove("ambient-off");
        localStorage.setItem("ambient-light", "on");
    } else {
        // Om ljuset är AV, lägg till "off"-klassen så att CSS:en döljer dem
        document.documentElement.classList.add("ambient-off");
        localStorage.setItem("ambient-light", "off");
    }
}, [ambientLight]);

  return (
            <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setAmbientLight(!ambientLight)}
      className="p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/50 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer flex items-center justify-center w-8 h-8"
      title={ambientLight ? "Turn off background glow" : "Turn on background glow"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={ambientLight ? 'light-on' : 'light-off'}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {ambientLight ? (
            <LuLightbulb size={16} className="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
          ) : (
            <LuLightbulbOff size={16} className="text-zinc-500" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
