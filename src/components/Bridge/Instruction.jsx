import React from 'react'
import { instructions } from './data'

const Instruction = (props) => {
  return (
    <div className="instruction">
      <div className="instruction-title">Help</div>
      <div className="border-bottom mb-20" />
      {instructions.map((instruction, index) => {
        return <div key={index}>{instruction.title}</div>
      })}
      {/* <div className="instruction-title mt-20">
        If you need more help visit the{' '}
        <a href="#" className="blue-color" target="_blank">
          wiki
        </a>{' '}
        or watch this step by step{' '}
        <a href="#" className="blue-color" target="_blank">
          explainer video
        </a>
        .
      </div> */}
    </div>
  )
}

export default Instruction
