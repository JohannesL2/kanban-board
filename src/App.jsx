import { useEffect, useState } from 'react'
import './App.css'
import Header from '@/components/Header';
import List from '@/components/List';
// Import database
import { db } from './db';

function App({setTitle, setMessage}) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Get data from Dexie
  useEffect(() => {
    async function loadData() {
      try {
        const savedSections = await db.sections.toArray();
        setSections(savedSections);
      } catch (error) {
        console.error("Could not read data from Dexie:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Save data to Dexie when sections are changed
  useEffect(() => {
    if (loading) return;

    async function saveData() {
      try {
      const sectionsCopy = structuredClone(sections);

      await db.sections.clear();
      await db.sections.bulkPut(sectionsCopy);
      } catch (error) {
        console.error("Could not save data to Dexie:", error);
      }
    }
    saveData();
  }, [sections, loading]);


    const resetBoard = async () => {
      await db.sections.clear();
      setSections([]);
      setTitle("");
      setMessage("");
    };

    if (loading) {
      return <div className="min-h-screen bg-[#0e1118] text-slate-200 flex items-center justify-center">Loading...</div>;
    }

  return (
    <div className="relative min-h-screen w-full bg-[#0e1118] text-slate-200">
      
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
