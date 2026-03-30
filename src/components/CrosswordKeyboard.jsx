const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

function CrosswordKeyboard({ onKey, onBackspace, rebusMode, hasRebus, onToggleRebus }) {
  return (
    <div className="md:hidden w-full bg-cream px-1.5 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] select-none">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-[4px] mb-[5px]">
          {i === 2 && hasRebus && (
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault()
                onToggleRebus()
              }}
              className={`flex-none w-14 h-11 rounded-md font-sans text-xs font-semibold transition-all duration-75 shadow-sm flex items-center justify-center ${
                rebusMode
                  ? 'bg-wine text-cream-light'
                  : 'bg-cream text-wine/70'
              }`}
            >
              Rebus
            </button>
          )}
          {i === 2 && !hasRebus && <div className="w-4" />}
          {row.map((letter) => (
            <button
              key={letter}
              type="button"
              onPointerDown={(e) => {
                e.preventDefault()
                onKey(letter)
              }}
              className="flex-1 max-w-[2.4rem] h-11 rounded-md bg-cream-light text-brown font-sans font-semibold text-base active:bg-wine/20 active:scale-95 transition-all duration-75 shadow-sm"
            >
              {letter}
            </button>
          ))}
          {i === 2 && (
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault()
                onBackspace()
              }}
              className="flex-none w-12 h-11 rounded-md bg-cream text-brown/70 font-sans text-sm active:bg-wine/20 active:scale-95 transition-all duration-75 shadow-sm flex items-center justify-center"
              aria-label="Backspace"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.374-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33z" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default CrosswordKeyboard
