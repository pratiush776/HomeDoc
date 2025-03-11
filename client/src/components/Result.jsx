import React from "react";
import Diseases from "@/components/Diseases";
import { motion } from "motion/react";
import { stagger } from "motion/react";

// Utility function to format key names into readable headings
const formatKeyName = (key) => {
  return key
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const Result = ({ data, resetData }) => {
  if (!data) {
    return <p>No data available.</p>;
  }
  try {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3, // Adjust stagger duration as needed
          // when: "beforeChildren", // Optional: animate container before children
        },
      },
    };
    const childVariants = {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    return (
      <motion.div
        initial={{
          opacity: 0.4,
        }}
        whileInView={{ opacity: 1 }}
        transition={{
          // delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" lg:relative overflow-hidden bg-slate-700 mx-auto lg:h-[80vh]  md:max-w-screen lg:aspect-[2/3] p-[1rem] rounded-3xl"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className=" flex flex-col py-[1rem] text-slate-50 justify-evenly"
        >
          <h1 className="font-extralight tracking-widest text-2xl lg:absolute lg:top-[1rem] text-slate-300">
            Result
          </h1>
          {Object.entries(JSON.parse(data)).map(([key, value]) => {
            const heading = formatKeyName(key);

            // Check if the value is an array
            if (Array.isArray(value)) {
              // Check if it's an array of objects with a 'condition' property
              if (
                value.length > 0 &&
                typeof value[0] === "object" &&
                value[0].condition
              ) {
                // Render conditions as cards in a horizontal list
                return (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="w-[85%] mx-auto"
                    key={key}
                  >
                    <motion.h2
                      variants={childVariants}
                      className="text-2xl text-center font-bold tracking-wider"
                    >
                      {heading}
                    </motion.h2>
                    <motion.div variants={childVariants}>
                      <Diseases data={value} />
                    </motion.div>
                  </motion.div>
                );
              } else {
                // Render array of strings as a bulleted list
                return (
                  <motion.div
                    variants={childVariants}
                    className="m-5 w-[75%] mx-auto"
                    key={key}
                  >
                    <h2 className="text-2xl text-center font-bold tracking-wider">
                      {heading}
                    </h2>
                    <ul className="list-disc list-none">
                      {value.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm font-light leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              }
            } else if (typeof value === "string") {
              // Render string values as paragraphs
              return (
                <motion.div
                  variants={childVariants}
                  className="m-5 w-[75%] mx-auto"
                  key={key}
                >
                  <h2 className="text-2xl text-center font-bold tracking-wider">
                    {heading}
                  </h2>
                  <p className="text-sm font-light leading-relaxed">{value}</p>
                </motion.div>
              );
            } else {
              // Handle other data types if necessary
              return null;
            }
          })}

          <motion.button
            variants={childVariants}
            onClick={resetData}
            className="w-[50] mx-auto px-4 py-2 bg-slate-600 text-slate-100 font-semibold rounded shadow-md hover:bg-slate-800 transition"
          >
            Diagnose Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  } catch {
    return (
      <div className="h-screen bg-slate-950">
        <h1>Opps! Something went wrong!</h1>
        <button
          onClick={resetData}
          className="w-[50%] mx-auto mt-5 px-4 py-2 bg-slate-600 text-slate-100 font-semibold rounded shadow-md hover:bg-slate-800 transition"
        >
          Diagnose
        </button>
      </div>
    );
  }
};

export default Result;
