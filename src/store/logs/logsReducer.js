import {GET_LOGS_BY_DATE, GET_LOGS_BY_DATE_FAILURE} from "./logsActionTypes";

const initialState = {
    logs: [],
    error: ""
}


const logsReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_LOGS_BY_DATE_FAILURE:
            return {...state, error: action.value}
        case GET_LOGS_BY_DATE:
            return {...state, logs: action.value, error: ""}
        default:
            return state
    }
}


export default logsReducer