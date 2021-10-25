import React from 'react'
import "./Modal.css"
import Form from "../Form/Form";


const Modal = (props) => {

    return (
        <>
            <div className={"Modal_bg"} onClick={props.closeModal} />
            <div className={"Modal"} >
                <Form
                    buttonText={props.buttonText}
                    id={props.id}
                    weeksAndTime={props.weeksAndTime}
                    message={props.message}
                    password={props.password}
                    closeModal={props.closeModal}
                />
            </div>
        </>
    )
}

export default Modal