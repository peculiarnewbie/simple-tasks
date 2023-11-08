'use client'

import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import Tasks from "./Tasks";
import TaskDragged from "./TaskDragged";


export default function MainWindow(){
  const [tasks, setTasks] = useState([
    {task:'Go Shopping', isEmpty:false},
    {task:'Do Stuff', isEmpty:false},
    {task:'Zoom Meeting',  isEmpty:false}
  ]);
  const [deletedTask, setDeletedTask] = useState({task:'', index:-1})
  const [draggedTask, setDraggedTask] = useState({task:'', index:-1, pos:0})

  let deleteTimeout:NodeJS.Timeout;

  const addTask = (task:string) => {
    const temp = [...tasks];
    temp.push({task:task, isEmpty:false});
    setTasks(temp);
    resetDeletedTask();
  }

  const removeTask = (index:number) => {
    let temp = [...tasks];
    setDeletedTask({task:temp[index].task, index:index});
    temp.splice(index, 1);
    setTasks(temp);
  }

  const editTask = (index:number, task:string) => {
    const temp = [...tasks];
    temp[index].task = task;
    setTasks(temp);
    resetDeletedTask();
  }

  const undoDelete = () => {
    let temp = [...tasks];
    temp.splice(deletedTask.index, 0, {task:deletedTask.task, isEmpty:false})
    setTasks(temp)
    resetDeletedTask();
  }

  const resetDeletedTask = () => {
    clearTimeout(deleteTimeout);
    setDeletedTask({task:'', index:-1})
  }

  const reorderTask = (index:number, offset:number, pos?:number) => {
    console.log(index, offset)
    if(offset == 0){
      let tempArr = [...tasks]
      if(tempArr[index].isEmpty){ // stop ordering
        console.log("done", tasks, tasks[0])
        tempArr.forEach((task) => {
          task.isEmpty = false;
        })
        tempArr[index].isEmpty = false;
        setDraggedTask({task: '', index: -1, pos: 0})
        // setTasks(tempArr);

      } else { // start ordering
        tempArr[index].isEmpty = true;
        console.log('wtf')
        setDraggedTask({task:tempArr[index].task, index:index, pos:pos ?? 0})
        // setTasks([...tempArr]);
      }
    }
    else {
      let temp = [...tasks]
      console.log('move', index, index + offset, temp);
      console.log(temp[index].task, temp[index + offset].task)
      const tempTask = temp[index];
      temp[index] = temp[index + offset];
      temp[index + offset] = tempTask;
      setTasks(temp);
    }
  }

  useEffect(() => {
    if(deletedTask.index >= 0){
      
      deleteTimeout = setTimeout(() => {
        resetDeletedTask()
      }, 2500);
    }

    return () => clearTimeout(deleteTimeout);
  }, [deletedTask])

  useEffect(() => {
    console.log('tasks', tasks);
  }, [tasks])

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
                    <Tasks key={index} props={{index, task:task.task, isEmpty:task.isEmpty, removeTask, editTask, reorderTask}}/>
                  )
                })}
                <TaskDragged key={'dragged'} props={{index:draggedTask.index, task:draggedTask.task, pos:draggedTask.pos, length:tasks.length, reorderTask}}/>
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