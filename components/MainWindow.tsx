'use client'

import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import Tasks from "./Tasks";


export default function MainWindow(){
  const [tasks, setTasks] = useState(['Go Shopping', 'Do Laundry', 'Zoom Meeting']);
  const [deletedTask, setDeletedTask] = useState({task:'', index:-1})

  let deleteTimeout:NodeJS.Timeout;

  const addTask = (task:string) => {
    const temp = [...tasks];
    temp.push(task);
    setTasks(temp);
    resetDeletedTask();
  }

  const removeTask = (index:number) => {
    let temp = [...tasks];
    setDeletedTask({task:temp[index], index:index});
    temp.splice(index, 1);
    setTasks(temp);
  }

  const editTask = (index:number, task:string) => {
    const temp = [...tasks];
    temp[index] = task;
    setTasks(temp);
    resetDeletedTask();
  }

  const undoDelete = () => {
    let temp = [...tasks];
    temp.splice(deletedTask.index, 0, deletedTask.task)
    setTasks(temp)
    resetDeletedTask();
  }

  const resetDeletedTask = () => {
    clearTimeout(deleteTimeout);
    setDeletedTask({task:'', index:-1})
  }

  useEffect(() => {
    if(deletedTask.index >= 0){
      
      deleteTimeout = setTimeout(() => {
        resetDeletedTask()
      }, 2500);
    }

    return () => clearTimeout(deleteTimeout);
  }, [deletedTask])

  return(
      <div className='bg-white h-full w-full sm:w-1/2 max-w-[32rem] sm:rounded-xl sm:h-2/3 overflow-hidden shadow-lg flex flex-col'>
            <div className='relative h-fit p-10 bg-slate-100 flex flex-col items-center gap-6'>
                <p className='text-orange-500 text-3xl font-bold text-center'>Get Things Done!</p>
                <TaskInput props={{addTask}}/>
                {deletedTask.index >= 0 ? <button className="absolute bg-red-500 p-2 rounded-lg z-10 translate-y-6 bottom-0 shadow-lg font-semibold" onClick={undoDelete}>undo delete</button> : <></>}
            </div>
            <div className='flex grow w-full overflow-auto p-4 justify-center'>
              <div className='flex flex-col w-full items-center gap-4'>
                {tasks.map((task, index) => {
                  return(
                    <Tasks key={index+task} props={{index, task, removeTask, editTask}}/>
                  )
                })}
              </div>
          </div>
      </div>
  )
}


/*

all improvements:
- animation feedbacks on actions
- used form on inputs
- padding on buttons
- undo
- rearrange

*/