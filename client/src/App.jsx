import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

import { useState, useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Information from "./components/Information";
import Result from "./components/Result";

export default function App() {
  const [data, setData] = useState(null);

  const resetData = () => {
    setData(null);
  };

  return (
    <ReactLenis root>
      <div className="antialiased p-0 w-screen flex flex-col justify-center">
        <Hero />
        <div
          id="form"
          className="relative w-full bg-slate-950 py-[3rem] px-[1.5rem] md:w-screen items-start md:items-center min-h-screen flex justify-center lg:items-center"
        >
          {!data ? (
            <Information setResult={setData} />
          ) : (
            <Result data={data} resetData={resetData} />
          )}

          <footer className="text-center absolute left-1/2 -translate-x-1/2 bottom-0 h-[2rem]">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </ReactLenis>
  );
}
