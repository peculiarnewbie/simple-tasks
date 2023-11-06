'use client'

import { useState } from "react";

export default function Tasks({props}: {props:{index:number, task:string, removeTask:(index:number) => void}}){

    const [removed, setRemoved] = useState(false);

    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    const removeTask = async (index:number) => {
        // setRemoved(true);
        // await sleep(200);
        props.removeTask(index);
        // setRemoved(false);
    }

    return(
        <div key={props.index} className={`bg-orange-300 max-w-[20rem] w-full rounded-lg p-3 flex justify-between transition-all ${removed ? 'scale-0 opacity-0': ''}`}>
            <p>{props.task}</p>
            <div>
                <button></button>
                <button onClick={() => removeTask(props.index)}>d</button>
            </div>
            
        </div>
    )
}