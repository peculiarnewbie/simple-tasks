'use client'

import { useState } from "react";
import TaskInput from "./taskInput";


export default function Tasks(){
    const [tasks, setTasks] = useState(['Go Shopping', 'Do Laundry', 'Zoom Meeting']);

  const addTask = (task:string) => {
    const temp = [...tasks];
    temp.push(task);
    setTasks(temp);
  }

  const removeTask = (index:number) => {
    const temp = [...tasks];
    temp.splice(index, 1);
    setTasks(temp);
  }


    return(
        <div className='bg-white h-full w-full sm:w-1/2 max-w-[32rem] sm:rounded-xl sm:h-2/3 overflow-hidden shadow-lg flex flex-col'>
              <div className='h-fit p-10 bg-slate-100 flex flex-col items-center gap-6'>
                  <p className='text-orange-500 text-3xl font-bold text-center'>Get Things Done!</p>
                  <TaskInput props={{addTask}}/>
              </div>
              <div className=' grow w-full overflow-auto p-4'>
                <div className='flex flex-col items-center gap-4'>
                  {tasks.map((task, index) => {
                    return(
                      <div key={index} className='bg-orange-300 max-w-[20rem] w-full rounded-lg p-3 flex justify-between'>
                        <p>{task}</p>
                        <div>
                            <button></button>
                            <button onClick={() => removeTask(index)}>d</button>
                        </div>
                            
                      </div>
                    )
                  })}
                </div>
            </div>
        </div>
    )
}