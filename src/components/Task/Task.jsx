import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleTextChange = (e) => setText(e.target.value);

    const handleTextBlur = () => {
        setIsEditing(false);
        updateTask(sectionId, task.id, { text });
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

    const priorityColor = 
        priority === "high"
        ? "border-red-500"
        : priority === "medium"
        ? "border-yellow-500"
        : "border-green-500";

  return (
    <div
        ref={setNodeRef}
        style={style}
        className={`flex justify-between items-center bg-black/5 dark:bg-black/5 rounded-lg p-2 mb-2 ${isEditing ? "" : "cursor-grab active:cursor-grabbing"} border-2 ${priorityColor}`}
        >
        <div className='flex justify-between items-center gap-2 flex-1'>
            <div {...listeners} {...attributes} className='cursor-grab p-1 select-none text-gray-500'>
                ☰
            </div>
    <div className='flex flex-col'>
        {isEditing ? (
            <input
                value={text}
                onChange={handleTextChange}
                onBlur={handleTextBlur}
                onKeyDown={(e) => e.key === "Enter" && handleTextBlur()}
                autoFocus
                className={`${FONT_SIZE_CLASSES[fontSize] || "text-base"} ${
                    bold ? "font-bold dark:text-white" : "font-normal dark:text-white"
                } border-b border-gray-300 focus:outline-none`}
            />
        ) : (
            <span
                onClick={() => setIsEditing(true)}
                className={`${FONT_SIZE_CLASSES[fontSize] || "text-base"} ${
                    bold ? "font-bold dark:text-white" : "font-normal dark:text-white"
                } truncate max-w-[200px]`}
            >
                {text}
            </span>
        )}

            <span className='text-xs text-gray-400 dark:text-gray-500 mt-1 text-nowrap'>
                Created: {new Date(task.id).toLocaleDateString()}
            </span>
        </div>
                </div>

            <button onClick={(e) => {
                e.stopPropagation();
                deleteTask(sectionId, task.id);
            }}
            className='text-red-500 hover:text-red-700 font-bold px-2'
                >
                X
                </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                }}
                className='px-2 py-1 rounded border text-sm dark:text-white dark:bg-black/20'
            >
                ⚙️
            </button>
{isMenuOpen && (
        <div className='flex justify-end gap-2 mt-2 bg-white/60 dark:bg-black/20 p-2 rounded-md'>
            <select
                value={fontSize}
                onChange={handleFontSizeChange}
                className='border rounded px-2 py-1 text-sm dark:text-white dark:bg-black/40'
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
                className={`px-2 py-1 rounded border text-sm dark:text-white dark:bg-black/20 ${
                    bold ? "bg-gray-300 font-bold" : "bg-white"
                }`}
            >
                B
            </button>

            <select
                value={priority}
                onChange={handlePriorityChange}
                className='border rounded px-2 py-1 text-sm dark:text-white dark:bg-black/40'
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
)}
    </div>
  )
}
