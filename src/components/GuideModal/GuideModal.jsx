import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GuideModal({isOpen, onClose}) {
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
                className="text-base/7 font-medium text-white"
              >
                How to use:
              </DialogTitle>
            <div className='mt-4 text-sm text-white/70 leading-relaxed'>
            <p>
              Welcome to your <strong>Kanban Board</strong>!
            </p>
            <ol className='list-decimal list-inside mt-2 space-y-1'>
              <li>
                Organize your workflow by creating sections like{' '}
                <strong>Backlog</strong> and{' '}
                <strong>Work in Progress</strong>
              </li>
              <li>Add tasks to each section using the "+" button.</li>
              <li>Drag tasks between sections to update their status.</li>
              <li>Move completed tasks to the <strong>Done</strong> section.</li>
            </ol>
            <p className='mt-4'>
                Keep your tasks organized and your workflow smooth!
            </p>

  <p className='text-red-400 text-medium mt-5'>
    some functions may not be available yet
  </p>
</div>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
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