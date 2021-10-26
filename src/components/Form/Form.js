import React, {useEffect, useState} from 'react'
import "./Form.css"
import Button from "../UI/Button/Button";
import {useDispatch} from "react-redux";
import {createMessage, getAllMessages, updateMessage} from "../../store/messages/messagesActions";


const Form = (props) => {

    const dispatch = useDispatch()

    const id = props.id
    const password = props.password

    const [dateInputs, setDateInputs] = useState([{month: null, week: null,time: {day: 1, hour: null, minutes: null}}])
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (!!props.weeksAndTime) {
            let temp = props.weeksAndTime
            for (let i = 0; i < temp.length; i++) {
                temp[i].month = Math.ceil(temp[i].week / 4)
            }
            setDateInputs(temp)
            props.message && setMessage(props.message)
        }
    }, [])

    const inputMessage = (event) => {
        setMessage(event.target.value)
    }

    const dateInputsHandler = (event, i, min, max) => {
        const value = event.target.value
        const name = event.target.name

        let copyDateInputs = [...dateInputs]
        let copyDateInputsItem = {...copyDateInputs[i]}
        let isHourMinutes = false
        event.target.dataset.time === "yes" ? isHourMinutes = true : value < min || value > max ? copyDateInputsItem[name] =  "" : copyDateInputsItem[name] = parseInt(value)
        if (isHourMinutes) {
            const parts = event.target.dataset.name.split(":")
            const values = value.toString().split(":")

            for (let j = 0; j < parts.length; j++) {
                copyDateInputsItem.time[parts[j]] = parseInt(values[j])
            }
        }
        copyDateInputs[i] = copyDateInputsItem
        setDateInputs(copyDateInputs)
    }

    const addNewDateInputBlock = () => {
        setDateInputs(prevState => {
            return [...prevState, {month: null, week: null,time: {day: 1, hour: null, minutes: null}}]
        })
    }

    const removeInputBlock = (id, i) => {
        let copyDateInputs = [...dateInputs]
        copyDateInputs.splice(i, 1)
        setDateInputs(copyDateInputs)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        let copyDateInputs = [...dateInputs]
        for (let i = 0; i < copyDateInputs.length; i++) {
            copyDateInputs[i].week += copyDateInputs[i].month * 4 - 4
            delete copyDateInputs[i].month
        }
        let obj = {
            message: message,
            weeksAndTime: copyDateInputs
        }
        if (id) {
            await dispatch(updateMessage(id, obj, password))
        } else {
            await dispatch(createMessage(obj, password))
        }
        await dispatch(getAllMessages())
        props.closeModal()
    }

    return (
        <div className={"Form"}>
            <form onSubmit={async(event) => {await submitHandler(event)}} className={"Form__form"}>
                {dateInputs.map((el, i) => {
                    return <div key={i} className={"Form__dateInputBlock"}>
                                <input onChange={(event) => {dateInputsHandler(event, i, 1, 15)}} name={"month"} value={el.month || ""} min="1" className={"Form__dateInputBlock--input"} required type="number" placeholder={"Месяц"}/>
                                <input onChange={(event) => {dateInputsHandler(event, i, 1, 4)}}  name={"week"} value={el.week !== null ? el.week % 4 || 4 : ""} min="1" max="4" className={"Form__dateInputBlock--input"} required type="number" placeholder={"Неделя"}/>
                                <select onChange={(event) => {dateInputsHandler(event, i, 1, 7)}} name={"time"} data-time={"yes"} data-name={"day"} value={el.time?.day || 1} className={"Form__dateInputBlock--select"}>
                                    <option  value="1">Понедельник</option>
                                    <option  value="2">Вторник</option>
                                    <option  value="3">Среда</option>
                                    <option  value="4">Четверг</option>
                                    <option  value="5">Пятница</option>
                                    <option  value="6">Суббота</option>
                                    <option  value="7">Воскресенье</option>
                                </select>
                                <input onChange={(event) => {dateInputsHandler(event, i, 0, 59)}} name={"time"} data-time={"yes"} data-name={"hour:minutes"} value={el.time?.minutes >= 0 && el.time?.hour >= 0 ? `${el.time?.hour < 10 ? "0" +  el.time?.hour : el.time?.hour}:${el.time?.minutes < 10 ?  "0" +  el.time?.minutes :el.time?.minutes}` : ""}  className={"Form__dateInputBlock--input"} required type="time" placeholder={"Время"}/>
                                {i > 0 ? <Button
                                    text={"Удалить"}
                                    click={() => {removeInputBlock(el, i)}}
                                    /> : null}
                            </div>
                })}
                <Button
                    text={"Добавить дату и время"}
                    click={() => {addNewDateInputBlock()}}
                />
                <textarea required className={"Form__form--textarea"} name={"message"} value={message} onChange={(event) => {inputMessage(event)}} placeholder={"Введите сообщение"} />
                <button className={"Form__form--buttonSubmit"}>{props.buttonText}</button>
            </form>
        </div>
    )
}

export default Form