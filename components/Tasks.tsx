'use client'

import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";
import { check, pencil, trash } from "./icons";

export default function Tasks({props}: {props:{index:number, task:string, removeTask:(index:number) => void, editTask:(index:number, task:string) => void}}){

    const [removed, setRemoved] = useState(true);
    const [editing, setEditing] = useState(false);
    const [task, setTask] = useState('');

    const inputRef = useRef(null);
    const editRef = useRef(null);

    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    const removeTask = async (index:number) => {
        setRemoved(true);
        await sleep(150);
        props.removeTask(index);
        setRemoved(false);
    }

    const addTask = async () => {
        setRemoved(false);
    }

    const startEditingTask = () => {
        if(!editing){
            setEditing(true);
            setTimeout(() => {
                //@ts-ignore
                const el = inputRef.current as HTMLInputElement
                el.focus();
                const val = el.value;
                el.value = '';
                el.value = val;
            }, 0)
        } else {
            props.editTask(props.index, task);
            setEditing(false);
        }
    }

    const editTask = (e:ChangeEvent) => {
        const el = e.target as HTMLInputElement
        setTask(el.value);
    }

    const blurTask = (e:FocusEvent) => {
        if(e.relatedTarget != editRef.current){
            setTask(props.task);
            setEditing(false);
        }
    }

    useEffect(() => {
        addTask()
        setTask(props.task);
    }, [props.task])

    return(
        <div key={props.index} className={`bg-orange-300 max-w-[20rem] w-full shadow-lg rounded-lg p-3 flex justify-between transition-all border-2 ${removed ? 'scale-0 opacity-0': ''} ${editing ? 'border-orange-500' : 'border-transparent'}`}>
            <form onSubmit={startEditingTask}>
                <input className="bg-transparent outline-none font-semibold" disabled={!editing} value={task} ref={inputRef} onBlur={blurTask} onChange={editTask}/>

            </form>
            <div className="flex gap-2">
                <button ref={editRef} onClick={startEditingTask}>{editing ? check :pencil}</button>
                <button onClick={() => removeTask(props.index)}>{trash}</button>
            </div>
        </div>
    )
}

