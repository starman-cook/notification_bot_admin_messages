import React, {useEffect, useState} from 'react'
import './LogsPage.css'
import {useDispatch, useSelector} from "react-redux";
import {getAllLogsByDate} from "../../store/logs/logsActions";
import LogsItem from "../../components/LogsItem/LogsItem";


const LogsPage = () => {
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const logs = useSelector(state => state.logs.logs)
    const error = useSelector(state => state.logs.error)

    useEffect(() => {
        const parts = date.split("-")
        dispatch(getAllLogsByDate(parts[2], parts[1], parts[0]))
    }, [])

    let allLogs
    if (error.length) {
        allLogs = <p>{error}</p>
    } else if (logs.length) {
        allLogs = logs.map((el, i) => {
            if (el === "") {
                return <p key={i}>Parse Error</p>
            }
            const data = JSON.parse(el)
            return <LogsItem
                key={i}
                number={i+1}
                date={data.date}
                logLevel={data.logLevel}
                argument={data.argumentsArray && data.argumentsArray[0]}
            />
        })
    }

    const pickADate = async(event) => {
        const value = event.target.value
        setDate(value)
        const parts = value.split("-")
        await dispatch(getAllLogsByDate(parts[2], parts[1], parts[0]))
    }

    return (
        <div className={"LogsPage"}>
            <form>
                <input onChange={(event) => {pickADate(event)}} value={date} type="date"/>
            </form>
            {allLogs}
        </div>
    )
}

export default LogsPage

// {"instanceName":"notification-bot",
//     "hostname":"notification-bot",
//     "date":"2021-10-25T10:53:07.282Z",
//     "logLevel":"info","logLevelId":3,
//     "filePath":"index.ts",
//     "fullFilePath":"/home/attractor_bot/attractor_notification_bot_version_2p/index.ts",
//     "fileName":"index.ts",
//     "lineNumber":73,
//     "columnNumber":12,
//     "isConstructor":false,
//     "typeName":"Server",
//     "argumentsArray":["Express started on port 8001"]}