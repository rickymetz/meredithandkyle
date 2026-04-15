import { getStore } from '@netlify/blobs'

const VALID_PUZZLES = ['mini', 'medium', 'full']
const MAX_SCORES = 100

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function getScores(store, puzzleId) {
  const raw = await store.get(`scores-${puzzleId}`)
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function saveScores(store, puzzleId, scores) {
  await store.set(`scores-${puzzleId}`, JSON.stringify(scores))
}

export default async (request) => {
  const url = new URL(request.url)
  const store = getStore('leaderboard')

  // GET /api/scores?puzzle=mini
  if (request.method === 'GET') {
    const puzzleId = url.searchParams.get('puzzle')
    if (!puzzleId || !VALID_PUZZLES.includes(puzzleId)) {
      return jsonResponse({ error: 'Invalid puzzle. Must be: mini, medium, full' }, 400)
    }

    const scores = await getScores(store, puzzleId)
    return jsonResponse(scores.slice(0, MAX_SCORES))
  }

  // POST /api/scores
  if (request.method === 'POST') {
    let body
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'Invalid JSON' }, 400)
    }

    const { puzzle, name, time } = body

    if (!puzzle || !VALID_PUZZLES.includes(puzzle)) {
      return jsonResponse({ error: 'Invalid puzzle. Must be: mini, medium, full' }, 400)
    }

    const trimmedName = (name || '').trim()
    if (!trimmedName || trimmedName.length > 40) {
      return jsonResponse({ error: 'Name required, max 40 characters' }, 400)
    }

    if (typeof time !== 'number' || time < 1 || time > 86400 || !Number.isInteger(time)) {
      return jsonResponse({ error: 'Time must be an integer 1-86400' }, 400)
    }

    const scores = await getScores(store, puzzle)

    scores.push({
      name: trimmedName,
      time,
      date: new Date().toISOString().slice(0, 10),
    })

    // Sort by time ascending, keep top 100
    scores.sort((a, b) => a.time - b.time)
    const trimmed = scores.slice(0, MAX_SCORES)

    await saveScores(store, puzzle, trimmed)

    return jsonResponse(trimmed)
  }

  return jsonResponse({ error: 'Method not allowed' }, 405)
}

export const config = {
  path: '/api/scores',
}
