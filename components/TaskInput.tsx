'use client'

import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react"
import { plus } from "./icons";

export default function TaskInput({props}: {props: {addTask:(task:string) => void}}){
    const [task, setTask] = useState('New Task');

    const changeTask = (e:ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value;
        setTask(value)
    }

    const sendTask = (e:FormEvent) => {
        e.preventDefault()
        props.addTask(task)
        console.log('tambahin');
        setTask('');
    }

    return(
        <form onSubmit={sendTask} className='flex items-center gap-2 w-full justify-center'>
            <input className='text-black p-2 w-12 rounded-md grow max-w-[16rem] focus:outline-orange-300' type='text'
                onChange={changeTask}
                value={task}
            />
            <button type="submit" className='p-2 rounded-full bg-orange-300'>{plus}</button>
        </form>
    )
}