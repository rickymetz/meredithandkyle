import { useState, useEffect, useRef, useCallback } from 'react'

function CrosswordTimer({ started, completed, onTimeUpdate }) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (started && !completed) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now()
      }
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const seconds = Math.floor((now - startTimeRef.current) / 1000)
        setElapsed(seconds)
        if (onTimeUpdate) onTimeUpdate(seconds)
      }, 250)
    }

    if (completed) {
      stopTimer()
    }

    return stopTimer
  }, [started, completed, stopTimer, onTimeUpdate])

  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <div className="flex items-center gap-2">
      <svg
        className="w-4 h-4 text-wine/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-mono text-lg sm:text-xl font-semibold text-brown tracking-wider">
        {display}
      </span>
    </div>
  )
}

export default CrosswordTimer
