import listState from "./globalState/listState";

export const add = function(user){
    listState.add(user)
}
export const del = function(index){
    listState.delete(index)
}
