import { useEffect, useRef, useState } from "react";
import Tasks from "./Tasks";


export default function TaskDragged({props} : {props:{index:number, task:string, pos:number, length:number, reorderTask:(index:number, offset:number) => void}}){
    const panelRef = useRef(null)
    const [offset, setOffset] = useState(0);
    
    let index = props.index;
    let task = props.task
    let startPos = 0
    let orderOffset = 0

    const moveTask = (e:MouseEvent) => {
        setOffset(e.pageY- 34 -startPos);
        let truOffset = e.pageY - startPos + 68 * (props.length - index - 1 - orderOffset)
        // console.log(startPos, e.pageY, truOffset, index)
        if(truOffset > 0){
            props.reorderTask(props.index + orderOffset, 1);
            orderOffset++
        } else if (truOffset < -68) {
           props.reorderTask(props.index + orderOffset, -1) 
           orderOffset--
        }
    }

    const stopTaskHandler = () => {
        stopTask()
    }

    const stopTask = () => {
        document.removeEventListener("mousemove", moveTask)
        document.removeEventListener("mouseup", stopTask)
        setOffset(0);
        setTimeout(() => {
            props.reorderTask(props.index + orderOffset, 0);
        }, 0);
    }

    useEffect(() => {
        // console.log("mount", props.index)
        if(props.index >= 0){
            // @ts-ignore
            const el = panelRef.current as HTMLElement;
            startPos = el.getBoundingClientRect().top;
            // console.log(props.pos, startPos);
            setOffset(props.pos - startPos);
            document.addEventListener("mousemove", moveTask)
            document.addEventListener("mouseup", stopTaskHandler)

            index = props.index
        }

        return () => {
            document.removeEventListener("mousemove", moveTask);
            document.removeEventListener("mouseup", stopTaskHandler)
        }
    }, [props.index])

    if(props.index < 0){
        return(
            <></>
        )
    }
    else {
        return(
            <div ref={panelRef} className="w-full flex justify-center cursor-grabbing"
                style={{transform: `translate(0px, ${offset}px)`}}
            >
                <div className="w-full flex justify-center pointer-events-none">
                    <Tasks props={{index , task}}/>

                </div>
            </div>
        )        
    }

}