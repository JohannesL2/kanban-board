import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function SearchFilter({searchTerm, setSearchTerm}) {
    const [isOpen, setIsOpen] = useState(false);


  return (
    <div className='w-full mb-4 relative'>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className='bg-black p-4'
        >
            <FaMagnifyingGlass className='text-white text-lg' />
        </button>

    {isOpen && (
    <div className='relative w-64'>
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
                className='absolute right-3 text-gray-500 top-1/2 -translate-y-1/2'
            >
                x
            </button>
        )}
        </div>
    )}
    </div>
  )
}
