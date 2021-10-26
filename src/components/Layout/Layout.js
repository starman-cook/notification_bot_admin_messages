import React from 'react'
import './Layout.css'
import {push} from "connected-react-router"
import {useDispatch} from "react-redux";

const Layout = (props) => {
    const dispatch = useDispatch()

    const goTo = (path) => {
        dispatch(push(path))
    }
    return (
        <div className={"Layout"}>
            <header className={"Layout__header"}>
                <div className={"Layout__header--container"}>
                    <div className={"Layout__header--link"} onClick={() => {goTo("/")}}>Главная (инструкция)</div>
                    <div className={"Layout__header--link"} onClick={() => {goTo("/generateCommand")}}>Генерация команды создания группы</div>
                    <div className={"Layout__header--link"} onClick={() => {goTo("/logs")}}>Смотреть логи</div>
                    <div className={"Layout__header--link"} onClick={() => {goTo("/admin_messages")}}>Сообщения администрации</div>
                </div>
            </header>
            <main>
                {props.children}
            </main>
        </div>
    )
}


export default Layout