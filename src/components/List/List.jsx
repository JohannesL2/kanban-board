import React, { useState } from 'react'

export default function List() {
  const [title, setTitle] = useState("")
  const [sections, setSections] = useState([])
  const [message, setMessage] = useState("")

  const createSection = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
        setMessage("⚠️ Error! Needs input for section");
        return;
    }

    const newSection = { id: Date.now(), title, tasks: [] }
    setSections([...sections, newSection])
    setTitle("")
    setMessage("")
  }

  const addTask = (sectionId, taskText) => {
    if (taskText.trim() === "") return

    setSections(sections.map(section => {
        if (section.id === sectionId) {
            return {
                ...section,
                tasks: [...section.tasks, { id: Date.now(), text: taskText }]
            }
        }
        return section
    }))
  }

  const deleteTask = (sectionId, taskId) => {
    setSections(sections.map(section => {
        if (section.id === sectionId) {
            return {
                ...section,
                tasks: section.tasks.filter(task => task.id !== taskId)
            }
        }
        return section
    }))
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
<div className='flex justify-center mb-10'>
    <form onSubmit={createSection} className='flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg'>
      <div className="flex flex-col flex-grow gap-2">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='bg-gray-100 p-4 text-2xl'
          placeholder='type a title'
          />

        {message && (
        <p className='text-red-400 text-xl font-semibold'>{message}</p>
        )}
        </div>
          <button
          type='submit'
          className='text-white text-3xl p-4 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition-transform transform hover:scale-110'
          >+</button>
    </form>
    </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sections.map((section) => (
                <Section
                    key={section.id}
                    section={section}
                    addTask={addTask}
                    deleteTask={deleteTask}
                />
            ))}
          </div>
        </div>
  )
}

function Section({section, addTask, deleteTask}) {
    const [task, setTask] = useState("")

    const handleAddtask = () => {
        addTask(section.id, task)
        setTask("")
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>{section.title}</h2>

            {/* Task lista */}
            <div className='flex-grow mb-4'>
                {section.tasks.length === 0 ? (
                    <p className='text-gray-400 italic'>No tasks yet...</p>
                ) : (
                    section.tasks.map((t) => (
                        <div 
                        key={t.id}
                        className='p-2 bg-gray-100 rounded-md mb-2 text-gray-700'
                        >
                            <span>{t.text}</span>
                            <button
                              onClick={() => deleteTask(section.id, t.id)}
                              className='text-red-500 hover:text-red-700 font-bold'
                            >
                                x
                            </button>
                        </div>
                    ))
                )}
            </div>

<div className="flex gap-2">
            <input 
                type="text" 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder='Add task'
                className='flex-grow border rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400'
            />

            <button
                onClick={handleAddtask}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition'
            >
                Add Task
            </button>
            </div>
        </div>
    )
}