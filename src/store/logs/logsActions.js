import {GET_LOGS_BY_DATE, GET_LOGS_BY_DATE_FAILURE} from "./logsActionTypes";
import axiosApi from "../../axiosApi";


export const getLogsByDateSuccess = (value) => ({type: GET_LOGS_BY_DATE, value})
export const getLogsByDateFailure = (value) => ({type: GET_LOGS_BY_DATE_FAILURE, value})



export const getAllLogsByDate = (day, month, year) => {
    return async dispatch => {
        try {
            const response = await axiosApi.get(`/logs/${day}_${month}_${year}`)
            dispatch(getLogsByDateSuccess(response.data))
            // console.log(response.data.message)
        } catch(e) {
            console.log(e.response.data.message)
            dispatch(getLogsByDateFailure(e.response.data.message))
        }
    }
}