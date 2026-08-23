import React from 'react';
import { Link } from 'react-router-dom';
const Button=(props)=>{
    return (
        <>
        <Link className={`btn ${props.className}`} to={props.to} onClick={props.onClick}>{props.text}</Link>
        </>
    )
}
export default Button;