'use client'

import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";
import React from "react";
import { check, pencil, trash } from "./icons";

export default function Tasks({props}: {props:{index:number, task:string, isEmpty?:boolean, removeTask?:(index:number) => void, editTask?:(index:number, task:string) => void, reorderTask?:(index:number, offset:number, pos?:number) => void}}){

    const [removed, setRemoved] = useState(true);
    const [editing, setEditing] = useState(false);
    const [task, setTask] = useState('');

    //for dragging
    const [startMouseDown, setStartMouseDown] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [mousePos, setMousePos] = useState(0);
    let isEmpty = props.isEmpty;

    let panelStartPos = 0;

    const panelRef = useRef(null);
    const inputRef = useRef(null);
    const editRef = useRef(null);

    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    const removeTask = async (index:number) => {
        setRemoved(true);
        await sleep(150);
        if(props.removeTask) props.removeTask(index);
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
            if(props.editTask) props.editTask(props.index, task);
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

    const startClick = (e:React.MouseEvent) => {
        if(!editing){
            // console.log("clicked", props.index);
            //@ts-ignore
            // const el = panelRef.current as HTMLElement;
            // const pos = el.getBoundingClientRect().top
            const pos = e.pageY;
            panelStartPos = pos;
            setStartMouseDown(true);
            setIsDragging(true);
            document.addEventListener("mouseup", stopClick)
            document.addEventListener("mousemove", mouseMove);
        }
    }

    const mouseMove = (e:MouseEvent) => {
        const offset = e.pageY - panelStartPos
        setMousePos(offset);
        if(!isEmpty){
            if(offset > 20 || offset < -20){
                if(props.reorderTask) props.reorderTask(props.index, 0, e.pageY);
                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mouseup", stopClick);
            }
        }

        // if(offset > 30){
            // if(props.reorderTask) props.reorderTask(props.index, 1);
        // }
    }

    const stopClick = (e:MouseEvent) => {
        // console.log("mouse up", startMouseDown)
        // if(startMouseDown){
            setStartMouseDown(false);
            setIsDragging(false);
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", stopClick);
        // }
    }

    useEffect(() => {
        addTask()
        setTask(props.task);
    }, [props.task])

    if(props.isEmpty){
        return(
            <div className=" bg-blue-100 max-w-[20rem] w-full rounded-lg py-[26px] text-black">
                
            </div>
        )
    }
    else{
        return(
            <div className={`bg-orange-300 max-w-[20rem] w-full shadow-lg rounded-lg p-2 flex justify-between border-2 items-center ${isDragging ? 'transition-none' : 'transition-all'} ${removed ? 'scale-0 opacity-0': ''} ${editing ? 'border-orange-500 cursor-default py-0' : 'border-transparent cursor-grab'}`}
                style={{transform: `translate(0px, 0px)`}}
                onMouseDown={startClick}
                ref={panelRef}
            >
                <form className={`grow w-6 ${editing ? "select-auto" : "select-none"}`} onSubmit={startEditingTask}>
                    <input className={`bg-transparent outline-none font-semibold transition-all w-full ${editing ? "pointer-events-auto select-auto py-3" : "pointer-events-none select-none"}`} disabled={!editing} value={task} ref={inputRef} onBlur={blurTask} onChange={editTask}/>
    
                </form>
                <div className="flex">
                    <button className="p-2" ref={editRef} onClick={startEditingTask}>{editing ? check :pencil}</button>
                    <button className="p-2" onClick={() => removeTask(props.index)}>{trash}</button>
                </div>
            </div>
        )
    }
}

