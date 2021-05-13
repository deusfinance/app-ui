import React, { useState, useEffect } from 'react'
import moment from 'moment'

const WaitingTime = ({ withDrawTime, showFluid }) => {
  const [waiting, setWaiting] = useState('00:00:00')

  const [timer, setTimer] = useState(
    moment(withDrawTime).diff(moment(new Date()))
  )

  useEffect(() => {
    if (timer > 0) {
      let duration = moment.duration(timer)
      let waitingTime = [
        duration.hours(),
        duration.minutes(),
        duration.seconds()
      ].join(':')
      setWaiting(waitingTime)
      const interval = setInterval(() => {
        let newTime = timer - 1000
        setTimer(newTime)
        let duration = moment.duration(newTime)
        let waitingTime = [
          duration.hours(),
          duration.minutes(),
          duration.seconds()
        ].join(':')
        setWaiting(waitingTime)
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
