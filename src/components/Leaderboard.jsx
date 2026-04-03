import { useState, useEffect } from 'react'
import { formatTime } from '../utils/formatTime.js'

const PUZZLE_LABELS = {
  mini: 'Mini',
  medium: 'Midi',
  full: 'Full',
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Leaderboard({ puzzleId, currentPlayerName, currentPlayerTime, refreshKey }) {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!puzzleId) return

    let cancelled = false
    setLoading(true)

    fetch(`/api/scores?puzzle=${puzzleId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch scores')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setScores(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!cancelled) setScores([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [puzzleId, refreshKey])

  // Mark current player and sort
  const displayScores = scores
    .map((s) => ({
      ...s,
      isCurrent: s.name === currentPlayerName && s.time === currentPlayerTime,
    }))
    .sort((a, b) => a.time - b.time)
    .slice(0, 10)

  return (
    <div className="w-full">
      <h2 className="font-serif text-xl sm:text-2xl text-wine mb-4 text-center">
        {puzzleId ? `${PUZZLE_LABELS[puzzleId] || ''} Leaderboard` : 'Leaderboard'}
      </h2>

      <div className="bg-cream/50 border border-cream-dark rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2.5rem_1fr_4.5rem_4.5rem] sm:grid-cols-[3rem_1fr_5rem_5rem] px-3 py-2 bg-cream-dark/40 text-xs sm:text-sm font-semibold text-wine/70 uppercase tracking-wider">
          <span>#</span>
          <span>Name</span>
          <span className="text-right">Time</span>
          <span className="text-right">Date</span>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="px-3 py-6 text-center text-brown/50 text-sm animate-pulse">
            Loading scores...
          </div>
        )}

        {/* Rows */}
        {!loading && displayScores.map((score, i) => {
          const rank = i + 1
          const isCurrent = score.isCurrent
          return (
            <div
              key={`${score.name}-${score.time}-${score.date}`}
              className={`grid grid-cols-[2.5rem_1fr_4.5rem_4.5rem] sm:grid-cols-[3rem_1fr_5rem_5rem] px-3 py-2.5 border-t border-cream-dark/30 text-sm sm:text-base transition-colors ${
                isCurrent
                  ? 'bg-wine/10 font-semibold text-brown'
                  : 'text-brown/80'
              }`}
            >
              <span className="flex items-center">
                <span className={`font-serif font-bold ${rank === 1 ? 'text-wine' : rank === 2 ? 'text-brown' : rank === 3 ? 'text-brown-light' : 'text-brown/50'}`}>
                  {rank}
                </span>
              </span>
              <span className="truncate">
                {score.name}
                {isCurrent && (
                  <span className="ml-1.5 text-xs text-wine/60">(you)</span>
                )}
              </span>
              <span className="text-right font-mono">{formatTime(score.time)}</span>
              <span className="text-right text-brown/50 text-xs sm:text-sm">
                {formatDate(score.date)}
              </span>
            </div>
          )
        })}

        {!loading && displayScores.length === 0 && (
          <div className="px-3 py-6 text-center text-brown/50 text-sm">
            No scores yet. Be the first!
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
