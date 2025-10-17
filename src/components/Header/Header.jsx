import React, {useState} from 'react'
import GuideModal from '@/components/GuideModal';
import SettingsModal from '@/components/SettingsModal';
import { FaGithub } from 'react-icons/fa';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Header({ resetBoard }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  return (
<header>
    <div>
        <h1 className='font-smooch text-5xl bg-zinc-300 text-zinc-800 font-extrabold dark:bg-zinc-800 dark:text-white py-8 text-white tracking-wide transition-colors duration-500'>Kanban Board</h1>
    </div>

    <div className='flex items-center justify-center gap-4 mt-12'>
        <a 
          href="https://github.com/JohannesL2/kanban-board"
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-500 dark:text-white dark:hover:text-gray-300 hover:text-black transition'
        >
          <FaGithub size={32} />
        </a>
        <button className='px-4 py-2 bg-black/20 text-white rounded-xl hover:bg-black/30 transition cursor-pointer' onClick={() => setIsOpen(true)}>How to use</button>
        <button className='px-4 py-2 bg-black/20 text-white rounded-xl hover:bg-black/30 transition cursor-pointer' onClick={() => setIsSettingsOpen(true)}>Settings</button>
        <DarkModeToggle/>

        <GuideModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} resetBoard={resetBoard} />
    </div>
</header>
  )
}
