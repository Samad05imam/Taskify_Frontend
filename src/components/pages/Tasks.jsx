import React from 'react'
import Navbar from '../shared/Navbar'
import TaskPopulated from './TaskPopulated'
import Footer from '../shared/Footer'

const Tasks = () => {
  return (
    <div className='h-screen flex flex-col overflow-hidden'>
        <Navbar/>
        <TaskPopulated/>
        <Footer/>
    </div>
  )
}

export default Tasks