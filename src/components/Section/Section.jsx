import React, { useState} from 'react';
import { CSS } from "@dnd-kit/utilities";
import Task from '@/components/Task';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FaZ } from 'react-icons/fa6';

export default function Section({ section, addTask, deleteTask, deleteSection }) {
    const [task, setTask] = useState("");

    const { setNodeRef, isOver } = useDroppable({
        id: section.id,
    })
    
    const handleAddTask = (e) => {
        e.stopPropagation();
        if (task.trim() === "") return;
        addTask(section.id, task);
        setTask("");
    }

  return (
    <div
        ref={setNodeRef}
        className={`p-4 bg-white/20 dark:bg-white rounded-2xl shadow-md mb-4 w-full max-w-full sm:max-w-sm transition
            ${isOver ? "bg-green-200/40" : "bg-white/20 dark:bg-white/10"}`}
        >

        {/* Section header */}
<div className='flex justify-between items-center mb-3'>
    {/* Drag handle */}
    <div className='flex items-center gap-2 cursor-grab active:cursor-grabbing'>   <span className='text-lg text-gray-400'>☰</span>
        <h2 className='text-lg sm:text-xl font-semibold break-words'>{section.title}</h2>
    </div>
        {/* Delete button */}
        <button
            onClick={(e) => {
                e.stopPropagation();
                deleteSection(section.id)
            }}
            className='text-red-500 hover:text-red-700 font-bold cursor-pointer'
        >
            X
        </button>
    </div>

    {/* Task lista */}
    <SortableContext
        id={section.id}
        items={section.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
    >
    <div className='mb-3'>
        {section.tasks.length === 0 ? (
            <p className='text-gray-400 italic text-sm sm:text-base'>No tasks yet...</p>) : (
                section.tasks.map((t) => (
                    <Task
                        key={t.id}
                        task={t}
                        sectionId={section.id}
                        deleteTask={deleteTask}
                    />
                ))
        )}
    </div>

    </SortableContext>


    {/* Add task */}
    <div className="flex gap-2 flex-col">
            <input 
                type="text" 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder='Add task'
                className='flex-grow border rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400'
            />

            <button
                onClick={handleAddTask}
                className='bg-green-500 hover:bg-green-600 dark:bg-zinc-700 dark:hover:bg-zinc-800 text-white px-4 py-2 rounded-lg transition cursor-pointer'
            >
                Add Task
            </button>
            </div>
        </div>
  );
}
