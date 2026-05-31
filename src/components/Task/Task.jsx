import React, { useRef, useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from "framer-motion";
import { useHaptic } from '../../hooks/useHaptic';

export default function Task({ task, sectionId, deleteTask, updateTask, onTaskClick }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
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
        base: "text-sm md:text-base",
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

    const formatTimeAgo = (timestamp) => {
        const date = new Date(Number(timestamp) || timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `Just Now`;
        
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;

        return date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    const priorityColor = 
        priority === "high"
        ? { label: "High", bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-500" }
        : priority === "medium"
        ? { label: "Medium", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-500" }
        : { label: "Low", bg: "bg-sky-500/10", text: "text-sky-400", dot: "bg-sky-500" };

    const haptic = useHaptic();
            const wasDragging = useRef(false);
        
            useEffect(() => {
                if (isDragging && !wasDragging.current) {
                    haptic(30);
                }
        
                wasDragging.current = isDragging;
            }, [isDragging, haptic]);

  return (
    <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        onClick={() => {
            if(!isDragging){
            onTaskClick(task)
            }
        }}
        className={`
                group
                relative
                ${isMenuOpen ? "z-50" : "z-0"}
                w-full
                box-border
                flex
                flex-col
                gap-3

                rounded-xl
                p-4
                mb-3

                /* Mörk, semi-transparent bakgrund enligt bilden */
                bg-[#181922]/80
                backdrop-blur-md
                border
                border-zinc-800/60

                shadow-lg
                shadow-black/20

                transition-all
                duration-200

                hover:border-zinc-700
                hover:shadow-xl

                ${isDragging ? "opacity-40 scale-[0.98]" : ""}
                ${isEditing ? "" : "active:cursor-grabbing"}
            `}
        >

        <div className='flex justify-between items-start w-full gap-2'>
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${priorityColor.bg} ${priorityColor.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${priorityColor.dot}`} />
                {priorityColor.label}
            </div>

        <div className='flex items-start gap-2 flex-1 min-w-0'>
            <input
                type='checkbox'
                checked={done}
                onChange={handleToggleDone}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()} 
                className='accent-green-500 w-5 h-5 rounded-md cursor-pointer shrink-0 mt-0.5'
            />

    <div className='relative flex flex-col px-2 flex-1 min-w-0' onPointerDown={(e) => e.stopPropagation()}>
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
                onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true)
                }}
                className={`
                    block
                    w-full
                    truncate 
                    
                    cursor-text
                    text-zinc-100
                    dark:text-zinc-100
                    ${FONT_SIZE_CLASSES[fontSize] || "text-base"}
                    ${bold ? "font-bold" : "font-medium"}
                    ${done ? "line-through opacity-50" : ""}
                `}
            >
                {text}
            </motion.span>
        )}
            {task.updatedAt && (
                <span className='text-xs text-zinc-500 truncate'>
                    Updated: {formatTimeAgo(task.updatedAt)}
                </span>
            )}

            <span className='text-xs mt-1 text-zinc-500 truncate'>
                Created: {formatTimeAgo(task.id)}
            </span>

            <AnimatePresence> 
                {task.description && ( 
                    <motion.p 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }} 
                        exit={{ opacity: 0, height: 0 }} 
                        transition={{ duration: 0.16 }} 
                        className={`
                            /* 1. Typography constraints */
                            line-clamp-2 
                            break-words
                            
                            /* 2. Existing styling classes */
                            text-sm 
                            text-zinc-400 
                            mt-2 
                        `} 
                    >
                        {task.description} 
                    </motion.p> 
                )} 
            </AnimatePresence>
        </div>
    </div>

    <div className='relative task-menu shrink-0' onPointerDown={(e) => e.stopPropagation()}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                }}
                className={`
                    p-2.5
                    rounded-xl
                    text-zinc-500
                    hover:text-zinc-200
                    hover:bg-zinc-800/50
                    transition-all
                    duration-200
                    focus:outline-none
                `}
                aria-label="Task settings"
            >

            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
            >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            </button>
        <AnimatePresence>
        {isMenuOpen && (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className='
                /* Refined Container: Dark glassmorphism matching the card */
                absolute right-0 top-full mt-2 z-[9999]
                flex flex-col gap-2.5
                p-3
                min-w-[160px]
                bg-[#181922]/95
                backdrop-blur-xl
                border border-zinc-700/60
                rounded-xl
                shadow-2xl
                ring-1 ring-black/50
            '
        >
            <div className="flex gap-2">
                <select
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className='
                        flex-1
                        rounded-lg
                        border border-zinc-700
                        bg-zinc-800/50
                        px-2 py-1.5
                        text-xs font-medium
                        text-zinc-200
                        outline-none
                        cursor-pointer
                        hover:border-zinc-500
                        transition-colors
                    '
                >
                    <option value="xs">XS Size</option>
                    <option value="sm">SM Size</option>
                    <option value="base">BASE Size</option>
                    <option value="lg">LG Size</option>
                    <option value="xl">XL Size</option>
                    <option value="2xl">2XL Size</option>
                </select>

                <button
                    onClick={handleBoldToggle}
                    className={`
                        px-3 py-1.5 
                        rounded-lg 
                        border 
                        text-xs font-bold 
                        transition-all
                        ${bold 
                            ? "bg-zinc-200 text-zinc-900 border-zinc-200 shadow-sm" 
                            : "bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:text-zinc-200 hover:border-zinc-500"
                        }
                    `}
                    title="Toggle Bold"
                >
                    B
                </button>
            </div>

            <select
                value={priority}
                onChange={handlePriorityChange}
                className='
                    w-full
                    rounded-lg
                    border border-zinc-700
                    bg-zinc-800/50
                    px-2 py-1.5
                    text-xs font-medium
                    text-zinc-200
                    outline-none
                    cursor-pointer
                    hover:border-zinc-500
                    transition-colors
                '
            >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>

            <div className="h-px w-full bg-zinc-700/50 my-0.5"></div>

            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(sectionId, task.id);
                }}
                className='
                    w-full
                    flex items-center justify-center gap-2
                    rounded-lg
                    border border-red-500/20
                    bg-red-500/10
                    hover:bg-red-500/20
                    px-3 py-2
                    text-xs font-medium
                    text-red-400
                    transition-all
                '
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                Delete task
            </button>
        </motion.div>
    )}
</AnimatePresence>
        </div>
    </div>
</div>
  )
}
