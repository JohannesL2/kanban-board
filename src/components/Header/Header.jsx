import React, {useState} from 'react'
import GuideModal from '../GuideModal/GuideModal.jsx'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)


  return (
<header>
    <div>
        <h1 className='font-smooch text-5xl text-white tracking-wide drop-shadow-md'>Kanban Board</h1>
    </div>

    <div className='flex items-center justify-center gap-4 mt-12'>
        <button className='px-4 py-2 bg-black/20 text-white rounded-xl hover:bg-black/30 transition cursor-pointer' onClick={() => setIsOpen(true)}>How to use</button>
        <button className='px-4 py-2 bg-black/20 text-white rounded-xl hover:bg-black/30 transition cursor-pointer'>Settings</button>

        <GuideModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
</header>
  )
}
