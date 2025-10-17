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
    <main className='dark:bg-zinc-800'>
    <Header resetBoard={resetBoard} />
    <List sections={sections} setSections={setSections}/>
    </main>
    </div>
  )
}

export default App
