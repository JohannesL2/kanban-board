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
    >
        {/* Section header */}
    <div>
        <h2>{section.title}</h2>
        <button
            onClick={() => deleteSection(section.id)}
        >
            X
        </button>
    </div>

    {/* Task lista */}
    <div>
        {section.tasks.length === 0 ? (
            <p>No tasks yet...</p>) : (
                section.tasks.map((t) => (
                    <div
                        key={t.id}
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
