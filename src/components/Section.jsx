import React, { useState} from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

export default function Section({ section, addTask, deleteTask, deleteSection }) {
    const [task, setTask] = useState("");

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: section.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleAddTask = () => {
        addTask(section.id, task);
        setTask("");
    };
  return (
    <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className='cursor-grab active:cursor-grabbing p-4 bg-white/20 rounded-2xl shadow-md mb-4'
    >
        {/* Section header */}
    <div className='flex justify-between items-center mb-3'>
        <h2 className='text-xl font-semibold'>{section.title}</h2>
        <button
            onClick={() => deleteSection(section.id)}
            className='text-red-500 hover:text-red-700 font-bold'
        >
            X
        </button>
    </div>

    {/* Task lista */}
    <div className='mb-3'>
        {section.tasks.length === 0 ? (
            <p className='text-gray-400 italic'>No tasks yet...</p>) : (
                section.tasks.map((t) => (
                    <div
                        key={t.id}
                        className='flex justify-between items-center bg-black/30 rounded-lg p-2 mb-2'
                    >
                        <span>{t.text}</span>
                        <button
                            onClick={() => deleteTask(section.id, t.id)}
                        >
                            X
                        </button>
                    </div>
                ))
        )}
    </div>

    {/* Add task */}
    <div className="flex gap-2">
            <input 
                type="text" 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder='Add task'
                className='flex-grow border rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400'
            />

            <button
                onClick={handleAddTask}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition cursor-pointer'
            >
                Add Task
            </button>
            </div>
        </div>
  );
}
