import React from 'react'
import { fees } from './data'

const Fees = () => {
    return (
        <div className="instruction2">
            {fees.map((fee, index) => {
                return <>
                    <div className="fee">
                        <span className="fee-title" key={index}> {fee.name} </span>
                        <span className="fee-price" key={index}> {fee.value} </span>
                    </div>
                </>
            })}
        </div>
    )
}

export default Fees