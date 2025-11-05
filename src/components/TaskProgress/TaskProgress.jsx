import React from 'react';
import { motion } from 'framer-motion';

export default function TaskProgress({ section }) {

const totalTasks = section.tasks.length;
const completedTasks = section.tasks.filter(t => t.done).length;
const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

if (totalTasks === 0) return null;

  return (
        <div className='mb-2'>
            <div className='w-full h-3 bg-gray-300 rounded overflow-hidden'>
                <motion.div
                    className='h-3 rounded bg-green-500'
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        <span className='text-xs text-gray-500'>
            {completedTasks} / {totalTasks} tasks done
        </span>
        </div>
  )
}
