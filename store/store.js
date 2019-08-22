import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//initState
const initUserState = {};

//actions type
const LOGOUT = 'LOGOUT';

function userReducer(state = initUserState, action) {
    switch (action.type) {
        case LOGOUT:
            return {};
        default:
            return state;
    }
}
//action creatore
export function logout() {
    return async dispatch => {
        const resp = await fetch('/logout', { method: 'post' }).then(resp=>resp.json());
        if (resp.status === 200) {
            dispatch({
                type: LOGOUT
            })
        } else {
            console.warn('logout error', resp);

        }
    }
}
const allReducers = combineReducers({
    user: userReducer
})
export function initializeStore(state) {
    return createStore(
        allReducers,
        { user: initUserState, ...state },
        composeWithDevTools(applyMiddleware(thunk))
    )
}