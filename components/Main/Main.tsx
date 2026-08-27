"use client";

import { useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import HeroCanvas from "../HeroCanvas";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Main = () => {
  const controls = useAnimation();
  const [isHovered, setHovered] = useState(true);

  useEffect(() => {
    if (isHovered) {
      controls.start({
        opacity: 1,
        y: 20,
        transition: { repeat: Infinity, repeatType: "reverse", duration: 0.5 },
      });
    } else {
      controls.start({ y: 0 });
    }
  }, [controls, isHovered]);

  return (
    <div
      className="relative z-[1] flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-hero)] bg-cover bg-center text-[var(--text-inverse)]"
      id="main"
    >
      <HeroCanvas className="absolute inset-0 -z-[1] block h-full w-full" />
      <div className="mx-auto mt-auto px-[15px]">
        <div className="-mx-[15px]">
          <div className="text-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-[10px] mt-5 font-[Verdana,Arial,Tahoma,serif] text-[2rem] font-bold leading-[1.1] min-[601px]:text-[3.5rem]"
            >
              Hello, I am
            </motion.h1>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 1, duration: 0.6 }}
              className="mb-[10px] mt-5 font-['Raleway-semibold'] text-[3.5rem] font-bold leading-[1.1] text-[#7facfafa] min-[601px]:text-[6.5rem]"
            >
              Nick Fan
            </motion.h1>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mb-[10px] mt-5 font-[Verdana,Arial,Tahoma,serif] text-[1.2rem] font-bold leading-[1.1] min-[601px]:text-[2.8rem]"
            >
              Web Developer
            </motion.h1>
          </div>
        </div>
      </div>
      <motion.div
        className="mb-20 mt-auto"
        animate={controls}
        onMouseEnter={() => setHovered(false)}
        onMouseLeave={() => setHovered(true)}
      >
        <a
          className="inline-flex cursor-pointer text-[#7facfafa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          href="#about"
          aria-label="Scroll to about section"
        >
          <ChevronsDown size={64} aria-hidden="true" />
        </a>
      </motion.div>
    </div>
  );
};

export default Main;
