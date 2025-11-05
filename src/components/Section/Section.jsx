import React, { useEffect, useState} from 'react';
import { CSS } from "@dnd-kit/utilities";
import Task from '@/components/Task';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from "framer-motion";
import TaskProgress from '../TaskProgress/TaskProgress';

export default function Section({ section, addTask, deleteTask, updateTask, deleteSection, sections }) {
    const [task, setTask] = useState("");
    const [sectionColor, setSectionColor] = useState(
        localStorage.getItem(`sectionColor-${section.id}`) || section.color || "#ffffff"
    );

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: section.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
        opacity: isDragging ? 0.6 : 1,
        backgroundColor: sectionColor,
    };
    
    const handleAddTask = (e) => {
        e.stopPropagation();
        if (task.trim() === "") return;
        addTask(section.id, task);
        setTask("");
    }

    useEffect(() => {
        localStorage.setItem(`sectionColor-${section.id}`, sectionColor);
    }, [sectionColor, section.id]);

    const getContrastColor = (hexColor) => {
        if (!hexColor) return "#000";

        const color = hexColor.replace("#", "");

        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        return luminance > 0.6 ? "#000000" : "#FFFFFF";
    };

    const textColor = getContrastColor(sectionColor);

  return (
    <div
        ref={setNodeRef}
        style={{ ...style, color: textColor }}
        className={`p-4 bg-white/20 dark:bg-white rounded-2xl shadow-md mb-4 w-full max-w-full sm:max-w-sm transition
            ${isDragging ? "bg-green-200/40" : "bg-white/20 dark:bg-white/10"}`}
        >

        {/* Section header */}
<div className='flex justify-between items-center mb-3'>
    {/* Drag handle */}
    <div 
        {...listeners} 
        {...attributes} 
        className='flex items-center gap-2 cursor-grab active:cursor-grabbing select-none'>   
        <motion.span 
            whileHover={{ rotate: 10}}
            className='text-lg text-gray-400'
        >
                ☰
        </motion.span>
        <motion.h2
            layout
            className='text-lg sm:text-xl font-semibold break-words dark:text-white'
            whileHover={{ scale: 1.03 }}
        >
                {section.title}
        </motion.h2>
    </div>

        {/* Color picker */}
            <div className='relative group'>
                <button
                    onClick={() => document.getElementById(`color-picker-${section.id}`).click()}
                    className='w-6 h-6 rounded-full border border-gray-400 shadow-sm'
                    style={{ backgroundColor: sectionColor }}
                    title='Change section color'
                >
                </button>

                <input
                    type="color"
                    value={sectionColor}
                    onChange={(e) => setSectionColor(e.target.value)}
                    className='absolute top-0 left-0 w-7 h-7 opacity-0 cursor-pointer'
                />

                <span className='absolute left-8 top-1/2 -translate-y-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition'>
                    Change color
                </span>

                {/* Preset colors */}
                <div className="absolute top-8 left-0 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    {["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA"].map((color) => (
                        <button
                            key={color}
                            onClick={() => setSectionColor(color)}
                            className="w-5 h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                        >

                        </button>
                    ))}
                </div>
            </div>

        {/* Delete button */}
        <motion.button
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            onClick={(e) => {
                e.stopPropagation();
                deleteSection(section.id)
            }}
            className='text-red-500 hover:text-red-700 font-bold cursor-pointer'
        >
            X
        </motion.button>
    </div>
      <TaskProgress section={section} />
    {/* Task lista */}
    <SortableContext
        id={section.id}
        items={section.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
    >
    <div className='mb-3'>
        {section.tasks.length === 0 ? (
            <p className='text-gray-400 italic text-sm sm:text-base' style={{ color: textColor + "CC" }}>No tasks yet...</p>) : (
                section.tasks.map((t) => (
                    <Task
                        key={t.id}
                        task={t}
                        sectionId={section.id}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
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
                style={{
                    backgroundColor: sectionColor,
                    color: textColor,
                }}
                className='flex-grow border-2 rounded-lg p-2 focus:outline-none focus:ring-2 transition'
            />

            <button
                onClick={handleAddTask}
                className='bg-green-500 hover:bg-green-600 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black text-white font-bold px-4 py-2 rounded-lg transition cursor-pointer'
            >
                Add Task
            </button>
            </div>
        </div>
  );
}
