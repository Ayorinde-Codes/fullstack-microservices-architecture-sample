import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Country from './pages/country/Country'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries/:id/:name" element={<Country />} />
      </Routes>
    </div>
  )
}

export default App
