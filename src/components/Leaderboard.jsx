const MOCK_SCORES = [
  { name: 'Meredith', time: 95, date: '2026-03-28' },
  { name: 'Kyle', time: 120, date: '2026-03-28' },
  { name: 'Sarah', time: 142, date: '2026-03-27' },
  { name: 'James', time: 178, date: '2026-03-27' },
  { name: 'Emily', time: 203, date: '2026-03-29' },
]

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Leaderboard({ currentPlayerName, currentPlayerTime }) {
  // Merge current player into mock scores if they have a time
  let scores = [...MOCK_SCORES]
  if (currentPlayerName && currentPlayerTime != null) {
    scores.push({
      name: currentPlayerName,
      time: currentPlayerTime,
      date: new Date().toISOString().slice(0, 10),
      isCurrent: true,
    })
  }

  // Sort by time ascending
  scores.sort((a, b) => a.time - b.time)

  // Keep top 10
  scores = scores.slice(0, 10)

  return (
    <div className="w-full">
      <h2 className="font-serif text-xl sm:text-2xl text-wine mb-4 text-center">
        Leaderboard
      </h2>

      <div className="bg-cream/50 border border-cream-dark rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2.5rem_1fr_4.5rem_4.5rem] sm:grid-cols-[3rem_1fr_5rem_5rem] px-3 py-2 bg-cream-dark/40 text-xs sm:text-sm font-semibold text-wine/70 uppercase tracking-wider">
          <span>#</span>
          <span>Name</span>
          <span className="text-right">Time</span>
          <span className="text-right">Date</span>
        </div>

        {/* Rows */}
        {scores.map((score, i) => {
          const rank = i + 1
          const isCurrent = score.isCurrent
          return (
            <div
              key={`${score.name}-${i}`}
              className={`grid grid-cols-[2.5rem_1fr_4.5rem_4.5rem] sm:grid-cols-[3rem_1fr_5rem_5rem] px-3 py-2.5 border-t border-cream-dark/30 text-sm sm:text-base transition-colors ${
                isCurrent
                  ? 'bg-gold/20 font-semibold text-brown'
                  : 'text-brown/80'
              }`}
            >
              <span className="flex items-center">
                {rank <= 3 ? (
                  <span className={`text-base ${rank === 1 ? 'text-gold' : rank === 2 ? 'text-brown-light/70' : 'text-brown-light/50'}`}>
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                  </span>
                ) : (
                  <span className="text-brown/50">{rank}</span>
                )}
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

        {scores.length === 0 && (
          <div className="px-3 py-6 text-center text-brown/50 text-sm">
            No scores yet. Be the first!
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
