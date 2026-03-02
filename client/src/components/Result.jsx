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
  //for debugging - sample api result
  // data = JSON.stringify({
  //   possibleDiseases: [
  //     {
  //       condition: "No Medical Condition",
  //       severity:
  //         "Not Applicable. It seems like you're just having a bad day and decided to express your frustration. No worries, we've all been there!",

  //       explanation:
  //         "It seems like you're just having a bad day and decided to express your frustration. No worries, we've all been there!",
  //       Advice:
  //         "Take a deep breath and try to relax. If you're feeling overwhelmed, consider talking to a friend or family member about what's bothering you.",
  //     },
  //   ],

  //   lifestyleAdjustments:
  //     "If you're feeling stressed or frustrated, try engaging in some relaxing activities like meditation, reading, or going for a walk. Remember to prioritize your mental health and take breaks when you need them.",

  //   recommendations:
  //     "If you're experiencing persistent feelings of anger or frustration, it may be helpful to speak with a mental health professional who can provide you with personalized guidance and support.",

  //   disclaimer:
  //     "Please keep in mind that this is not a substitute for professional medical advice. If you're experiencing any physical symptoms or concerns, please consult a qualified healthcare professional for an accurate diagnosis and treatment plan.",
  // });
  if (!data) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-slate-950">
        <h1 className="text-slate-100 font-semibold ">
          Opps! Something went wrong!
        </h1>
        <button
          onClick={resetData}
          className="w-[50%] mx-auto mt-5 px-4 py-2 bg-slate-600 text-slate-100 font-semibold rounded shadow-md hover:bg-slate-800 transition"
        >
          Try Again
        </button>
      </div>
    );
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
        className=" lg:relative overflow-hidden bg-slate-700 mx-auto h-auto min-h-fit md:max-w-screen lg:w-[40em] p-[1rem] rounded-3xl"
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
  } catch (error) {
    console.log(error);
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-slate-950">
        <h1 className="text-slate-100 font-semibold">
          Opps! Something went wrong!
        </h1>
        <button
          onClick={resetData}
          className="w-[50%] mx-auto mt-5 px-4 py-2 bg-slate-600 text-slate-100 font-semibold rounded shadow-md hover:bg-slate-800 transition"
        >
          Try Again
        </button>
      </div>
    );
  }
};

export default Result;
