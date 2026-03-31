import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Home from './pages/Home.jsx'
import Schedule from './pages/Schedule.jsx'
import Accommodations from './pages/Accommodations.jsx'
import ThingsToDo from './pages/ThingsToDo.jsx'
import Registry from './pages/Registry.jsx'
import QAndA from './pages/QAndA.jsx'
import RSVP from './pages/RSVP.jsx'
import Crossword from './pages/Crossword.jsx'
import Maps from './pages/Maps.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
        <Route path="/schedule" element={<ErrorBoundary><Schedule /></ErrorBoundary>} />
        <Route path="/accommodations" element={<ErrorBoundary><Accommodations /></ErrorBoundary>} />
        <Route path="/things-to-do" element={<ErrorBoundary><ThingsToDo /></ErrorBoundary>} />
        <Route path="/registry" element={<ErrorBoundary><Registry /></ErrorBoundary>} />
        <Route path="/q-and-a" element={<ErrorBoundary><QAndA /></ErrorBoundary>} />
        <Route path="/rsvp" element={<ErrorBoundary><RSVP /></ErrorBoundary>} />
        <Route path="/crossword" element={<ErrorBoundary><Crossword /></ErrorBoundary>} />
        <Route path="/maps" element={<ErrorBoundary><Maps /></ErrorBoundary>} />
      </Route>
    </Routes>
  )
}

export default App
