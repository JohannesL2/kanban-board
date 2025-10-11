import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
} from "@dnd-kit/sortable";
import Section from '../Section';

export default function List() {
  const [title, setTitle] = useState("")
  const [sections, setSections] = useState([])
  const [message, setMessage] = useState("")

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

  return (
    <div className='min-h-screen p-4 w-full'>
<div className='flex justify-center mb-10'>
    <form onSubmit={createSection} className='flex flex-col sm:flex-row items-center gap-4  bg-white/20 p-4 rounded-2xl shadow-lg w-full max-w-3xl'>
      <div className="flex flex-col flex-grow gap-2">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='bg-white/40 rounded-2xl p-4 sm:p-4 text-lg sm:text-2xl'
          placeholder='type a title'
          />

        {message && (
        <p className='text-red-400 text-xl font-semibold'>{message}</p>
        )}
        </div>
          <button
          type='submit'
          className='flex items-center justify-center w-12 h-12 text-white text-4xl rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition-transform transform hover:scale-110 leading-none pb-[5px] font-semibold cursor-pointer'
          >+</button>
    </form>
    </div>
          
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