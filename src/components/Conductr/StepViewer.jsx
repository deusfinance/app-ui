import React from 'react';

const StepViewer = ({ stepNumber }) => {
    return (<div className={`stepper-wrap step${stepNumber}`} >

        <div className="stepper ">1. build</div>

        <div className="spanner">
            <div className="circle left-circle "></div>
            <div className="line"></div>
            <div className="circle right-circle"></div>
        </div>

        <div className="stepper ">2. conduct</div>

        <div className="spanner">
            <div className="circle left-circle"></div>
            <div className="line"></div>
            <div className="circle right-circle"></div>
        </div>

        <div className="stepper ">3. buy</div>

    </div>);
}

export default StepViewer;