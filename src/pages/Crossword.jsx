import { useState, useCallback, useMemo, useEffect } from 'react'
import { parsePuz } from '../utils/puzParser.js'
import { PUZZLES } from '../data/puzzles.js'
import CrosswordGrid from '../components/CrosswordGrid.jsx'
import CrosswordClues from '../components/CrosswordClues.jsx'
import CrosswordTimer from '../components/CrosswordTimer.jsx'
import Leaderboard from '../components/Leaderboard.jsx'

// Build cell numbers from grid
function buildCellNumbers(grid, rows, cols) {
  const numbers = Array.from({ length: rows }, () => Array(cols).fill(0))
  let num = 1
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '#') continue
      const acrossStart = c === 0 || grid[r][c - 1] === '#'
      const downStart = r === 0 || grid[r - 1][c] === '#'
      const hasAcross =
        acrossStart && c + 1 < cols && grid[r][c + 1] !== '#'
      const hasDown =
        downStart && r + 1 < rows && grid[r + 1][c] !== '#'
      if (hasAcross || hasDown) {
        numbers[r][c] = num++
      }
    }
  }
  return numbers
}

// Find which clue a cell belongs to for a given direction
function findClueForCell(clues, direction, row, col) {
  const list = clues[direction]
  for (let i = list.length - 1; i >= 0; i--) {
    const clue = list[i]
    if (direction === 'across') {
      if (row === clue.row && col >= clue.col && col < clue.col + clue.length) {
        return clue
      }
    } else {
      if (col === clue.col && row >= clue.row && row < clue.row + clue.length) {
        return clue
      }
    }
  }
  return null
}

// Get cells in a word
function getWordCells(clue, direction) {
  const cells = []
  if (!clue) return cells
  for (let i = 0; i < clue.length; i++) {
    cells.push({
      row: direction === 'across' ? clue.row : clue.row + i,
      col: direction === 'across' ? clue.col + i : clue.col,
    })
  }
  return cells
}

function Crossword() {
  // Puzzle loading
  const [puzzleId, setPuzzleId] = useState(null)
  const [puzzleData, setPuzzleData] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Game state
  const [gamePhase, setGamePhase] = useState('select') // select | entry | playing | complete
  const [playerName, setPlayerName] = useState('')
  const [playerGrid, setPlayerGrid] = useState([])
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 })
  const [activeDirection, setActiveDirection] = useState('across')
  const [timerStarted, setTimerStarted] = useState(false)
  const [finalTime, setFinalTime] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  // Load a puzzle from .puz file
  const loadPuzzle = useCallback(async (id) => {
    const puzzle = PUZZLES.find((p) => p.id === id)
    if (!puzzle) return

    setLoading(true)
    setLoadError(null)
    try {
      const response = await fetch(puzzle.url)
      const buffer = await response.arrayBuffer()
      const data = parsePuz(buffer)
      setPuzzleData(data)
      setPuzzleId(id)
      setPlayerGrid(
        Array.from({ length: data.size.rows }, () =>
          Array(data.size.cols).fill('')
        )
      )
      // Find first non-black cell
      for (let r = 0; r < data.size.rows; r++) {
        for (let c = 0; c < data.size.cols; c++) {
          if (data.grid[r][c] !== '#') {
            setActiveCell({ row: r, col: c })
            break
          }
        }
        if (data.grid[0]?.[0] !== '#') break
      }
      setActiveDirection('across')
      setTimerStarted(false)
      setFinalTime(null)
      setCurrentTime(0)
      setShowCelebration(false)
      setGamePhase('entry')
    } catch (err) {
      setLoadError('Failed to load puzzle. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const puzzle = puzzleData
  const size = puzzle?.size || { rows: 0, cols: 0 }
  const grid = puzzle?.grid || []
  const clues = puzzle?.clues || { across: [], down: [] }

  const cellNumbers = useMemo(
    () => (puzzle ? buildCellNumbers(grid, size.rows, size.cols) : []),
    [grid, size.rows, size.cols, puzzle]
  )

  // Active clue
  const activeClue = useMemo(
    () => (puzzle ? findClueForCell(clues, activeDirection, activeCell.row, activeCell.col) : null),
    [clues, activeDirection, activeCell, puzzle]
  )

  const activeClueNumber = activeClue?.number || 1

  // Active word cells
  const activeWordCells = useMemo(
    () => getWordCells(activeClue, activeDirection),
    [activeClue, activeDirection]
  )

  // Check completion
  const checkCompletion = useCallback(
    (newGrid) => {
      if (!puzzle) return false
      for (let r = 0; r < size.rows; r++) {
        for (let c = 0; c < size.cols; c++) {
          if (grid[r][c] !== '#' && newGrid[r][c] !== grid[r][c]) {
            return false
          }
        }
      }
      return true
    },
    [grid, size.rows, size.cols, puzzle]
  )

  // Move to next cell in current word
  const moveToNextCell = useCallback(
    (row, col, dir) => {
      let nr = row
      let nc = col
      if (dir === 'across') {
        nc++
        if (nc >= size.cols || grid[nr][nc] === '#') return null
      } else {
        nr++
        if (nr >= size.rows || grid[nr][nc] === '#') return null
      }
      return { row: nr, col: nc }
    },
    [grid, size.rows, size.cols]
  )

  // Move to previous cell in current word
  const moveToPrevCell = useCallback(
    (row, col, dir) => {
      let nr = row
      let nc = col
      if (dir === 'across') {
        nc--
        if (nc < 0 || grid[nr][nc] === '#') return null
      } else {
        nr--
        if (nr < 0 || grid[nr][nc] === '#') return null
      }
      return { row: nr, col: nc }
    },
    [grid, size.rows, size.cols]
  )

  // Handle cell click
  const handleCellClick = useCallback(
    (r, c) => {
      if (activeCell.row === r && activeCell.col === c) {
        const newDir = activeDirection === 'across' ? 'down' : 'across'
        const clueInNewDir = findClueForCell(clues, newDir, r, c)
        if (clueInNewDir) {
          setActiveDirection(newDir)
        }
      } else {
        setActiveCell({ row: r, col: c })
        const clueInCurrent = findClueForCell(clues, activeDirection, r, c)
        if (!clueInCurrent) {
          const other = activeDirection === 'across' ? 'down' : 'across'
          const clueInOther = findClueForCell(clues, other, r, c)
          if (clueInOther) setActiveDirection(other)
        }
      }
    },
    [activeCell, activeDirection, clues]
  )

  // Handle letter input
  const handleInput = useCallback(
    (letter) => {
      if (gamePhase !== 'playing') return
      if (!timerStarted) setTimerStarted(true)

      const newGrid = playerGrid.map((row) => [...row])
      newGrid[activeCell.row][activeCell.col] = letter
      setPlayerGrid(newGrid)

      if (checkCompletion(newGrid)) {
        setFinalTime(currentTime)
        setGamePhase('complete')
        setShowCelebration(true)
        return
      }

      const next = moveToNextCell(activeCell.row, activeCell.col, activeDirection)
      if (next) setActiveCell(next)
    },
    [
      gamePhase,
      timerStarted,
      playerGrid,
      activeCell,
      activeDirection,
      checkCompletion,
      moveToNextCell,
      currentTime,
    ]
  )

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (gamePhase !== 'playing') return

      const { row, col } = activeCell

      if (e.key === 'Backspace') {
        e.preventDefault()
        if (!timerStarted) setTimerStarted(true)
        const newGrid = playerGrid.map((r) => [...r])
        if (newGrid[row][col]) {
          newGrid[row][col] = ''
          setPlayerGrid(newGrid)
        } else {
          const prev = moveToPrevCell(row, col, activeDirection)
          if (prev) {
            newGrid[prev.row][prev.col] = ''
            setPlayerGrid(newGrid)
            setActiveCell(prev)
          }
        }
        return
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        const allClues = [...clues.across, ...clues.down]
        const flatIdx = allClues.findIndex(
          (c) =>
            c.number === activeClueNumber &&
            clues[activeDirection].includes(c)
        )
        const nextIdx = e.shiftKey
          ? (flatIdx - 1 + allClues.length) % allClues.length
          : (flatIdx + 1) % allClues.length
        const nextClue = allClues[nextIdx]
        const nextDir = clues.across.includes(nextClue) ? 'across' : 'down'
        setActiveDirection(nextDir)
        setActiveCell({ row: nextClue.row, col: nextClue.col })
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        for (let nc = col + 1; nc < size.cols; nc++) {
          if (grid[row][nc] !== '#') {
            setActiveCell({ row, col: nc })
            setActiveDirection('across')
            return
          }
        }
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        for (let nc = col - 1; nc >= 0; nc--) {
          if (grid[row][nc] !== '#') {
            setActiveCell({ row, col: nc })
            setActiveDirection('across')
            return
          }
        }
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        for (let nr = row + 1; nr < size.rows; nr++) {
          if (grid[nr][col] !== '#') {
            setActiveCell({ row: nr, col })
            setActiveDirection('down')
            return
          }
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        for (let nr = row - 1; nr >= 0; nr--) {
          if (grid[nr][col] !== '#') {
            setActiveCell({ row: nr, col })
            setActiveDirection('down')
            return
          }
        }
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault()
        handleInput(e.key.toUpperCase())
      }
    },
    [
      gamePhase,
      activeCell,
      activeDirection,
      activeClueNumber,
      playerGrid,
      timerStarted,
      clues,
      grid,
      size,
      moveToPrevCell,
      handleInput,
    ]
  )

  // Handle clue click
  const handleClueClick = useCallback((direction, number) => {
    const clue = clues[direction].find((c) => c.number === number)
    if (clue) {
      setActiveDirection(direction)
      setActiveCell({ row: clue.row, col: clue.col })
    }
  }, [clues])

  // Start game
  const handleStart = () => {
    if (!playerName.trim()) return
    setGamePhase('playing')
  }

  // Play again (same puzzle)
  const handlePlayAgain = () => {
    if (!puzzle) return
    setPlayerGrid(
      Array.from({ length: size.rows }, () => Array(size.cols).fill(''))
    )
    setTimerStarted(false)
    setFinalTime(null)
    setCurrentTime(0)
    setShowCelebration(false)
    setGamePhase('playing')
    setActiveCell({ row: 0, col: 0 })
    setActiveDirection('across')
  }

  // Back to puzzle selector
  const handleChangePuzzle = () => {
    setPuzzleData(null)
    setPuzzleId(null)
    setGamePhase('select')
    setTimerStarted(false)
    setFinalTime(null)
    setCurrentTime(0)
    setShowCelebration(false)
  }

  // Puzzle selection screen
  if (gamePhase === 'select') {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl text-wine mb-3">
          Wedding Crossword
        </h1>
        <p className="text-brown/70 font-sans mb-10 text-sm sm:text-base">
          How well do you know Meredith &amp; Kyle? Pick a puzzle and race to the top!
        </p>

        <div className="space-y-4 mb-10">
          {PUZZLES.map((p) => (
            <button
              key={p.id}
              onClick={() => loadPuzzle(p.id)}
              disabled={loading}
              className="w-full text-left bg-cream border border-cream-dark rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/30 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-wine group-hover:text-maroon transition-colors">
                    {p.label}
                  </h3>
                  <p className="font-sans text-sm text-brown/60 mt-0.5">
                    {p.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-wine/40 group-hover:text-wine group-hover:translate-x-1 transition-all shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {loadError && (
          <p className="text-red-600 text-sm mb-4">{loadError}</p>
        )}

        {loading && (
          <p className="text-brown/50 text-sm animate-pulse">Loading puzzle...</p>
        )}

        <Leaderboard />
      </div>
    )
  }

  // Name entry screen
  if (gamePhase === 'entry') {
    const selectedPuzzle = PUZZLES.find((p) => p.id === puzzleId)
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl text-wine mb-1">
          {puzzle?.title || 'Crossword'}
        </h1>
        <p className="text-brown/50 font-sans text-sm mb-6">
          {selectedPuzzle?.description}
        </p>

        <div className="bg-cream/60 border border-cream-dark rounded-xl p-6 sm:p-8 mb-6">
          <label
            htmlFor="player-name"
            className="block text-sm font-semibold text-brown/70 mb-2 text-left"
          >
            Your Name
          </label>
          <input
            id="player-name"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="Enter your name"
            maxLength={40}
            className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-white text-brown font-sans text-base focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine placeholder:text-brown/30"
            autoFocus
            autoComplete="off"
          />
          <button
            onClick={handleStart}
            disabled={!playerName.trim()}
            className="mt-4 w-full py-3 px-6 rounded-lg bg-wine text-cream-light font-sans font-semibold text-base tracking-wide hover:bg-maroon hover:scale-[1.01] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-wine/50 focus:ring-offset-2 focus:ring-offset-cream-light"
          >
            Start Puzzle
          </button>
        </div>

        <button
          onClick={handleChangePuzzle}
          className="text-sm text-brown/50 hover:text-wine transition-colors font-sans"
        >
          &larr; Choose a different puzzle
        </button>
      </div>
    )
  }

  // Playing / complete screen
  if (!puzzle) return null

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-24 md:pb-8">
      {/* Header row: title + timer */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleChangePuzzle}
            className="text-brown/40 hover:text-wine transition-colors"
            aria-label="Back to puzzle selection"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-serif text-xl sm:text-2xl text-wine">
            {puzzle.title || 'Crossword'}
          </h1>
        </div>
        <CrosswordTimer
          started={timerStarted}
          completed={gamePhase === 'complete'}
          onTimeUpdate={setCurrentTime}
        />
      </div>

      {/* Completion overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 backdrop-blur-sm px-4">
          <div className="bg-cream-light border-2 border-wine rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-xl animate-[fadeIn_0.4s_ease-out]">
            <div className="text-4xl mb-3">&#127881;</div>
            <h2 className="font-serif text-2xl sm:text-3xl text-wine mb-2">
              Congratulations!
            </h2>
            <p className="text-brown/70 mb-1 text-sm">
              {playerName}, you completed the puzzle in
            </p>
            <p className="font-mono text-3xl font-bold text-wine mb-6">
              {String(Math.floor((finalTime || currentTime) / 60)).padStart(2, '0')}:
              {String((finalTime || currentTime) % 60).padStart(2, '0')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCelebration(false)}
                className="flex-1 py-2.5 px-4 rounded-lg border-2 border-wine text-wine font-semibold text-sm hover:bg-wine/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/30"
              >
                View Board
              </button>
              <button
                onClick={handlePlayAgain}
                className="flex-1 py-2.5 px-4 rounded-lg bg-wine text-cream-light font-semibold text-sm hover:bg-maroon transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/30"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main layout: grid + clues */}
      <div className="md:grid md:grid-cols-[1fr_16rem] lg:grid-cols-[1fr_20rem] md:gap-6">
        {/* Grid */}
        <div className="mb-3 md:mb-0">
          <CrosswordGrid
            puzzleData={puzzle}
            playerGrid={playerGrid}
            cellNumbers={cellNumbers}
            activeCell={activeCell}
            activeDirection={activeDirection}
            activeWordCells={activeWordCells}
            onCellClick={handleCellClick}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
          />
        </div>

        {/* Clues */}
        <div>
          <CrosswordClues
            clues={clues}
            activeClueNumber={activeClueNumber}
            activeDirection={activeDirection}
            onClueClick={handleClueClick}
          />
        </div>
      </div>

      {/* Leaderboard section */}
      <div className="mt-8 sm:mt-12">
        <Leaderboard
          currentPlayerName={gamePhase === 'complete' ? playerName : null}
          currentPlayerTime={gamePhase === 'complete' ? (finalTime || currentTime) : null}
        />
      </div>

      {/* Play again bar for completed state */}
      {gamePhase === 'complete' && !showCelebration && (
        <div className="mt-6 text-center flex justify-center gap-4">
          <button
            onClick={handlePlayAgain}
            className="py-3 px-8 rounded-lg bg-wine text-cream-light font-sans font-semibold tracking-wide hover:bg-maroon hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/50 focus:ring-offset-2 focus:ring-offset-cream-light"
          >
            Play Again
          </button>
          <button
            onClick={handleChangePuzzle}
            className="py-3 px-8 rounded-lg border-2 border-wine text-wine font-sans font-semibold tracking-wide hover:bg-wine/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine/30"
          >
            Try Another
          </button>
        </div>
      )}
    </div>
  )
}

export default Crossword
