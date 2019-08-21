import update from 'immutability-helper'
export default {
    name: "list",
    state: [],
    add: function(user){
        this.state = [user, ...this.state]
    },
    delete: function(index){
        this.state = update(this.state, { $splice: [[index, 1]] })
    }
}