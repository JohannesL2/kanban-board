import { button } from 'framer-motion/client'
import React from 'react'

export default function SearchFilter({searchTerm, setSearchTerm}) {
  return (
    <div className='w-full mb-4 relative'>
        <input 
            type="text"
            placeholder='Search for a task...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full p-2 border rounded-lg'
        />
        {searchTerm && (
            <button
                onClick={() => setSearchTerm("")}
                className='absolute right-3 top-2 text-gray-500'
            >
                x
            </button>
        )}
    </div>
  )
}
