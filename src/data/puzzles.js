import miniPuz from './mini.puz?url'
import mediumPuz from './medium.puz?url'
import fullPuz from './full.puz?url'

export const PUZZLES = [
  {
    id: 'mini',
    label: 'Mini',
    description: '7×7 — Quick warm-up',
    url: miniPuz,
  },
  {
    id: 'medium',
    label: 'Midi',
    description: '9×9 — Medium challenge',
    url: mediumPuz,
  },
  {
    id: 'full',
    label: 'Full',
    description: '15×15 — The real deal',
    url: fullPuz,
  },
]
