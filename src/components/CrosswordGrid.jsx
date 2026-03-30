import { useRef, useEffect, useCallback } from 'react'

function CrosswordGrid({
  puzzleData,
  playerGrid,
  cellNumbers,
  activeCell,
  activeDirection,
  activeWordCells,
  onCellClick,
  onKeyDown,
  onInput,
}) {
  const { size, grid } = puzzleData
  const gridRef = useRef(null)

  // Desktop: capture keyboard events on the grid container
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const handler = (e) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault()
        onInput(e.key.toUpperCase())
      } else {
        onKeyDown(e)
      }
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  }, [onKeyDown, onInput])

  // Keep grid focused for desktop keyboard input
  useEffect(() => {
    if (activeCell && gridRef.current) {
      gridRef.current.focus()
    }
  }, [activeCell])

  const isActiveCell = (r, c) =>
    activeCell && activeCell.row === r && activeCell.col === c

  const isActiveWord = (r, c) =>
    activeWordCells.some((cell) => cell.row === r && cell.col === c)

  const handleCellClick = (r, c) => {
    if (grid[r][c] === '#') return
    onCellClick(r, c)
    if (gridRef.current) gridRef.current.focus()
  }

  return (
    <div
      className="relative w-full outline-none"
      ref={gridRef}
      tabIndex={0}
      role="grid"
      aria-label="Crossword grid"
    >
      <div
        className="grid gap-0 w-full mx-auto"
        style={{
          maxWidth: `min(100%, 28rem, calc(50vh * ${size.cols} / ${size.rows}))`,
          gridTemplateColumns: `repeat(${size.cols}, 1fr)`,
          aspectRatio: `${size.cols} / ${size.rows}`,
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isBlack = cell === '#'
            const isActive = isActiveCell(r, c)
            const isWord = !isBlack && isActiveWord(r, c)
            const number = cellNumbers[r]?.[c] || 0
            const playerLetter = playerGrid[r]?.[c] || ''

            let bgClass = 'bg-white'
            if (isBlack) bgClass = 'bg-charcoal'
            else if (isActive) bgClass = 'bg-wine/20'
            else if (isWord) bgClass = 'bg-maroon/10'

            return (
              <div
                key={`${r}-${c}`}
                className={`relative border border-charcoal/30 ${bgClass} ${
                  isBlack ? '' : 'cursor-pointer active:scale-95'
                } transition-colors duration-100 select-none`}
                style={{ aspectRatio: '1 / 1' }}
                onClick={() => handleCellClick(r, c)}
              >
                {!isBlack && number > 0 && (
                  <span className="absolute top-[1px] left-[2px] text-[0.55rem] sm:text-[0.6rem] leading-none font-sans font-semibold text-charcoal/70 pointer-events-none">
                    {number}
                  </span>
                )}
                {!isBlack && (
                  <span className={`absolute inset-0 flex items-center justify-center font-sans font-bold text-brown pointer-events-none ${
                    playerLetter.length > 1 ? 'text-[0.45rem] sm:text-[0.65rem]' : 'text-sm sm:text-lg'
                  }`}>
                    {playerLetter}
                  </span>
                )}
                {isActive && !isBlack && (
                  <div className="absolute inset-0 ring-2 ring-wine ring-inset pointer-events-none" />
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default CrosswordGrid
