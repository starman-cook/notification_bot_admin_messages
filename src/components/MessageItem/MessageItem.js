import React from 'react'
import "./MessageItem.css"
import Button from "../UI/Button/Button";


const MessageItem = ({mes, clickDelete, clickUpdate}) => {

    const weekDays = {
        1: "Понедельник",
        2: "Вторник",
        3: "Среда",
        4: "Четверг",
        5: "Пятница",
        6: "Суббота",
        7: "Восресенье"

    }

    let allDates
    if (mes.weeksAndTime.length) {
        allDates = mes.weeksAndTime.map((el, i) => {
            const hour = el.time?.hour > 9 ? el.time?.hour : "0" + el.time?.hour
            const minutes = el.time?.minutes > 9 ? el.time?.minutes : "0" + el.time?.minutes
            return (
                <li key={i} className={"MessageItem__datesLine"}>
                    <span className={"MessageItem__datesLine--text"}>Месяц {Math.ceil(el.week / 4)}</span>
                    <span className={"MessageItem__datesLine--text"}>Неделя {el.week % 4 || 4}</span>
                    <span className={"MessageItem__datesLine--text"}>{weekDays[el.time.day]}</span>
                    <span className={"MessageItem__datesLine--text"}>в {hour}:{minutes}</span>
                </li>
            )
        })
    }
    return (
        <div className={"MessageItem"}>
                <ul className={"MessageItem__datesList"}>
                    {allDates}
                </ul>
            <textarea readOnly={true} value={mes.message} className={"MessageItem__messageText"} />
            <div className={"MessageItem__buttonsBlock"}>
                <Button
                    text={"Редактировать"}
                    click={clickUpdate}
                />
                <Button
                    text={"Удалить"}
                    click={clickDelete}
                />
            </div>
        </div>
    )
}

export default MessageItem