import React, { useState, useEffect } from 'react'
import moment from 'moment'

const WaitingTime = ({ withDrawTime, nextEpochTime, showFluid }) => {
  const [waiting, setWaiting] = useState('')
  const currtimestamp = Math.floor(Date.now() / 1000)
  let remindedTime = null
  if (currtimestamp > nextEpochTime) {
    remindedTime = 0
  } else {
    remindedTime = nextEpochTime - currtimestamp
  }
  // if ((nextEpochTime - withDrawTime) < 24 * 3600) {
  //   remindedTime = nextEpochTime + 8 * 24 * 3600
  // } else {
  //   remindedTime = nextEpochTime
  // }
  const [timer, setTimer] = useState((remindedTime) * 1000) //convert to milisecond


  useEffect(() => {
    if (timer > 0) {
      let duration = moment.duration(timer)
      let waitingTime = [
        duration.days(),
        duration.hours(),
        duration.minutes(),
        duration.seconds()
      ].join(':')
      setWaiting(": " + waitingTime)
      const interval = setInterval(() => {
        let newTime = timer - 1000
        setTimer(newTime)
        let duration = moment.duration(newTime)
        let waitingTime = [
          duration.days(),
          duration.hours(),
          duration.minutes(),
          duration.seconds()
        ].join(':')
        setWaiting(": " + waitingTime)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    } else {
      showFluid()
    }
  }, [timer, showFluid])

  return <span>{waiting}</span>
}

export default WaitingTime
