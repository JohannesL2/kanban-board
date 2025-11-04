import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsModal({isOpen, onClose, resetBoard}) {
  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to reset the board? This cannot be undone."
      )
    ) {
      resetBoard();
      onClose();
    }
  }

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
                ⚙️ Settings
              </DialogTitle>

            <div className='space-y-4 text-white/80 text-sm mt-4'>
              <div className='flex justify-between items-center'>
                <p className='text-white text-xl'>Dark mode toggle:</p>
                <span className='bg-black rounded-xl border-2 p-4'><DarkModeToggle/></span>
              </div>
            </div>

            <Button
                  className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-2 mt-4"
                  onClick={handleReset}
                >
                  🔄 Reset Board
            </Button>

  <p className='text-red-400 text-medium mt-5'>
    some functions may not be available yet
  </p>
  
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={onClose}
                >
                  Save & Close
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