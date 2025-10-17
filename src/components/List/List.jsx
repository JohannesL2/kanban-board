import React, { useEffect, useState, useRef } from 'react';
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import Section from '@/components/Section';

export default function List({ sections, setSections }) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const placeholderExamples = [
  "Backlog 🧠",
  "To Do ✏️",
  "In Progress ⚙️",
  "Review 👀",
  "Done ✅",
  "Bugs 🐞",
  "Ideas 💡",
  "Testing 🧪",
  "Blocked 🚧"
  ];

  const placeholder = placeholderExamples[placeholderIndex];

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setPlaceholderIndex(prev => (prev + 1) % placeholderExamples.length);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const pauseRotation = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const createSection = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
        setMessage("⚠️ Error! Needs input for section");
        return;
    }

    const newSection = { id: Date.now(), title, tasks: [] }
    setSections([...sections, newSection])
    setTitle("")
    setMessage("")
  };

  const addTask = (sectionId, taskText) => {
    if (taskText.trim() === "") return;

    setSections(
        sections.map(section => {
        if (section.id === sectionId) {
            return {
                ...section,
                tasks: [...section.tasks, { id: Date.now(), text: taskText }]
            }
        }
        return section
    }))
  }

  const deleteTask = (sectionId, taskId) => {
    setSections(sections.map(section => {
        if (section.id === sectionId) {
            return {
                ...section,
                tasks: section.tasks.filter(task => task.id !== taskId)
            }
        }
        return section
    }))
  }

  const deleteSection = (sectionId) => {
    setSections(sections.filter(section => section.id !== sectionId))
  }

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldI = sections.findIndex((s) => s.id === active.id);
    const newI = sections.findIndex((s) => s.id === over.id);

    const newSections = [...sections];
    const [moved] = newSections.splice(oldI, 1);
    newSections.splice(newI, 0, moved);
    setSections(newSections);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
        activationConstraint: {
            distance: 5,
        },
    })
  );

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setTitle(placeholder);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      pauseRotation();
      setPlaceholderIndex(prev => (prev + 1) % placeholderExamples.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      pauseRotation();
      setPlaceholderIndex(prev => (prev - 1 + placeholderExamples.length) % placeholderExamples.length);
    }
  };

  return (
    <div className='min-h-screen p-4 w-full'>
<div className='flex justify-center mb-10'>
    <form onSubmit={createSection} className='flex flex-col sm:flex-row items-center gap-4  bg-white/20 p-4 rounded-2xl shadow-lg w-full max-w-3xl dark:bg-zinc-300'>
      <div className="flex flex-col flex-grow gap-2">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className='bg-white/40 rounded-2xl p-4 sm:p-4 text-lg sm:text-2xl dark:bg-white'
          placeholder={placeholder}
          />
          <div className='flex flex-wrap gap-4 mt-2 text-sm text-gray-700 dark:text-gray-800'>
            <span className='flex items-center gap-1'>
            Press <kbd className="kbd kbd-sm">Tab</kbd>
            to fill placeholder
            </span>
            <span className='flex items-center gap-1'>
            Press <kbd className="kbd kbd-sm">◀︎</kbd>
            to choose previous placeholder
            </span>
            <span className='flex items-center gap-1'>
            Press <kbd className="kbd kbd-sm">▶︎</kbd>
            to choose next placeholder
            </span>
          </div>
        </div>
          <button
          type='submit'
          className='flex-none items-center justify-center w-12 h-12 text-white text-4xl rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-zinc-700 dark:hover:bg-zinc-800 shadow-md transition-transform transform hover:scale-110 leading-none pb-[5px] font-semibold cursor-pointer'
          >+</button>
    </form>
    
    {/*Tell the user how to use the tab and arrow keys shortcuts here, import small keyboard icons*/}
    </div>

    {message && (
        <p className='text-red-400 text-xl font-semibold mb-8'>{message}</p>
        )}
          
{/* DND KIT Wrapping */}

<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <SortableContext
        items={sections.map(s => s.id)}
        strategy={verticalListSortingStrategy}
    >
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {sections.map((section) => (
            <Section
                key={section.id}
                section={section}
                addTask={addTask}
                deleteTask={deleteTask}
                deleteSection={deleteSection}
            />
        ))}
        </div>
        </SortableContext>
    </DndContext>
</div>
    )
}