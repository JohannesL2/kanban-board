import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export default function GuideModal({isOpen, onClose}) {
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
                How to use:
              </DialogTitle>
             <p className="mt-2 text-sm/6 text-white/50 dark:text-white">
  Welcome to your Kanban Board! <br /><br />
  1. Organize your workflow by creating sections like <strong>Backlog</strong> and <strong>Work in Progress</strong>.<br />
  2. Add tasks to each section using the "+" button.<br />
  3. Drag tasks between sections to update their status.<br />
  4. Move completed tasks to the <strong>Done</strong> section.<br /><br />
  Keep your tasks organized and your workflow smooth!

  <p className='text-red-500 text-xl mt-5'>some functions may not be available yet</p>
</p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={onClose}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}