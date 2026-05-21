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
      bg-gradient-to-br
    from-slate-100
    via-slate-50
    to-slate-200
    dark:from-[#0f172a]
    dark:via-[#111827]
    dark:to-[#020617]
    text-slate-900
    dark:text-white
      transition-all
      duration-500
      '
    >
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
    
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
