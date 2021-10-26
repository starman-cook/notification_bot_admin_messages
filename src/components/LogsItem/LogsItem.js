import React from 'react'
import './LogsItem.css'


const LogsItem = (props) => {
    return (
        <div className={"LogsItem"}>
                <p className="LogsItem__text LogsItem__text--number">{props.number}</p>
                <p className="LogsItem__text LogsItem__text--date">{props.date}</p>
                <p className="LogsItem__text LogsItem__text--level">Log level: {props.logLevel}</p>
                <p className="LogsItem__text LogsItem__text--argument">Log message: {props.argument}</p>
        </div>
    )
}


export default LogsItem