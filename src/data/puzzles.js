import miniPuz from './mini.puz?url'
import mediumPuz from './medium.puz?url'
import fullPuz from './full.puz?url'

export const PUZZLES = [
  {
    id: 'mini',
    label: 'Mini',
    size: '7×7',
    description: 'Quick warm-up',
    url: miniPuz,
  },
  {
    id: 'medium',
    label: 'Midi',
    size: '9×9',
    description: 'Medium challenge',
    url: mediumPuz,
  },
  {
    id: 'full',
    label: 'Full',
    size: '15×15',
    description: 'The real deal',
    url: fullPuz,
  },
]
