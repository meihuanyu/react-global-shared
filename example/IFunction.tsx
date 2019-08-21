import React, { Component, useState } from 'react';
import { useGlobalState } from '../lib/index'
import listState from './globalState/listState';
import { add, del } from './justFunction'

export default () => {
    const [ value, setValue] = useState("")
    const list = useGlobalState(listState)
    return <div>
        <div>
            <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
            <button onClick={() => add({name: value})}>add</button>
        </div>
        {list.map((item, index) => <div key={index}>
            <div style={{display: "inline-block", width: 180}}>{item.name}</div>
            <div style={{display: "inline-block", cursor: "pointer"}} onClick={() => del(index)}>X</div>
        </div>)}
    </div>
}