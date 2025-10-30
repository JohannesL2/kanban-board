import React, {useState} from 'react'
import GuideModal from '@/components/GuideModal';
import SettingsModal from '@/components/SettingsModal';
import { FaGithub } from 'react-icons/fa';
import DarkModeToggle from '@/components/DarkModeToggle';
import { motion } from 'framer-motion';

export default function Header({ resetBoard }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  return (
<header className='w-full px-4 py-6 md:py-12'>

        <motion.h1
          className='font-smooch text-5xl text-zinc-800 font-extrabold dark:text-white py-8 tracking-wide transition-colors duration-500 drop-shadow-lg'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}  
        >
          Kanban Board
        </motion.h1>

        <motion.p
          className='text-center text-gray-600 dark:text-gray-300 mt-2 md:mt-4 text-lg md:text-xl'
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Organize your tasks with ease
        </motion.p>

    <motion.div 
    className='flex items-center justify-center gap-4 mt-12'
    >
        <motion.a 
          href="https://github.com/JohannesL2/kanban-board"
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-500 dark:text-white'
          whileHover={{ scale: 1.2, color: "#4f46e5" }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 0 }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
        >
          <FaGithub size={32} />
        </motion.a>

        <motion.button 
        className='px-4 py-2 bg-black/20 text-white dark:bg-zinc-200 dark:hover:bg-zinc-300 dark:text-black rounded-xl hover:bg-black/30 transition cursor-pointer' 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        >
          How to use
        </motion.button>
        <motion.button 
        className='px-4 py-2 bg-black/20 text-white dark:bg-zinc-200 dark:hover:bg-zinc-300 dark:text-black rounded-xl hover:bg-black/30 transition cursor-pointer' 
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
</header>
  )
}
