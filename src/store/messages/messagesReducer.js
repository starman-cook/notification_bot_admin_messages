import {GET_ALL_MESSAGES} from "./messagesActionTypes";

const initialState = {
    messages: []
}


const messagesReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_ALL_MESSAGES:
            return {...state, messages: action.value}
        default:
            return state
    }
}


export default messagesReducer