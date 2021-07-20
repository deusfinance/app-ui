import React from 'react'
import { urls } from './data'
import { NavLink } from 'react-router-dom';

const Stages = () => {
    return (
        <div className="instruction">
            <div className="instruction-title">
                <img className="title-img" src={"/img/Dei_logo.svg"} alt="Dei_logo" />
                <span className="title-txt" > DEI Stable Coin </span>
            </div>

            <div className="border-bottom mb-20 mt-10" />

            {urls.map((url, index) => {
                return <NavLink className="url" to={url.link} key={index}>{url.name}</NavLink>
            })}

            <div className="border-bottom mt-20" />

            <div className="mt-10 bottom-text">
                If you need more help visit the{' '}
                <a href="#" className="wiki-pink-color" target="_blank">
                    wiki
                </a>
                .
            </div>
        </div>
    )
}

export default Stages