import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Modal({ taskIsOpen, selectedTask, onClose }) {
    const overlayRef = useRef(null);
    const closeButtonRef = useRef(null);
    const previousActiveElement = useRef(null);

    // Focus management & trap
    useEffect(() => {
        if (taskIsOpen) {
            // Save current focus
            previousActiveElement.current = document.activeElement;

            // Move focus to close button
            setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 100);

            // Handle Escape key
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }

        // Restore focus when modal closes
        if (previousActiveElement.current && previousActiveElement.current.focus) {
            previousActiveElement.current.focus();
        }
    }, [taskIsOpen, onClose]);

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    if (!selectedTask) return null;

    return (
        <AnimatePresence>
            {taskIsOpen && (
                <motion.div
                    ref={overlayRef}
                    onClick={handleOverlayClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                    role="presentation"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-2xl bg-[#12131a] border border-zinc-800/40 rounded-2xl shadow-2xl p-6 relative"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        {/* Close Button */}
                        <button
                            ref={closeButtonRef}
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Close modal"
                        >
                            <span className="text-zinc-400 text-xl font-bold">×</span>
                        </button>

                        {/* Modal Content */}
                        <div className="">
                            {/* Title */}
                            <h2
                                id="modal-title"
                                className={`text-2xl font-bold text-white mb-4 text-center break-words ${selectedTask.bold ? 'font-black' : ''}`}
                            >
                                {selectedTask.text}
                            </h2>

                            {/* Priority Badge */}
                            {selectedTask.priority && (
                                <div className="mb-4">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedTask.priority === 'high'
                                                ? 'bg-red-500/20 text-red-400'
                                                : selectedTask.priority === 'medium'
                                                    ? 'bg-amber-500/20 text-amber-400'
                                                    : 'bg-sky-500/20 text-sky-400'
                                            }`}
                                    >
                                        {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)} Priority
                                    </span>
                                </div>
                            )}

                            {/* Description Section */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-2 text-center">
                                    Description
                                </h3>
                                <div
                                    id="modal-description"
                                    className="text-zinc-300 leading-relaxed bg-zinc-900/30 rounded-lg p-4 min-h-[120px] border border-zinc-800/20 text-center break-words whitespace-pre-wrap"
                                >
                                    {selectedTask.description && selectedTask.description.trim() !== '' ? (
                                        selectedTask.description
                                    ) : (
                                        <span className="text-zinc-500 italic">No description provided yet.</span>
                                    )}
                                </div>
                            </div>

                            {/* Task Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-zinc-500">Task ID:</span>
                                    <p className="text-zinc-200 font-mono">{selectedTask.id}</p>
                                </div>
                                {selectedTask.done !== undefined && (
                                    <div>
                                        <span className="text-zinc-500">Status:</span>
                                        <p className="text-zinc-200">
                                            {selectedTask.done ? '✅ Complete' : '🔄 In Progress'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}