import * as React from 'react';

const store: any = {}

const ExComs: any = {}
let hookSets: any = {}

const comRender = function(className: any){
    for(let i = 0; i < ExComs[className].length; i++){
        const Ex = ExComs[className]
        Ex.setState({})
    }
}
const setHooks = function(className: any, value: any){
    for(let i = 0; i < hookSets[className].length; i++){
        const fn = hookSets[className]
        fn(value)
    }
}
const defineClass = (ClassEx: any) => {
    const Ex = ClassEx
    const name = Ex.name
    const crrentState = store[name] ? store[name] : Ex.state
    store[name] =  crrentState
    let temperature = crrentState;
    Object.defineProperty(ClassEx, 'state', {
        get: function() {
            return temperature;
        },
        set: function(value) {
            store[name] = value
            temperature = value;
            setHooks(name, value)
            comRender(name)
        },
        configurable:true
    })
    return name
}
export const useGlobalState = (StateEx: any) => {
    const [ value, setValue] = React.useState(false)
    React.useEffect(() => {
        const name = defineClass(StateEx)
        if(hookSets[name]){
            hookSets[name].push(setValue)
        }else{
            hookSets[name] = [setValue]
        }
    }, [])
    return value || StateEx.state
}
export const connect = (Compoent: any , ...States:any[]) => {
    const currentStateKeys:any  = []

    for(let i=0;i<States.length;i++){
        const ClassEx = States[i]
        const name = defineClass(ClassEx)
        currentStateKeys.push(name)
    }

    return class Temp extends React.Component<any> {
        constructor(props: any){
            super(props)
            for(let i=0;i<currentStateKeys.length;i++)   {
                if(ExComs[currentStateKeys[i]]){
                    const repeatComs = ExComs[currentStateKeys[i]].filter((item: any) => item === this)
                    if(!repeatComs.length){
                        ExComs[currentStateKeys[i]].push(this)
                    }
                }else{
                    ExComs[currentStateKeys[i]] = [this]
                }
            }
        }
        render(){
            const storeProps: any = {}
            for(let i = 0; i < currentStateKeys.length; i++){
                const key = currentStateKeys[i]
                storeProps[key] = store[key]
            }
            return <Compoent {...this.props}  {...storeProps} />
        }
    }
}