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
    <div className="relative min-h-screen w-full bg-[#0d111b] text-slate-200">
      
      {/* Bakgrundsljus (Auror) - Nu med den nya, krispiga CSS-klassen */}
      <div className="bg-blur-glow top-[-10%] left-[-10%] h-[500px] w-[500px] bg-blue-600/10 blur-[120px]" />
      <div className="bg-blur-glow bottom-[-10%] right-[-10%] h-[500px] w-[500px] bg-indigo-500/10 blur-[120px]" />
      <div className="bg-blur-glow bottom-10 left-[40%] h-[300px] w-[400px] bg-purple-500/5 blur-[100px]" />
      
    <main className='relative z-10 min-h-screen w-full flex flex-col pb-12'>
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
    </main>
  </div>
  )
}

export default App
