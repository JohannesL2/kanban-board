import React, { useEffect, useRef, useState} from 'react';
import { CSS } from "@dnd-kit/utilities";
import Task from '@/components/Task';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from "framer-motion";
import TaskProgress from '../TaskProgress/TaskProgress';
import { useHaptic } from '../../hooks/useHaptic';

export default function Section({ section, addTask, deleteTask, updateTask, deleteSection }) {
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
        style={{ ...style }}
        className={`
  group
  relative
  overflow-hidden
  w-full
  max-w-full
  sm:max-w-sm
  rounded-3xl
  p-5
  mb-4
  border
  border-white/20
  bg-white/40
  dark:bg-white/5
  backdrop-blur-2xl
  shadow-[0_8px_32px_rgba(0,0,0,0.12)]
  transition-all
  duration-300
  hover:shadow-2xl
  ${
    isDragging
      ? "scale-[1.02] ring-2 ring-blue-400/40"
      : ""
  }
`}
        >
            <div
  className="
    absolute
    inset-0
    bg-gradient-to-br
    from-white/10
    to-transparent
    pointer-events-none
  "
/>

        {/* Section header */}
<div className='flex justify-between items-center mb-3'>
    {/* Drag handle */}
    <div
        className='flex items-center gap-2'>   
        <motion.span 
            className='p-1 rounded-md'
        {...listeners} 
        {...attributes}
        animate={{
            scale: isDragging ? 1.3 : 1,
            opacity: isDragging ? 1 : 0.9,
            boxShadow: isDragging
                ? "0 0 10px rgba(0,0,0,0.3)"
                : "0 0 0 rgba(0,0,0,0)",
        }}
        >
            <div 
                className='flex flex-col justify-center items-center gap-[3px] cursor-grab active:cursor-grabbing select-none'
            >
                <span className="block w-4 h-[3px] rounded bg-zinc-900 dark:bg-zinc-100"></span>
                <span className="block w-4 h-[3px] rounded bg-zinc-900 dark:bg-zinc-100"></span>
                <span className="block w-4 h-[3px] rounded bg-zinc-900 dark:bg-zinc-100"></span>

            </div>
        </motion.span>
        <motion.h2
            layout
            className='text-xl font-bold tracking-tight break-words select-none text-zinc-900 dark:text-zinc-100'
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

    <div
  className="mb-4 h-1.5 w-full rounded-full"
  style={{ backgroundColor: sectionColor }}
/>

      <TaskProgress section={section} />
    {/* Task lista */}
    <SortableContext
        id={section.id}
        items={section.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
    >
    <div className='mb-3'>
        {section.tasks.length === 0 ? (
            <p className='text-zinc-500 dark:text-zinc-400 italic text-sm sm:text-base'>No tasks yet...</p>) : (
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
  placeholder="Add task"
  className="
    w-full

    rounded-2xl
    border
    border-white/10

    bg-white/50
    dark:bg-white/5

    px-4
    py-3

    backdrop-blur-xl

    outline-none

    transition-all
    duration-300

    focus:ring-2
    focus:ring-blue-500/40

    text-zinc-900
dark:text-zinc-100
    placeholder:text-slate-400
  "
/>

            <button
                onClick={handleAddTask}
                className="
  rounded-2xl

  bg-gradient-to-r
  from-blue-500
  to-indigo-600

  px-4
  py-3

  font-semibold
  text-white

  shadow-lg
  shadow-blue-500/20

  transition-all
  duration-300

  hover:scale-[1.02]
  hover:shadow-xl

  active:scale-[0.98]

  cursor-pointer
"
            >
                Add Task
            </button>
        </div>
        </div>
  );
}
