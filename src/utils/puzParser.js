/**
 * Parser for the AcrossLite .puz binary format.
 *
 * .puz format overview:
 *  - 0x00-0x01  overall checksum (uint16 LE)
 *  - 0x02-0x0D  magic string "ACROSS&DOWN\0"
 *  - 0x0E-0x0F  CIB checksum
 *  - 0x10-0x17  masked low checksums (4 x uint16)
 *  - 0x18-0x1F  masked high checksums (4 x uint16)
 *  - 0x20-0x23  version string (null-terminated, e.g. "1.3\0")
 *  - 0x24-0x25  reserved1
 *  - 0x26-0x27  scrambled checksum
 *  - 0x28-0x2B  reserved2 (12 bytes total with above, but often grouped differently)
 *  - 0x2C       width  (uint8)
 *  - 0x2D       height (uint8)
 *  - 0x2E-0x2F  number of clues (uint16 LE)
 *  - 0x30-0x31  unknown bitmask
 *  - 0x32-0x33  scrambled tag (0 = unscrambled)
 *  - 0x34       start of solution grid (width*height bytes, '.' = black)
 *  - 0x34 + w*h start of player state grid (width*height bytes)
 *  - After both grids: null-terminated strings in order:
 *      title, author, copyright, then one string per clue
 */

/**
 * Parse a .puz ArrayBuffer into our crossword data structure.
 * @param {ArrayBuffer} buffer - The raw .puz file contents
 * @returns {{ size, grid, clues, title, author, copyright }}
 */
export function parsePuz(buffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);

  // Validate magic string
  const magicBytes = bytes.slice(0x02, 0x0E);
  const magic = String.fromCharCode(...magicBytes);
  if (magic !== 'ACROSS&DOWN\0') {
    throw new Error('Invalid .puz file: magic string not found');
  }

  // Read dimensions
  const width = bytes[0x2C];
  const height = bytes[0x2D];
  const numClues = view.getUint16(0x2E, true); // little-endian

  // Read solution grid
  const solutionStart = 0x34;
  const solutionEnd = solutionStart + width * height;
  const solutionBytes = bytes.slice(solutionStart, solutionEnd);

  // Build 2D grid array
  const grid = [];
  for (let r = 0; r < height; r++) {
    const row = [];
    for (let c = 0; c < width; c++) {
      const ch = String.fromCharCode(solutionBytes[r * width + c]);
      row.push(ch === '.' ? '#' : ch);
    }
    grid.push(row);
  }

  // Skip player state grid
  const stringsStart = solutionEnd + width * height;

  // Read null-terminated strings starting at stringsStart
  const strings = [];
  let pos = stringsStart;
  // We need: title, author, copyright, then numClues clue strings
  const totalStrings = 3 + numClues;
  for (let i = 0; i < totalStrings && pos < bytes.length; i++) {
    let end = pos;
    while (end < bytes.length && bytes[end] !== 0) {
      end++;
    }
    strings.push(decodeString(bytes, pos, end));
    pos = end + 1; // skip the null terminator
  }

  const title = strings[0] || '';
  const author = strings[1] || '';
  const copyright = strings[2] || '';
  const clueStrings = strings.slice(3);

  // Assign cell numbers and build clue lists
  const cellNumbers = buildCellNumbers(grid, width, height);
  const across = [];
  const down = [];

  let clueIdx = 0;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (grid[r][c] === '#') continue;
      const num = cellNumbers[r][c];
      if (num === 0) continue;

      // Across: starts a word if leftmost or left neighbor is black
      if (isAcrossStart(grid, r, c, width)) {
        const length = wordLength(grid, r, c, 'across', width, height);
        if (length > 1) {
          across.push({
            number: num,
            clue: clueStrings[clueIdx] || '',
            row: r,
            col: c,
            length,
          });
          clueIdx++;
        }
      }

      // Down: starts a word if topmost or top neighbor is black
      if (isDownStart(grid, r, c, height)) {
        const length = wordLength(grid, r, c, 'down', width, height);
        if (length > 1) {
          down.push({
            number: num,
            clue: clueStrings[clueIdx] || '',
            row: r,
            col: c,
            length,
          });
          clueIdx++;
        }
      }
    }
  }

  return {
    size: { rows: height, cols: width },
    grid,
    clues: { across, down },
    title,
    author,
    copyright,
  };
}

/** Decode a byte range as a Latin-1 string */
function decodeString(bytes, start, end) {
  let s = '';
  for (let i = start; i < end; i++) {
    s += String.fromCharCode(bytes[i]);
  }
  return s;
}

/** Build a 2D array of cell numbers (0 = no number) */
function buildCellNumbers(grid, width, height) {
  const numbers = Array.from({ length: height }, () => Array(width).fill(0));
  let num = 1;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (grid[r][c] === '#') continue;
      if (isAcrossStart(grid, r, c, width) || isDownStart(grid, r, c, height)) {
        // Only assign a number if the word is longer than 1
        const acrossLen = isAcrossStart(grid, r, c, width)
          ? wordLength(grid, r, c, 'across', width, height)
          : 0;
        const downLen = isDownStart(grid, r, c, height)
          ? wordLength(grid, r, c, 'down', width, height)
          : 0;
        if (acrossLen > 1 || downLen > 1) {
          numbers[r][c] = num++;
        }
      }
    }
  }
  return numbers;
}

function isAcrossStart(grid, r, c, width) {
  if (grid[r][c] === '#') return false;
  return c === 0 || grid[r][c - 1] === '#';
}

function isDownStart(grid, r, c, height) {
  if (grid[r][c] === '#') return false;
  return r === 0 || grid[r - 1][c] === '#';
}

function wordLength(grid, r, c, direction, width, height) {
  let len = 0;
  if (direction === 'across') {
    while (c + len < width && grid[r][c + len] !== '#') len++;
  } else {
    while (r + len < height && grid[r + len][c] !== '#') len++;
  }
  return len;
}

export default parsePuz;
