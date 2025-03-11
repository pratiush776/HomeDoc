import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Expand } from "lucide-react";

export default function PossibleDiseases(data) {
  // Check if the passed data has a "data" property that is an array.
  data = data && Array.isArray(data.data) ? data.data : [];

  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100] ">
            <motion.div
              layoutId={`card-${active.condition}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-slate-300 sm:rounded-3xl overflow-hidden"
            >
              <motion.button
                key={`button-${active.condition}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="flex m-5 self-end absolute items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="flex flex-col justify-center  gap-[1.3rem]">
                    <motion.h3
                      layoutId={`condition-${active.condition}-${id}`}
                      className="text-center font-bold text-slate-950 text-3xl leading-loose "
                    >
                      {active.condition}
                    </motion.h3>
                    <motion.p
                      layoutId={`explanation-${active.explanation}-${id}`}
                      className="text-slate-900 font-extralight text-left w-[80%] mx-auto text-base flex flex-col justify-center  gap-[1.3rem]"
                    >
                      <span>
                        <h2 className="font-semibold">Severity</h2>
                        {active.severity}
                      </span>
                      <span>
                        <h2 className="font-semibold"> Explanation</h2>{" "}
                        {active.explanation}
                      </span>
                      <span>
                        <h2 className="font-semibold"> Advice</h2>
                        {active.advice}
                      </span>
                    </motion.p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <motion.ul
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // Adjust stagger duration as needed
              //   when: "beforeChildren", // Optional: animate container before children
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        className="w-[100%] flex-col items-center justify-center"
      >
        {data.map((card, index) => (
          <motion.li
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
            }}
            layoutId={`card-${card.condition}-${id}`}
            key={card.condition}
            onClick={() => setActive(card)}
            className="p-[1rem] my-4 flex flex-col bg-slate-300 hover:bg-neutral-50  rounded-xl cursor-pointer"
          >
            <div className="flex justify-center items-center flex-col">
              <div className="w-full flex items-start justify-between flex-row-reverse ">
                <Expand className="text-slate-950" size={".75rem"} />

                <motion.h3
                  layoutId={`condition-${card.condition}-${id}`}
                  className="font-semibold text-slate-950 text-center text-xl"
                >
                  {card.condition}
                </motion.h3>
              </div>
              <motion.p
                layoutId={`explanation-${card.explanation}-${id}`}
                className="w-full text-start text-slate-700 text-sm font-light leading-relaxed "
              >
                <span
                  className="whitespace-nowrap overflow-hidden inline-block w-full"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(90deg, black 80%, transparent 100%)",
                    maskImage:
                      "linear-gradient(90deg, black 80%, transparent 100%)",
                  }}
                >
                  Severity: {card.severity}
                  <br></br> {card.explanation}
                </span>
              </motion.p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
