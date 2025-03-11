import { LampContainer } from "./ui/lamp";
import { motion } from "motion/react";

const Hero = () => {
  return (
    // <LampContainer>
    //   <div className="">
    //     <motion.h1
    //       initial={{ opacity: 0.5, y: 100 }}
    //       whileInView={{ opacity: 1, y: -25 }}
    //       transition={{
    //         delay: 0.3,
    //         duration: 0.8,
    //         ease: "easeInOut",
    //       }}
    //       className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-white text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl sm:text-5xl"
    //     >
    //       Home Doc
    //     </motion.h1>
    //     <motion.p
    //       initial={{ opacity: 0, y: 100 }}
    //       whileInView={{ opacity: 1, y: 0 }}
    //       transition={{
    //         delay: 0.4,
    //         duration: 0.8,
    //         ease: "easeInOut",
    //       }}
    //       className="w-[60vw] flex flex-col justify-center items-center mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-white text-center text-base font-thin tracking-wider text-transparent md:text-base sm:text-xs"
    //     >
    //       Discover potential health insights quickly and easily with our Symptom
    //       Checker. Enter your symptoms, and let our intelligent tool guide you
    //       toward understanding possible conditions. Remember, this tool is for
    //       initial assessment only—always consult a healthcare professional for
    //       an accurate diagnosis.
    //     </motion.p>
    //   </div>
    // </LampContainer>
    <LampContainer>
      <div className="flex flex-col items-center h-full px-4 ">
        <motion.h1
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-slate-300 to-slate-500 py-2 bg-clip-text text-white text-center lg:text-7xl font-semibold tracking-tight text-[2.75rem]"
        >
          Home Doc
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 25 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="max-w-md mx-auto lg:mt-4 bg-gradient-to-br from-slate-300 to-slate-500 lg:py-2 bg-clip-text text-slate-200 text-center lg:text-base font-extralight lg:font-thin tracking-wide text-sm "
      >
        Discover potential health insights quickly and easily with our Symptom
        Checker. Enter your symptoms, and let our intelligent tool guide you
        toward understanding possible conditions. Remember, this tool is for
        initial assessment only—always consult a healthcare professional for an
        accurate diagnosis.
      </motion.p>
    </LampContainer>
  );
};

export default Hero;
