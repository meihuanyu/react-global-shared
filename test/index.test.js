import React from 'react';
import { useGlobalState, connect} from '../lib/index';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
function HookWrapper(props) {
    const hook = props.hook ? props.hook() : undefined;
    return <div hook={hook} />;
}
describe("useGlobalState", () => {
    it('should render', () => {
        let wrapper = shallow(<HookWrapper />);
        expect(wrapper.exists()).toBeTruthy();
    });
    it("default value", () => {
        const userState = { name: "user", state: "xiaoming" }
        const wrapper = shallow(<HookWrapper hook={() => useGlobalState(userState)}/>)
        const { hook } = wrapper.find('div').props()
        const vlaue = hook
        expect(vlaue).toEqual('xiaoming')
    })
    it("change value", () => {
        const userState = { name: "user", state: "xiaoming" , changeName: function(name){ this.state =  name}}
        let wrapper = shallow(<HookWrapper hook={() => useGlobalState(userState)}/>)
        let value = wrapper.find('div').prop('hook')
        expect(value).toEqual('xiaoming')

        userState.changeName('xiaohong')
        wrapper = shallow(<HookWrapper hook={() => useGlobalState(userState)}/>)
        value = wrapper.find('div').prop('hook')
        expect(value).toEqual('xiaohong')
    })
})
describe("connect", () => {
    const App = (props) => {
        const user = props.user ? props.user : undefined
        return <div user={user} />
    }
    it('should render', () => {
        const Com = connect(App)
        let wrapper = shallow(<Com />);
        expect(wrapper.exists()).toBeTruthy();
    })
    it('default value', () => {
        const userState = { name: "user", state: "xiaoming" }
        const Com = connect(App, userState)
        let wrapper = shallow(<Com />);
        let user = wrapper.prop('user') 
        expect(user).toEqual('xiaoming')
    })
    it('change value', () => {
        const userState = { name: "user", state: "xiaoming" , changeName: function(name){ this.state =  name}}
        const Com = connect(App, userState)
        let wrapper = shallow(<Com />);
        userState.changeName('xiaohong')
        let user = wrapper.prop('user') 
        expect(user).toEqual('xiaohong')
    })
})

