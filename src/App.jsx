import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>

      </Routes>
    </>
  )
}

export default App
