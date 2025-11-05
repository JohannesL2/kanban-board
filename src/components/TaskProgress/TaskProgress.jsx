import React from 'react';

export default function TaskProgress({ section }) {

const totalTasks = section.tasks.length;
const completedTasks = section.tasks.filter(t => t.done).length;
const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

if (totalTasks === 0) return null;

  return (
        <div className='mb-2'>
        <progress 
        className="progress progress-accent w-full h-3 rounded" 
        value={progress}
        max="100"
        >
        </progress>
        <span className='text-xs text-gray-500'>
            {completedTasks} / {totalTasks} tasks done
        </span>
        </div>
  )
}
