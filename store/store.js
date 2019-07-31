import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
const initialCount={
    count:1
};

export const actionTypes={
    ADD:'ADD',
    DEC:'DEC'
} 

//reducers
function reduce(state,action){
    switch (action.type) {
        case actionTypes.ADD:
             return {count:state.count+1}    
        case actionTypes.DEC:
            return {count:state.count-1}
        default:
            return state
    }
}

//actions
export const addClick=()=>{
    return {type:actionTypes.ADD}
}
export const decClick=()=>{
    return {type:actionTypes.DEC}
}

// export const store=createStore(reduce,initialCount,composeWithDevTools(applyMiddleware(thunk)));

//保证store对象是独一无二的，不会被重用
export function initializeStore(initialState=initialCount){
    return createStore(
        reduce,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    )
}