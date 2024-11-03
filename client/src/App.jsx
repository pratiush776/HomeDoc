import { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/Hero';
import Information from './components/Information';

function App() {

  return (

    <div
    className="antialiased max-w-4xl mx-auto">
      <Hero/>
      <Information />
    </div>
);
}

export default App
