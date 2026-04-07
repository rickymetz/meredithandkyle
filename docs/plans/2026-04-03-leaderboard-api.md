# Leaderboard API Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the mock/localStorage leaderboard with a real shared leaderboard backed by Netlify Functions + Netlify Blobs, so all wedding guests see each other's scores.

**Architecture:** Two Netlify Functions (GET scores, POST score) using Netlify Blobs as KV storage. One blob per puzzle ID stores a JSON array of up to 100 scores. Frontend fetches on mount and POSTs on completion. No mock scores — leaderboard starts empty until real guests play.

**Tech Stack:** Netlify Functions v2 (ES modules), @netlify/blobs, React (existing frontend)

---

### Task 1: Install dependencies and configure Netlify Functions

**Files:**
- Modify: `package.json`
- Modify: `netlify.toml`

**Step 1: Install @netlify/blobs**

```bash
npm install @netlify/blobs
```

**Step 2: Update netlify.toml to configure functions directory**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The `/api/*` redirect must come BEFORE the SPA catch-all so API calls hit functions, not index.html.

**Step 3: Commit**

```bash
git add package.json package-lock.json netlify.toml
git commit -m "chore: add @netlify/blobs, configure Netlify Functions"
```

---

### Task 2: Create the scores Netlify Function

**Files:**
- Create: `netlify/functions/scores.js`

**Step 1: Implement the function**

This single function handles both GET and POST via the request method.

```js
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

    // Validate puzzle
    if (!puzzle || !VALID_PUZZLES.includes(puzzle)) {
      return jsonResponse({ error: 'Invalid puzzle. Must be: mini, medium, full' }, 400)
    }

    // Validate name
    const trimmedName = (name || '').trim()
    if (!trimmedName || trimmedName.length > 40) {
      return jsonResponse({ error: 'Name required, max 40 characters' }, 400)
    }

    // Validate time
    if (typeof time !== 'number' || time < 1 || time > 3600 || !Number.isInteger(time)) {
      return jsonResponse({ error: 'Time must be an integer 1-3600' }, 400)
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
```

**Step 2: Test locally**

```bash
npx netlify dev
# In another terminal:
curl http://localhost:8888/api/scores?puzzle=mini
# Should return []

curl -X POST http://localhost:8888/api/scores \
  -H 'Content-Type: application/json' \
  -d '{"puzzle":"mini","name":"Test","time":45}'
# Should return [{name:"Test",time:45,date:"2026-04-03"}]
```

**Step 3: Commit**

```bash
git add netlify/functions/scores.js
git commit -m "feat: add scores Netlify Function with Blobs storage"
```

---

### Task 3: Update Leaderboard component to fetch from API

**Files:**
- Modify: `src/components/Leaderboard.jsx`

**Step 1: Replace mock scores + localStorage with API fetch**

Remove `MOCK_SCORES` export entirely. The Leaderboard component now:
- Fetches scores from `/api/scores?puzzle={id}` on mount
- Shows loading state
- Falls back gracefully on error
- Accepts `currentPlayerScore` to highlight "you" in the list

```jsx
import { useState, useEffect } from 'react'
import { formatTime } from '../utils/formatTime.js'

const PUZZLE_LABELS = {
  mini: 'Mini',
  medium: 'Midi',
  full: 'Full',
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Leaderboard({ puzzleId, currentPlayerName, currentPlayerTime, refreshKey }) {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!puzzleId) return
    setLoading(true)
    fetch(`/api/scores?puzzle=${puzzleId}`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setScores(data))
      .catch(() => setScores([]))
      .finally(() => setLoading(false))
  }, [puzzleId, refreshKey])

  // Mark current player in the list
  const displayScores = scores.map((s) => ({
    ...s,
    isCurrent: currentPlayerName && currentPlayerTime != null
      && s.name === currentPlayerName.trim() && s.time === currentPlayerTime,
  }))

  return (
    <div className="w-full">
      <h2 className="font-serif text-xl sm:text-2xl text-wine mb-4 text-center">
        {puzzleId ? `${PUZZLE_LABELS[puzzleId] || ''} Leaderboard` : 'Leaderboard'}
      </h2>

      <div className="bg-cream/50 border border-cream-dark rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2.5rem_1fr_4.5rem_4.5rem] sm:grid-cols-[3rem_1fr_5rem_5rem] px-3 py-2 bg-cream-dark/40 text-xs sm:text-sm font-semibold text-wine/70 uppercase tracking-wider">
          <span>#</span>
          <span>Name</span>
          <span className="text-right">Time</span>
          <span className="text-right">Date</span>
        </div>

        {loading && (
          <div className="px-3 py-6 text-center text-brown/50 text-sm animate-pulse">
            Loading scores...
          </div>
        )}

        {/* Rows */}
        {!loading && displayScores.map((score, i) => {
          const rank = i + 1
          return (
            <div
              key={`${score.name}-${score.time}-${score.date}`}
              className={`grid grid-cols-[2.5rem_1fr_4.5rem_4.5rem] sm:grid-cols-[3rem_1fr_5rem_5rem] px-3 py-2.5 border-t border-cream-dark/30 text-sm sm:text-base transition-colors ${
                score.isCurrent
                  ? 'bg-wine/10 font-semibold text-brown'
                  : 'text-brown/80'
              }`}
            >
              <span className="flex items-center">
                <span className={`font-serif font-bold ${rank === 1 ? 'text-wine' : rank === 2 ? 'text-brown' : rank === 3 ? 'text-brown-light' : 'text-brown/50'}`}>
                  {rank}
                </span>
              </span>
              <span className="truncate">
                {score.name}
                {score.isCurrent && (
                  <span className="ml-1.5 text-xs text-wine/60">(you)</span>
                )}
              </span>
              <span className="text-right font-mono">{formatTime(score.time)}</span>
              <span className="text-right text-brown/50 text-xs sm:text-sm">
                {formatDate(score.date)}
              </span>
            </div>
          )
        })}

        {!loading && displayScores.length === 0 && (
          <div className="px-3 py-6 text-center text-brown/50 text-sm">
            No scores yet. Be the first!
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
```

**Step 2: Commit**

```bash
git add src/components/Leaderboard.jsx
git commit -m "feat: Leaderboard fetches from API, remove mock scores"
```

---

### Task 4: Update Crossword page to POST scores and refresh leaderboard

**Files:**
- Modify: `src/pages/Crossword.jsx`

**Step 1: Remove all MOCK_SCORES references**

- Remove `import Leaderboard, { MOCK_SCORES }` — change to `import Leaderboard`
- Remove `MOCK_SCORES` usage in `CelebrationModal` rank calculation
- Add a `refreshKey` state that increments when a score is submitted, to trigger Leaderboard refetch

**Step 2: POST score on completion**

In the completion handler (where `checkCompletion(newGrid)` returns true), after setting state, also POST to the API:

```js
// Submit score to server
fetch('/api/scores', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ puzzle: puzzleId, name: playerName.trim(), time: currentTime }),
}).then(() => setRefreshKey((k) => k + 1)).catch(() => {})
```

**Step 3: Update CelebrationModal**

The celebration modal currently calculates rank from MOCK_SCORES. Since we no longer have mock scores, the modal should either:
- Accept rank as a prop (computed from the POST response)
- Or just show the time without rank, and let the leaderboard below show placement

Simplest: Remove the rank line from the modal. The leaderboard already highlights "(you)" so rank is visible there.

**Step 4: Pass refreshKey to all Leaderboard instances**

```jsx
<Leaderboard puzzleId={puzzleId} currentPlayerName={...} currentPlayerTime={...} refreshKey={refreshKey} />
```

**Step 5: Keep localStorage as cache**

Keep writing to localStorage so the puzzle-selection screen can show "Completed by {name}" without an API call. But leaderboard data comes from the API now.

**Step 6: Commit**

```bash
git add src/pages/Crossword.jsx
git commit -m "feat: POST scores to API on completion, refresh leaderboard"
```

---

### Task 5: Test end-to-end locally with netlify dev

**Files:** None (testing only)

**Step 1: Start netlify dev**

```bash
npx netlify dev
```

This runs both the Vite dev server and Netlify Functions locally.

**Step 2: Play through a mini crossword**

- Navigate to http://localhost:8888/crossword
- Select Mini, enter name, solve puzzle
- Verify score appears in leaderboard
- Refresh page — score should persist (from API, not localStorage)
- Open a private/incognito window — score should be visible there too

**Step 3: Test validation**

```bash
# Missing puzzle
curl -X POST http://localhost:8888/api/scores -H 'Content-Type: application/json' -d '{}'
# Should return 400

# Invalid time
curl -X POST http://localhost:8888/api/scores -H 'Content-Type: application/json' -d '{"puzzle":"mini","name":"X","time":-1}'
# Should return 400

# Name too long
curl -X POST http://localhost:8888/api/scores -H 'Content-Type: application/json' -d '{"puzzle":"mini","name":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","time":10}'
# Should return 400
```

**Step 4: Commit any fixes**

---

### Task 6: Deploy and verify on production

**Step 1: Push to trigger Netlify deploy**

```bash
git push origin main
```

**Step 2: Verify on production URL**

- Visit the production site's /crossword page
- Check that leaderboard loads (should be empty initially)
- Complete a puzzle, verify score appears
- Check in another browser — score should be shared

**Step 3: Install netlify CLI if needed for blob inspection**

```bash
npx netlify blobs:list --store leaderboard
```
