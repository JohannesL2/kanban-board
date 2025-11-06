import React, { useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from "framer-motion";

export default function Task({ task, sectionId, deleteTask, updateTask }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
        data: { sectionId },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [fontSize, setFontSize] = useState(task.fontSize || "base");
    const [bold, setBold] = useState(task.bold || false);
    const [priority, setPriority] = useState(task.priority || "low");
    const [done, setDone] = useState(task.done || false);

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.task-menu')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleTextChange = (e) => setText(e.target.value);

    const handleTextBlur = () => {
        setIsEditing(false);
        updateTask(sectionId, task.id, { text, updatedAt: Date.now() });
    };

    const FONT_SIZE_CLASSES = {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
    };

    const handleFontSizeChange = (e) => {
        const newSize = e.target.value;
        setFontSize(newSize);
        updateTask(sectionId, task.id, { fontSize: newSize });
    };

    const handleBoldToggle = () => {
        const newBold = !bold;
        setBold(newBold);
        updateTask(sectionId, task.id, { bold: newBold });
    };

    const handlePriorityChange = (e) => {
        const newPriority = e.target.value;
        setPriority(newPriority);
        updateTask(sectionId, task.id, { priority: newPriority });
    };

        const handleToggleDone = () => {
        const newDone = !done;
        setDone(newDone);
        updateTask(sectionId, task.id, { done: newDone });
    };


    const priorityColor = 
        priority === "high"
        ? "border-red-500"
        : priority === "medium"
        ? "border-yellow-500"
        : "border-green-500";

  return (
    <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className={`flex justify-between items-center bg-black/10 rounded-lg p-2 mb-2 ${isEditing ? "" : "active:cursor-grabbing"} border-2 ${priorityColor}`}
        >

        <div className='flex justify-between items-center gap-2 flex-1'>
            <input
                type='checkbox'
                checked={done}
                onChange={handleToggleDone}
                onPointerDown={(e) => e.stopPropagation()}
                className='accent-green-500 w-4 h-4 cursor-pointer'
            />

    <div className='relative flex flex-col px-4' onPointerDown={(e) => e.stopPropagation()}>
        {isEditing ? (
            <input
                value={text}
                onChange={handleTextChange}
                onBlur={handleTextBlur}
                onKeyDown={(e) => e.key === "Enter" && handleTextBlur()}
                autoFocus
                className={`${FONT_SIZE_CLASSES[fontSize] || "text-base"} ${
                    bold ? "font-bold" : "font-normal"
                } border-b border-gray-300 focus:outline-none`}
            />
        ) : (
            <motion.span
                whileHover={{ scale: 1.02, opacity: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setIsEditing(true)}
                className={`relative group inline-block ${FONT_SIZE_CLASSES[fontSize] || "text-base"} ${
                    bold ? "font-bold" : "font-normal"
                } truncate max-w-[200px] cursor-text`}
            >
                {text}
            </motion.span>
        )}
            {task.updatedAt && (
                <span className='text-xs text-gray-400 dark:text-gray-500'>
                    Updated: {new Date(task.updatedAt).toLocaleDateString()}
                </span>
            )}

            <span className='text-xs text-gray-400 dark:text-gray-500 mt-1 text-nowrap'>
                Created: {new Date(task.id).toLocaleDateString()}
            </span>
        </div>
                </div>

<div className='relative task-menu' onPointerDown={(e) => e.stopPropagation()}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                }}
                className={`p-2 rounded-full shadow-md text-sm hover:scale-110 transition-transform
                    ${isMenuOpen ? "bg-black/15 text-white shadow-inner" : "bg-white/5"}
                    `}
            >
                ⚙️
            </button>
<AnimatePresence>
{isMenuOpen && (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className='absolute right-0 top-full mt-1 z-10 flex flex-col gap-2 bg-black/30 backdrop-blur-sm p-2 rounded-md shadow-lg border border-gray-300'
            >
            <select
                value={fontSize}
                onChange={handleFontSizeChange}
                className='border rounded px-2 py-1 text-sm'
            >
                <option value="xs">XS</option>
                <option value="sm">SM</option>
                <option value="base">BASE</option>
                <option value="lg">LG</option>
                <option value="xl">XL</option>
                <option value="2xl">2XL</option>
            </select>

            <button
                onClick={handleBoldToggle}
                className={`px-2 py-1 rounded border text-sm ${
                    bold ? "bg-black/5 font-bold" : "bg-black/10"
                }`}
            >
                B
            </button>

            <select
                value={priority}
                onChange={handlePriorityChange}
                className='border rounded px-2 py-1 text-sm'
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            {/* Delete button */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(sectionId, task.id);
            }}
            className='text-red-600 hover:bg-red-100 border border-red-300 rounded px-2 py-1 text-sm font-medium'
                >
                🗑️ Delete task
                </button>
        </motion.div>
)}
</AnimatePresence>
</div>
    </div>
  )
}
