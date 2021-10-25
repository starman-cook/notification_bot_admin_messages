import React from 'react'
import "./Button.css"


const Button = (props) => {

    return (
            <div className={"Button"} onClick={props.click}>{props.text}</div>
    )
}

export default Button