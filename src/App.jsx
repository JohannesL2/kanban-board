import { useEffect, useState } from 'react'
import './App.css'
import Header from '@/components/Header';
import List from '@/components/List';

function App({setTitle, setMessage}) {
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem('sections');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections));
  }, [sections]);

    const resetBoard = () => {
    setSections([]);
    setTitle("");
    setMessage("");
  };

  return (
    <div>
    <main 
      className='
        min-h-screen
        overflow-hidden
        bg-[#08090c]
        text-slate-200
        transition-all
        duration-500
        pb-12
      '
    >
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-[40%] h-[300px] w-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
    
      <div className='relative z-10'>
        <Header 
          resetBoard={resetBoard}
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
        />
        <List 
          sections={sections} 
          setSections={setSections} 
          searchTerm={searchTerm}
        />
      </div>
    </main>
    </div>
  )
}

export default App
