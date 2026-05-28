import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GuideModal({isOpen, onClose}) {
  const guideSteps = [
    {
      title: 'Shape your workflow',
      description: 'Create sections for each stage of your process, from Backlog to Done.',
    },
    {
      title: 'Capture every task',
      description: 'Use the "+" button to add tasks directly where they belong.',
    },
    {
      title: 'Keep work moving',
      description: 'Drag tasks between sections as priorities change or progress is made.',
    },
    {
      title: 'Finish with clarity',
      description: 'Move completed work into Done so your board always reflects what is next.',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
      <Dialog
        as='div'
        open={isOpen} 
        onClose={onClose} 
        className="relative z-50 focus:outline-none"
      >
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        />
        
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0}}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className='w-full max-w-md rounded-2xl bg-gray-900/80 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/10'
            >
            <DialogPanel>
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-white"
              >
                Make the most of your board
              </DialogTitle>
              <div className='mt-4 text-sm leading-relaxed text-zinc-300'>
                <p className='text-zinc-400'>
                  A focused Kanban flow helps you plan, track, and finish work without losing momentum.
                </p>
                <ol className='mt-5 space-y-3'>
                  {guideSteps.map((step, index) => (
                    <li key={step.title} className='flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3'>
                      <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-semibold text-indigo-200 ring-1 ring-indigo-400/30'>
                        {index + 1}
                      </span>
                      <div>
                        <p className='font-medium text-zinc-100'>{step.title}</p>
                        <p className='mt-1 text-zinc-300'>{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-colors focus:not-data-focus:outline-none data-focus:outline data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-indigo-200 data-hover:bg-indigo-400 data-open:bg-indigo-500"
                  onClick={onClose}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
            </motion.div>
          </div>
      </Dialog>
      )}
    </AnimatePresence>
  )
}
