import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export default function SettingsModal({isOpen, onClose, resetBoard}) {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-10 focus:outline-none">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-black/50 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                ⚙️ Settings
              </DialogTitle>

            <div className='space-y-4 text-white/80 text-sm'>
                <div className='flex justify-between items-center'>
                    <span>Dark mode</span>
                    <input type="checkbox" className='accent-green-400'/>
                </div>
                
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-2"
                  onClick={() => {
                    if (confirm("Are you sure you want to reset the board? This cannot be undone.")) {
                      resetBoard();
                      onClose();
                    }
                  }}
                >
                  🔄 Reset Board
                </Button>

            <p className='text-red-500 text-xl mt-5'>some functions may not be available yet</p>
            </div>

              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={onClose}
                >
                  Save & Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}