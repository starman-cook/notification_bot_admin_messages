import {GET_ALL_MESSAGES} from "./messagesActionTypes";
import axiosApi from "../../axiosApi";


export const getAllMessagesSuccess = (value) => ({type: GET_ALL_MESSAGES, value})



export const getAllMessages = () => {
    return async dispatch => {
        try {
            const response = await axiosApi.get("/adminMessages")
            dispatch(getAllMessagesSuccess(response.data))
        } catch(e) {
            console.log(e)
        }
    }
}

export const deleteMessage = (id, password) => {
    return async () => {
        try {
            await axiosApi.delete(`/delete/${id}`, {headers: {pass: password}})
        } catch(e) {
            console.log(e)
        }
    }
}

export const updateMessage = (id, data, password) => {
    return async () => {
        try {
            await axiosApi.post(`/updateAdminMessage/${id}`, data,  {headers: {pass: password}})
        } catch(e) {
            console.log(e)
        }
    }
}

export const createMessage = (data, password) => {
    return async () => {
        try {
            await axiosApi.post(`/adminMessages`, data, {headers: {pass: password}})
        } catch(e) {
            console.log(e)
        }
    }
}