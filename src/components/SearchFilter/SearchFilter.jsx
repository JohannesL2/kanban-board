import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchFilter({searchTerm, setSearchTerm}) {


  return (
    <div className='relative flex items-center w-full'>
        <div className='absolute left-3 pointer-events-none z-10 text-zinc-500'>
            <FaMagnifyingGlass size={13} />
        </div>

        <input 
            type="text"
            placeholder='Search for a task...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full 
          pl-9 
          pr-8 
          py-1.5 
          text-xs 
          bg-zinc-900/40 
          text-zinc-100 
          placeholder:text-zinc-500 
          rounded-xl 
          border 
          border-zinc-800/60 
          outline-none 
          focus:border-zinc-700 
          focus:bg-zinc-900/80
          transition-all 
          duration-200'
        />

        {searchTerm && (
            <button
                onClick={() => setSearchTerm("")}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs transition-colors cursor-pointer'
            >
                x
            </button>
        )}
        </div>
  )
}
