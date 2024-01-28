import { createContext, useState } from 'react'
import './App.css'
import Cat from './Cat'
import Home from './Home'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CatImage } from './type'


export const CatContext = createContext<CatImage | null>(null)

function App() {
  const [selectedBreedImage, setSelectedBreed] = useState<CatImage | null>(null);
  return (
      <CatContext.Provider value={selectedBreedImage}>
        <Router>
          <Routes>
            <Route path="/:id" element={<Cat />} />
            <Route path="/" element={<Home onSelect={(selected: CatImage | null) => setSelectedBreed(selected)}/>} />
          </Routes>
        </Router>
      </CatContext.Provider>
  )
}

export default App
