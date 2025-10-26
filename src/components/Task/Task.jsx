import React, { useState } from 'react';
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

    const [fontSize, setFontSize] = useState(task.fontSize || "base");
    const [bold, setBold] = useState(task.bold || false);

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

  return (
    <div
        ref={setNodeRef}
        style={style}
        className='flex justify-between items-center bg-black/5 dark:bg-black/5 rounded-lg p-2 mb-2 cursor-grab active:cursor-grabbing'
        >
        <div className='flex justify-between items-center'>
            <div {...listeners} {...attributes} className='cursor-grab p-1'>
                ☰
            </div>

            <span
                className={`${FONT_SIZE_CLASSES[fontSize] || "text-base"} ${
                    bold ? "font-bold" : "font-normal"
                }`}
            >
                {task.text}
            </span>

            <button onClick={(e) => {
                e.stopPropagation();
                deleteTask(sectionId, task.id);
            }}
                >
                X
                </button>
            </div>

        <div className='flex justify-end gap-2 mt-2'>
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
                    bold ? "bg-gray-300" : "bg-white"
                }`}
            >
                B
            </button>
        </div>
    </div>
  )
}
