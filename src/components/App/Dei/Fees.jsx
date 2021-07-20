import React, { useMemo } from 'react'
import { fees } from './data'

const Fees = () => {
    return (
        useMemo(() => {
            return <div className="instruction2">
                {fees.map((fee, index) => {
                    return <div className="fee" key={index}>
                        <span className="fee-title" > {fee.name} </span>
                        <span className="fee-price" > {fee.value} </span>
                    </div>
                })}
            </div>
        }, [fees])
    )
}

export default Fees