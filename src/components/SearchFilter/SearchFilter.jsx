import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchFilter({searchTerm, setSearchTerm}) {
    const [isOpen, setIsOpen] = useState(false);


  return (
    <div className='relative flex items-center'>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className='bg-black hover:bg-zinc-800 p-4 z-10 rounded-full shadow-md transition-colors group cursor-pointer'
        >
            <FaMagnifyingGlass className='text-white group-hover:scale-105 transition-transform' />
        </button>
<AnimatePresence>
    {isOpen && (
    <motion.div 
        className='absolute left-0 top-0'
        initial={{ x: -20, width: 0, opacity: 0 }}
        animate={{ x: 0, width: '16rem', opacity: 1 }}
        exit={{ x: -20, width: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ zIndex: 0 }}
    >
        <input 
            type="text"
            placeholder='Search for a task...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-64 pl-14 py-3 bg-white dark:text-black rounded-full shadow-sm focus:outline-none focus:shadow-md transition-shadow'
        />
        {searchTerm && (
            <button
                onClick={() => setSearchTerm("")}
                className='absolute right-3 text-gray-500 top-1/2 -translate-y-1/2'
            >
                x
            </button>
        )}
        </motion.div>
    )}
    </AnimatePresence>
    </div>
  )
}
