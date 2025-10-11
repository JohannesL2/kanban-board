import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import List from './components/List/List'

function App({setTitle, setMessage}) {
  const [sections, setSections] = useState([]);

    const resetBoard = () => {
    setSections([]);
    setTitle("");
    setMessage("");
  };

  return (
    <>
    <Header resetBoard={resetBoard} />
    <List sections={sections} setSections={setSections}/>
    </>
  )
}

export default App
