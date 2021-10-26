import React, {useEffect, useState} from 'react'
import "./AdminMessages.css"
import MessageItem from "../../components/MessageItem/MessageItem";
import {useDispatch, useSelector} from "react-redux";
import {deleteMessage, getAllMessages} from "../../store/messages/messagesActions";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/Modal/Modal";


const AdminMessages = () => {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messages.messages)

    const [password, setPassword] = useState("")

    useEffect(() => {
        dispatch(getAllMessages())
    }, [dispatch])

    let allMessages
    const [modal, setModal] = useState(null)

    if (messages.length) {
        allMessages = messages.map(el => {
            return (<MessageItem
                key={el._id}
                mes={el}
                clickDelete={() => {deleteMessageHandler(el._id)}}
                clickUpdate={() => {openUpdateModal(el)}}
            />)

        })
    }

    const [isModal, setIsModal] = useState(false)
    const toggleModal = () => {
        setIsModal(!isModal)
    }

    const closeModal = () => {
        setIsModal(false)
    }

    const deleteMessageHandler = async (id) => {
        const confirmation = prompt("Вы уверены, что хотите удалить это сообщение? Напишите 'yes' если правда хотите")
        if (confirmation  === "yes") {
            await dispatch(deleteMessage(id, password))
            await dispatch(getAllMessages())
        }
    }


    const openUpdateModal = (el) => {
        toggleModal()
        setModal(<Modal
            closeModal={() => {closeModal()}}
            buttonText={"Сохранить редактирование"}
            id={el._id}
            weeksAndTime={el.weeksAndTime}
            message={el.message}
            password={password}
        />)
    }

    const openNewAdminMessageModal = () => {
        toggleModal()
        setModal(<Modal
            closeModal={() => {closeModal()}}
            buttonText={"Создать"}
            id={null}
            weeksAndTime={null}
            message={""}
            password={password}
        />)
    }

    const getPasswordInput = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className={"AdminMessages"}>
            <header className={"AdminMessages__header"}>
                <div className={"AdminMessages__header--container"}>
                    <Button
                        text={"Создать новое сообщение"}
                        click={() => {openNewAdminMessageModal()}}
                    />
                    <input className={"AdminMessages__header__input"} type="text" placeholder={"Пароль"} onChange={(event) => {getPasswordInput(event)}}/>
                    <span className={"AdminMessages__header--passwordMessage"}>Обязательно введите пароль, иначе ничего не сработает!</span>

                </div>
               </header>
            {isModal ? modal : null}
            {allMessages}
        </div>
    )
}

export default AdminMessages