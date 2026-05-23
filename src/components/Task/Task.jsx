import React, { useRef, useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from "framer-motion";
import { useHaptic } from '../../hooks/useHaptic';

export default function Task({ task, sectionId, deleteTask, updateTask }) {
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
    const [description, setDescription] = useState(task.description || "");
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

    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleDescriptionBlur = () => {
        updateTask(sectionId, task.id, { description, updatedAt: Date.now() });
    };
    
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
        className={`
                group
                relative
                ${isMenuOpen ? "z-50" : "z-0"}
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

        <div className='flex justify-between items-center w-full'>
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColor.bg} ${priorityColor.text}`}
            >
                <span className={`w-1.5 h-1.5 rounded-full ${priorityColor.dot}`} />
                {priorityColor.label}
            </div>

<div className='flex items-center gap-2'>
            <input
                type='checkbox'
                checked={done}
                onChange={handleToggleDone}
                onPointerDown={(e) => e.stopPropagation()}
                className='accent-green-500 w-5 h-5 rounded-md cursor-pointer'
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
                className={`
  min-w-0
  relative
  inline-block
  max-w-full
  overflow-hidden
  break-words
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
                <span 
                    className='text-xs' 
                >
                    Updated: {new Date(task.updatedAt).toLocaleDateString()}
                </span>
            )}

            <span 
                className='text-xs mt-1 text-nowrap'
            >
                Created: {new Date(task.id).toLocaleDateString()}
            </span>
            <AnimatePresence> 
                {task.description && ( 
                    <motion.p 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }} 
                        exit={{ opacity: 0, height: 0 }} 
                        transition={{ duration: 0.16 }} 
                        className="text-sm text-zinc-400 mt-2 whitespace-pre-wrap break-words" >
                             {task.description} 
                        </motion.p> 
                    )} 
            </AnimatePresence>
        </div>
                </div>

<div className='relative task-menu' onPointerDown={(e) => e.stopPropagation()}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                }}
                className={`
  p-2.5
  rounded-xl
  text-zinc-700
  dark:text-zinc-200
  backdrop-blur-md
  hover:scale-110
  transition-all
  duration-200
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
            className='
absolute right-0 top-full mt-2 z-9999
flex flex-col gap-2


p-3
min-w-[140px]

bg-white/70
dark:bg-zinc-900/80

backdrop-blur-xl
border border-white/20
rounded-2xl
shadow-2xl
'
            >
            <select
                value={fontSize}
                onChange={handleFontSizeChange}
                className='
rounded-xl
border border-white/10

bg-white/60
dark:bg-white/5

px-3
py-2

text-sm
text-zinc-800
dark:text-zinc-100

outline-none
'
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
                className='
rounded-xl
border border-white/10

bg-white/60
dark:bg-white/5

px-3
py-2

text-sm
text-zinc-800
dark:text-zinc-100

outline-none
'
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
            className='
rounded-xl

border border-red-500/20

bg-red-500/10
hover:bg-red-500/20

px-3
py-2

text-sm
font-medium
text-red-400

transition-all
'
>
    🗑️ Delete task
</button>
                </motion.div>
)}
            </AnimatePresence>
        </div>
    </div>
</div>
  )
}
