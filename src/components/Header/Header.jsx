import React, {useState} from 'react'
import GuideModal from '@/components/GuideModal';
import SettingsModal from '@/components/SettingsModal';
import { FaGithub } from 'react-icons/fa';
import DarkModeToggle from '@/components/DarkModeToggle';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import SearchFilter from '@/components/SearchFilter'

export default function Header({ resetBoard, searchTerm, setSearchTerm }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  return (
<header className='sticky top-0 z-50 backdrop-blur-md bg-[#08090c]/80 border-b border-zinc-800/40 w-full'>

    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='mx-auto flex w-full items-center justify-between px-6 py-3.5'
    >
      <div className='flex items-center gap-3.5 min-w-0'>
        <img 
          src={logo} 
          alt="Logo" 
          className='w-7 h-7 object-contain drop-shadow-[0_0_10px_rgba(99,102,241,0.2)] hover:scale-115 transition-transform duration-300'
          />
        
        <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
        <motion.h1
          className='text-sm font-semibold text-zinc-100 tracking-wide select-none truncate'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}  
        >
          Kanban Board
        </motion.h1>
        </div>
        <motion.p
          className='text-[11px] text-zinc-400 font-medium truncate hidden md:block mt-0.5'
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Plan, track and ship
        </motion.p>
        </div>
      </div>

      {/* Header menu */}
        <div className="hidden lg:flex items-center gap-1 bg-zinc-900/40 border border-zinc-800/40 p-1 rounded-xl mx-4">
          <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-100 shadow-sm transition-all">
            Board
          </button>
          <button className="text-xs font-medium px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-all cursor-not-allowed">
            Timeline
          </button>
          <button className="text-xs font-medium px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-all cursor-not-allowed">
            Calendar
          </button>
        </div>

    <div className='flex items-center gap-3 ml-auto sm:ml-0'>
          <div className="w-44 sm:w-60 md:w-72">
            <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

    <div 
    className='flex items-center justify-center gap-3'
    >
        <motion.a 
          href="https://github.com/JohannesL2/kanban-board"
          target='_blank'
          rel='noopener noreferrer'
          whileHover={{ scale: 1.2, color: "#4f46e5" }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 0 }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
          className='
            p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/50 text-zinc-400 hover:text-zinc-200 transition-all
          '
        >
          <FaGithub size={20} className='text-slate-700 dark:text-white'/>
        </motion.a>

        <motion.button 
        className='px-3 py-2 text-xs font-medium rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/50 text-zinc-300 hover:text-zinc-100 transition-all cursor-pointer
            ' 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        >
         Guide
        </motion.button>
        <motion.button 
        className='px-3 py-2 text-xs font-medium rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/50 text-zinc-300 hover:text-zinc-100 transition-all cursor-pointer
            ' 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSettingsOpen(true)}
        >
          Settings
        </motion.button>
      </div>

        <DarkModeToggle/>

        <GuideModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} resetBoard={resetBoard} />
      </div>
    </motion.div>
</header>
  )
}
