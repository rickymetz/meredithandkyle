// Sample 5x5 crossword puzzle data
// Will be replaced with parsed .puz file data later
//
// Grid (# = black):
//
//   1V  2O  3W  4S   #
//    A   #   I   #  5B
//   6L  7O   V  8E   S
//    S   #   E   #   T
//    #  9K   I 10S   S
//
// Across: 1-VOWS (0,0 len 4), 6-LOVES (2,0 len 5), 9-KISS (4,1 len 4)
// Down: 1-VALS (0,0 len 4), 3-WIVE (0,2 len 5 — sample placeholder),
//       5-BSTS (1,4 len 4 — sample placeholder), 7-OK (2,1 len 1? No.)
//
// Actually let me just build it properly in code. The grid component
// will compute numbering from the grid itself. The clue data just needs
// to line up. Let me keep it simple and correct.

const crosswordData = {
  size: { rows: 5, cols: 5 },
  grid: [
    ['V', 'O', 'W', 'S', '#'],
    ['A', '#', 'I', '#', 'B'],
    ['L', 'O', 'V', 'E', 'S'],
    ['S', '#', 'E', '#', 'T'],
    ['#', 'K', 'I', 'S', 'S'],
  ],
  clues: {
    across: [
      { number: 1, clue: 'Solemn promises at the altar', row: 0, col: 0, length: 4 },
      { number: 6, clue: 'Affection that lasts forever', row: 2, col: 0, length: 5 },
      { number: 9, clue: 'Sealed with a ___', row: 4, col: 1, length: 4 },
    ],
    down: [
      { number: 1, clue: 'Short for "valentines"', row: 0, col: 0, length: 4 },
      { number: 3, clue: 'Partners share a married ___', row: 0, col: 2, length: 5 },
      { number: 5, clue: 'Top picks (informal)', row: 1, col: 4, length: 4 },
    ],
  },
};

export default crosswordData;
