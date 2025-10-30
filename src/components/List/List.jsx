import React, { useEffect, useState, useRef } from 'react';
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { arrayMove } from '@dnd-kit/sortable';
import Section from '@/components/Section';
import { motion, AnimatePresence } from "framer-motion";

export default function List({ sections, setSections }) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [shake, setShake] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const [showPlaceholderDropdown, setShowPlaceholderDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  useEffect(() => {
    if (!isPaused && !isMobile) {
      intervalRef.current = setInterval(() => {
        setPlaceholderIndex(prev => (prev + 1) % placeholderExamples.length);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused, isMobile]);

  const pauseRotation = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const createSection = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
        setMessage("⚠️ Error! Needs input for section");

        setShake(true);
        setTimeout(() => setShake(false), 500);
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
    const {active, over} = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const isSectionDrag = sections.some((s) => s.id === activeId);

    if (isSectionDrag) {
      if (activeId === overId) return;

      const oldI = sections.findIndex((s) => s.id === activeId);
      const newI = sections.findIndex((s) => s.id === overId);
      const newSections = arrayMove(sections, oldI, newI);
      setSections(newSections);
      return;
    }

    const findSection = (taskId) => {
      for (const section of sections) {
        if (section.tasks.find((t) => t.id === taskId)) {
          return section;
        }
      }
    };

    const sourceSection = findSection(activeId);
    const destinationSection = 
      findSection(overId) || sections.find((s) => s.id === overId);

    if (!sourceSection || !destinationSection) return;

    const activeTask = sourceSection.tasks.find((t) => t.id === activeId);

    if (sourceSection.id !== destinationSection.id) {
      setSections((prev) => 
        prev.map((section) => {
          if (section.id === sourceSection.id) {
            return {
              ...section,
              tasks: section.tasks.filter((t) => t.id !== activeId),
            };
          }
          if (section.id === destinationSection.id) {
            return {
              ...section,
              tasks: [...section.tasks, activeTask],
            };
          }
          return section;
        })
      );
    } else {
      const oldI = sourceSection.tasks.findIndex((t) => t.id === activeId);
      const newI = sourceSection.tasks.findIndex((t) => t.id === overId);

      if (oldI !== newI) {
        setSections((prev) => 
          prev.map((section) =>
            section.id === sourceSection.id
            ? {
                ...section,
                tasks: arrayMove(section.tasks, oldI, newI),
            }
            : section
          )
        )
      }
    }
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
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      pauseRotation();
      setPlaceholderIndex(prev => (prev + 1) % placeholderExamples.length);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      pauseRotation();
      setPlaceholderIndex(prev => (prev - 1 + placeholderExamples.length) % placeholderExamples.length);
    }
  };

  const updateTask = (sectionId, taskId, updatedFields) => {
    setSections(prevSections => 
      prevSections.map(section => {
        if (section.id !== sectionId) return section;
          return {
            ...section,
            tasks: section.tasks.map(task =>
              task.id === taskId ? { ...task, ...updatedFields } : task
            )
          };
        })
    )
  }

  return (
    <div className='min-h-screen p-4 w-full'>
<div className='flex justify-center mb-10'>
    <form onSubmit={createSection} className='flex flex-col sm:flex-row items-center gap-4  bg-white/20 p-4 rounded-2xl shadow-lg w-full max-w-3xl dark:bg-zinc-300'>
      <div className="relative">
        <motion.input 
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setShowPlaceholderDropdown(false);
          }}
          onKeyDown={handleKeyDown}
          className='bg-white/40 rounded-2xl p-4 sm:p-4 text-lg dark:bg-white'
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
          placeholder="Write section title..."
          />

          {!title && !isMobile && (
            <AnimatePresence mode='wait'>
              <motion.span
                key={placeholder}
                initial={{ opacity: 0, y: 10}}
                animate={{ opacity: 0.5, y: 0 }}
                exit={{ opacity: 0, y: -10}}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className='absolute left-4 top-4 text-gray-500 select-none cursor-pointer'
                onClick={() => setTitle(placeholder)}

              >
                {placeholder}
              </motion.span>
            </AnimatePresence>
          )}

          {isMobile && !title && (
            <button
              type='button'
              onClick={() => setShowPlaceholderDropdown(prev => !prev)}
              className='px-3 py-2 bg-gray-200 dark:bg-zinc-600 rounded-xl text-sm'
            >
              ✨
            </button>
          )}
          
        <AnimatePresence>
          {showPlaceholderDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='absolute left-0 top-full mt-1 bg-white dark:bg-zinc-700 border rounded-lg shadow-md z-10 w-full'
            >
              {placeholderExamples.map((ph, i) => (
                <div
                  key={i}
                  className='px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-600 cursor-pointer'
                  onClick={() => {
                    setTitle(ph)
                    setShowPlaceholderDropdown(false);
                  }}
                >
                  {ph}
                </div>
              ))}
            </motion.div>
            )}
        </AnimatePresence>

          <div className='flex flex-wrap gap-4 mt-2 text-sm text-gray-700 dark:text-gray-800'>
            <span className='flex items-center gap-1'>
            Press <kbd className="kbd kbd-sm">Tab</kbd>
            to fill placeholder
            </span>
            <span className='flex items-center gap-1'>
            Press <kbd className="kbd kbd-sm">▲</kbd>
            to choose previous placeholder
            </span>
            <span className='flex items-center gap-1'>
            Press <kbd className="kbd kbd-sm">▼</kbd>
            to choose next placeholder
            </span>
            <span className='flex items-center gap-1'>
            Press <kbd className="kbd kbd-sm">Enter</kbd>
            to add new section
            </span>
          </div>
        </div>
          <button
          type='submit'
          className='flex-none items-center justify-center w-12 h-12 text-white text-4xl rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-zinc-700 dark:hover:bg-zinc-800 shadow-md transition-transform transform hover:scale-110 leading-none pb-[5px] font-semibold cursor-pointer'
          >+</button>
    </form>
    
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
                updateTask={updateTask}
                deleteSection={deleteSection}
            />
        ))}
        </div>
        </SortableContext>
    </DndContext>
</div>
    )
}