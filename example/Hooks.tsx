import React, { Component, useState } from 'react';
import { useGlobalState } from 'react-global-shared'
import listState from './globalState/listState';


export default () => {
    const [ value, setValue] = useState("")
    const list = useGlobalState(listState)
    return <div>
        <div>
            <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
            <button onClick={() => listState.add({name: value})}>add</button>
        </div>
        {list.map((item, index) => <div key={index}>
            <div style={{display: "inline-block", width: 180}}>{item.name}</div>
            <div style={{display: "inline-block", cursor: "pointer"}} onClick={() => listState.delete(index)}>X</div>
        </div>)}
    </div>
}