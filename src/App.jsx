import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (

    <>
     <div className="flex flex-col items-center space-y-4 p-4">
  <div className="output w-full max-w-md p-4 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50 text-gray-800">
  </div>

  <input
    type="text"
    className="w-full max-w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    placeholder="Enter your input here"
  />

  <button className="submit_btn px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 transition">
    Enter
  </button>
</div>

    </>
  )
}

export default App
