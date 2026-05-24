import React, { useEffect, useRef, useState} from 'react';
import { CSS } from "@dnd-kit/utilities";
import Task from '@/components/Task';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from "framer-motion";
import TaskProgress from '../TaskProgress/TaskProgress';
import { useHaptic } from '../../hooks/useHaptic';

export default function Section({ section, addTask, deleteTask, updateTask, deleteSection, onTaskClick }) {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [isAdding, setIsAdding] = useState(false);

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
        if (e) e.stopPropagation();
        if (task.trim() === "") {
            setIsAdding(false);
            return;
        }
        addTask(section.id, task, description);
        setTask("");
        setDescription("")
        setIsAdding(false);
    };

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
                relative
                w-full
                max-w-full
                sm:max-w-[310px] /* Kompakt bredd precis som kolumnerna på bilden */
                rounded-2xl
                p-4
                mb-4
                bg-[#12131a]/95
                border
                border-zinc-800/40
                shadow-2xl
                transition-all
                duration-300
                ${isDragging ? "scale-[1.01] ring-1 ring-zinc-700/50 z-50 opacity-80" : ""}
            `}
        >

        {/* Section header */}
<div className='flex justify-between items-center mb-4'>
    {/* Drag handle */}
    <div className='flex items-center gap-2 min-w-0'>
        <div 
                        {...listeners} 
                        {...attributes}
                        className='grid grid-cols-2 gap-[3px] p-1 cursor-grab active:cursor-grabbing opacity-30 hover:opacity-80 transition-opacity'
                    >
                        <span className="w-1 h-1 rounded-full bg-white"></span>
                        <span className="w-1 h-1 rounded-full bg-white"></span>
                        <span className="w-1 h-1 rounded-full bg-white"></span>
                        <span className="w-1 h-1 rounded-full bg-white"></span>
                    </div>

        <div className="flex items-center gap-2 min-w-0">
                        <h2 className='text-sm font-semibold tracking-wide truncate select-none text-zinc-100'>
                            {section.title}
                        </h2>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800/60 text-zinc-400 font-medium">
                            {section.tasks.length}
                        </span>
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
                <div className='mb-3 min-h-[10px]'>
                    {section.tasks.length === 0 && !isAdding ? (
                        <p className='text-zinc-600 italic text-xs py-2 px-1 select-none'>
                            No tasks yet...
                        </p>
                    ) : (
                        section.tasks.map((t) => (
                            <Task
                                key={t.id}
                                task={t}
                                sectionId={section.id}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                onTaskClick={onTaskClick} 
                            />
                        ))
                    )}
                </div>
            </SortableContext>


    {/* Add task */}
<div onPointerDown={(e) => e.stopPropagation()} className="mt-2">
    <AnimatePresence mode="wait">
        {isAdding ? (
            <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col gap-2"
            >
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    // onBlur={handleAddTask}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTask(e)}
                    placeholder="What's on your mind?"
                    autoFocus
                    className="w-full rounded-xl border border-zinc-800 bg-[#181922] px-3 py-2 text-xs text-zinc-100 outline-none focus:border-zinc-700 placeholder:text-zinc-600"
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    onPointerDown={(e) => e.stopPropagation()} 
                    placeholder="Optional description..." 
                    className="w-full rounded-xl border border-zinc-800 bg-[#181922] px-3 py-2 text-xs text-zinc-300 outline-none focus:border-zinc-700 placeholder:text-zinc-600 whitespace-pre-wrap" 
                />
                <button
                    type="button"
                    onClick={handleAddTask}
                    disabled={!task.trim()}
                    className="w-full rounded-xl bg-zinc-900/40 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
>
  Save task
</button>
            </motion.div>
        ) : (
            <button
                onClick={() => setIsAdding(true)}
                className="w-full flex items-center gap-2 px-2 py-2 text-xs font-medium text-zinc-500 hover:text-zinc-300 rounded-xl hover:bg-zinc-900/40 transition-all text-left"
            >
                <span className="text-sm">+</span> Add task
            </button>
        )}
    </AnimatePresence>
</div>
        </div>
  );
}
