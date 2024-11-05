import { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/Hero';
import Information from './components/Information';
import Result from './components/Result'

function App() {


  const [data,setData] = useState(null)

  const resetData = () => {
    setData(null);
  };
  
  return (

    <div
    className="antialiased p-0 w-screen flex flex-col justify-center ">
      <Hero/>
      {!data?<Information setResult={setData}/>:<Result data={data} setResult={setData} resetData={resetData}/>}
    </div>
);
}

export default App
