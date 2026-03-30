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
  const inputRef = useRef(null)

  // Focus the hidden input whenever the grid is interacted with
  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Keep input focused when active cell changes
  useEffect(() => {
    if (activeCell) {
      focusInput()
    }
  }, [activeCell, focusInput])

  const isActiveCell = (r, c) =>
    activeCell && activeCell.row === r && activeCell.col === c

  const isActiveWord = (r, c) =>
    activeWordCells.some((cell) => cell.row === r && cell.col === c)

  const handleCellClick = (r, c) => {
    if (grid[r][c] === '#') return
    onCellClick(r, c)
    focusInput()
  }

  const handleKeyDown = (e) => {
    onKeyDown(e)
  }

  const handleInput = (e) => {
    const val = e.target.value
    if (val) {
      const letter = val.slice(-1).toUpperCase()
      if (/^[A-Z]$/.test(letter)) {
        onInput(letter)
      }
      e.target.value = ''
    }
  }

  return (
    <div className="relative w-full" ref={gridRef}>
      {/* Hidden input to capture mobile keyboard */}
      <input
        ref={inputRef}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="characters"
        spellCheck="false"
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        aria-label="Crossword input"
      />

      <div
        className="grid gap-0 w-full max-w-[min(100%,28rem)] mx-auto"
        style={{
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
            else if (isActive) bgClass = 'bg-gold/50'
            else if (isWord) bgClass = 'bg-gold/20'

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
                  <span className="absolute inset-0 flex items-center justify-center font-sans font-bold text-sm sm:text-lg text-brown pointer-events-none">
                    {playerLetter}
                  </span>
                )}
                {isActive && !isBlack && (
                  <div className="absolute inset-0 ring-2 ring-gold ring-inset pointer-events-none" />
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
