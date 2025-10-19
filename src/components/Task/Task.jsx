import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Task({ task, sectionId, deleteTask }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
        data: { sectionId },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

  return (
    <div
        ref={setNodeRef}
        style={style}
        className='flex justify-between items-center bg-black/5 dark:bg-black/5 rounded-lg p-2 mb-2 cursor-grab active:cursor-grabbing'
        >
            <div {...listeners} {...attributes} className='cursor-grab p-1'>
                ☰
            </div>
            <span>{task.text}</span>
            <button onClick={(e) => {
                e.stopPropagation();
                deleteTask(sectionId, task.id);
            }}
                >
                X
                </button>
    </div>
  )
}
