import React, { Component } from 'react';
import { connect } from '../lib/index'
import listState from './globalState/listState';
class Commonly extends React.Component<any> {
    state = {
        userName: ""
    }
    
    render(){
        const list = this.props.list
        return <div>
            <div>
                <input type="text" value={this.state.userName} onChange={e => this.setState({userName: e.target.value})}/>
                <button onClick={() => listState.add({name: this.state.userName})}>add</button>
            </div>
            {list.map((item, index) => <div key={index}>
                <div style={{display: "inline-block", width: 180}}>{item.name}</div>
                <div style={{display: "inline-block", cursor: "pointer"}} onClick={() => listState.delete(index)}>X</div>
            </div>)}
        </div>
    } 
}
export default connect(Commonly, listState)