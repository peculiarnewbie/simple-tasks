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
        <div key={props.index} className={`bg-orange-300 max-w-[20rem] w-full shadow-lg rounded-lg p-2 flex justify-between transition-all border-2 items-center ${removed ? 'scale-0 opacity-0': ''} ${editing ? 'border-orange-500 cursor-default py-0' : 'border-transparent cursor-grab'}`}>
            <form className="grow w-6" onSubmit={startEditingTask}>
                <input className={`bg-transparent outline-none font-semibold transition-all w-full ${editing ? "pointer-events-auto py-3" : "pointer-events-none"}`} disabled={!editing} value={task} ref={inputRef} onBlur={blurTask} onChange={editTask}/>

            </form>
            <div className="flex">
                <button className="p-2" ref={editRef} onClick={startEditingTask}>{editing ? check :pencil}</button>
                <button className="p-2" onClick={() => removeTask(props.index)}>{trash}</button>
            </div>
        </div>
    )
}

