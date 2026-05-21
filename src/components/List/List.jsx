import React, { useEffect, useState, useRef } from 'react';
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { arrayMove } from '@dnd-kit/sortable';
import Section from '@/components/Section';
import { motion, AnimatePresence } from "framer-motion";

export default function List({ sections, setSections, searchTerm }) {
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

  const filteredSections = sections.map(section => ({
    ...section,
    tasks: section.tasks.filter(task => 
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }))
  .filter(section => section.tasks.length > 0 || searchTerm === "");

  return (
    <div className='p-6 w-full max-w-[1400px] mx-auto'>
<div className='flex justify-start mb-8'>
    <form onSubmit={createSection} className='flex items-center gap-3 bg-[#12131a]/60 border border-zinc-800/60 p-2 pl-3 rounded-xl shadow-xl max-w-md w-full'>
      <div className="relative flex-1">
        <motion.input 
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setShowPlaceholderDropdown(false);
              }}
              onKeyDown={handleKeyDown}
              className='w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600 py-1.5'
              animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
              placeholder="Create column..."
            />

            {!title && !isMobile && (
              <AnimatePresence mode='wait'>
                <motion.span
                  key={placeholder}
                  initial={{ opacity: 0, y: 5}}
                  animate={{ opacity: 0.4, y: 0 }}
                  exit={{ opacity: 0, y: -5}}
                  className='absolute left-0 top-1.5 text-xs text-zinc-400 select-none pointer-events-none'
                >
                  {placeholder}
                </motion.span>
              </AnimatePresence>
            )}

          <AnimatePresence>
              {showPlaceholderDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className='absolute left-0 top-full mt-2 bg-[#1f202c] border border-zinc-800 rounded-xl shadow-2xl z-50 w-full overflow-hidden'
                >
                  {placeholderExamples.map((ph, i) => (
                    <div
                      key={i}
                      className='px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 cursor-pointer'
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
          </div>

          <button
          type='submit'
          className='
            flex-none w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 text-sm font-medium transition-all cursor-pointer
          '
          >
            +
          </button>
    </form>
  </div>

<AnimatePresence>
    {message && (
        <motion.p
        key="error-message"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className='text-red-400 text-xs font-medium mb-4'>
          {message}
        </motion.p>
        )}
</AnimatePresence>
          
{/* DND KIT Wrapping */}

<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <SortableContext
        items={sections.map(s => s.id)}
        strategy={horizontalListSortingStrategy}
    >
    <div className='flex flex-col sm:flex-row sm:overflow-x-auto gap-5 pb-6 items-start scrollbar-thin scrollbar-thumb-zinc-800'>
        {filteredSections.map((section) => (
            <Section
                key={section.id}
                section={section}
                addTask={addTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                deleteSection={deleteSection}
                sections={sections}
            />
        ))}
        </div>
        </SortableContext>
    </DndContext>
</div>
    )
}