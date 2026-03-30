import { useRef, useEffect, useState } from 'react'

function CrosswordClues({
  clues,
  activeClueNumber,
  activeDirection,
  onClueClick,
}) {
  const [expanded, setExpanded] = useState(false)
  const activeAcrossRef = useRef(null)
  const activeDownRef = useRef(null)

  // Find current active clue text for the compact strip
  const activeClue = clues[activeDirection]?.find(
    (c) => c.number === activeClueNumber
  )

  // Scroll to active clue in the expanded list
  useEffect(() => {
    const ref =
      activeDirection === 'across' ? activeAcrossRef : activeDownRef
    if (ref.current && expanded) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeClueNumber, activeDirection, expanded])

  const renderClueList = (direction, clueList) => (
    <div className="mb-4">
      <h3 className="font-sans text-sm text-wine font-bold mb-2 uppercase tracking-wider">
        {direction}
      </h3>
      <ul className="space-y-1">
        {clueList.map((clue) => {
          const isActive =
            activeDirection === direction && activeClueNumber === clue.number
          return (
            <li
              key={`${direction}-${clue.number}`}
              ref={isActive ? (direction === 'across' ? activeAcrossRef : activeDownRef) : null}
              className={`flex gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-sm sm:text-base ${
                isActive
                  ? 'bg-wine/15 text-brown font-medium'
                  : 'text-brown/80 hover:bg-cream-dark/40'
              }`}
              onClick={() => onClueClick(direction, clue.number)}
            >
              <span className="font-semibold text-wine/70 min-w-[1.5rem] text-right shrink-0">
                {clue.number}
              </span>
              <span>{clue.clue}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div className="w-full">
      {/* Mobile compact strip */}
      <div className="md:hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left bg-cream border border-cream-dark rounded-lg px-3 py-2.5 mb-2 flex items-center gap-2"
        >
          <span className="font-semibold text-wine text-xs uppercase tracking-wider shrink-0">
            {activeClueNumber}
            {activeDirection === 'across' ? 'A' : 'D'}
          </span>
          <span className="text-sm text-brown truncate flex-1">
            {activeClue?.clue || ''}
          </span>
          <svg
            className={`w-4 h-4 text-brown/50 transition-transform shrink-0 ${
              expanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {expanded && (
          <div className="bg-cream/60 border border-cream-dark rounded-lg p-3 max-h-60 overflow-y-auto mb-3">
            {renderClueList('across', clues.across)}
            {renderClueList('down', clues.down)}
          </div>
        )}
      </div>

      {/* Desktop side panel */}
      <div className="hidden md:block max-h-[32rem] overflow-y-auto bg-cream/40 border border-cream-dark rounded-lg p-4">
        {renderClueList('across', clues.across)}
        {renderClueList('down', clues.down)}
      </div>
    </div>
  )
}

export default CrosswordClues
