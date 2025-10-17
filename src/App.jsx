import { useState } from 'react'
import './App.css'
import Header from '@/components/Header';
import List from '@/components/List';

function App({setTitle, setMessage}) {
  const [sections, setSections] = useState([]);

    const resetBoard = () => {
    setSections([]);
    setTitle("");
    setMessage("");
  };

  return (
    <div>
    <main className='min-h-screen w-full bg-zinc-300 dark:bg-zinc-800 transition-colors duration-500'>
    <Header resetBoard={resetBoard} />
    <List sections={sections} setSections={setSections}/>
    </main>
    </div>
  )
}

export default App
