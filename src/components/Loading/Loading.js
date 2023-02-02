import React from "react";
import './Loading.css'

const Loading = ({message}) => {
    return (
        <>
            <h1>{message}</h1>
            <div className="dots-wrapper">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </>
    )
}

export default Loading