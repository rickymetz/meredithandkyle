import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
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
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/things-to-do" element={<ThingsToDo />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/q-and-a" element={<QAndA />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="/maps" element={<Maps />} />
      </Route>
    </Routes>
  )
}

export default App
