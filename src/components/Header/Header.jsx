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
<header className='sticky top-0 z-50
backdrop-blur-xl
bg-white/60
dark:bg-[#0f172a]/80
border-b border-white/10'>

    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4'
    >
      <div className='flex items-center gap-4'>
        <img src={logo} alt="" className='w-12 md:w-14 drop-shadow-md hover:scale-105 transition-transform duration-300'/>
        
        <div>
        <motion.h1
          className='font-smooch text-2xl md:text-3xl text-zinc-800 font-extrabold dark:text-white tracking-wide transition-colors duration-500 drop-shadow-lg'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}  
        >
          Kanban Board
        </motion.h1>

        <motion.p
          className='text-left text-gray-600 dark:text-gray-300 mt-2 md:mt-4 text-lg md:text-xl'
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Organize your tasks with ease
        </motion.p>
        </div>
      </div>
    <div className="hidden flex-1 max-w-xl lg:block">
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>

    <motion.div 
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
            rounded-2xl
            border border-white/10
            bg-white/50
            p-3
            shadow-lg
            backdrop-blur-xl
            dark:bg-white/5
          '
        >
          <FaGithub size={20} className='text-slate-700 dark:text-white'/>
        </motion.a>

        <motion.button 
        className='rounded-2xl
            border border-white/10
            bg-white/50
            px-5
            py-3
            text-sm
            font-medium
            shadow-lg
            backdrop-blur-xl
            transition-all
            hover:bg-white
            dark:bg-white/5
            dark:hover:bg-white/10
            cursor-pointer
            ' 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        >
         Guide
        </motion.button>
        <motion.button 
        className='rounded-2xl
            border border-white/10
            bg-white/50
            px-5
            py-3
            text-sm
            font-medium
            shadow-lg
            backdrop-blur-xl
            transition-all
            hover:bg-white
            dark:bg-white/5
            dark:hover:bg-white/10
            cursor-pointer
            ' 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSettingsOpen(true)}
        >
          Settings
        </motion.button>

        <DarkModeToggle/>

        <GuideModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} resetBoard={resetBoard} />
    </motion.div>
  </motion.div>
</header>
  )
}
