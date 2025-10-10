import React from 'react'

export default function Header() {
  return (
<header>
    <div>
        <h1 className='font-smooch text-5xl text-white tracking-wide drop-shadow-md'>Kanban Board</h1>
    </div>

    <div className='flex items-center justify-center gap-4 mt-12'>
        <button className='px-4 py-2 bg-black/20 text-white rounded-xl hover:bg-black/30 transition cursor-pointer'>How to use</button>
        <button className='px-4 py-2 bg-black/20 text-white rounded-xl hover:bg-black/30 transition cursor-pointer'>Settings</button>
    </div>
</header>
  )
}
