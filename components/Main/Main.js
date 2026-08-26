"use client";

import styleMain from "../../styles/Main.module.css";
import React, { useState, useEffect } from "react";
import HeroCanvas from "../HeroCanvas";
import { ChevronsDown } from "lucide-react";
import { Link } from "react-scroll";
import { motion, useAnimation } from "framer-motion";

const Main = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const controls = useAnimation();
  const [isHovered, setHovered] = useState(true);
  useEffect(() => {
    if (isHovered) {
      controls.start((i) => ({
        opacity: 1,
        y: 20,
        transition: { repeat: Infinity, repeatType: "reverse", duration: 0.5 },
      }));
    } else {
      controls.start(() => ({ y:0 }));
    }
  }, [controls, isHovered]);

  return (
    <div className={styleMain.main} id="main">
      <HeroCanvas className={styleMain.canvas} />
      <div className={styleMain.container_main}>
        <div className={styleMain.row}>
          <div className={styleMain.text_center}>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ delay: 0.5, duration: 0.6 }}
              id={styleMain.hello}
            >
              Hello, I am
            </motion.h1>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ delay: 1, duration: 0.6 }}
              id={styleMain.name}
            >
              Nick Fan
            </motion.h1>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ delay: 1.5, duration: 0.6 }}
              id={styleMain.person_description}
            >
              Web Developer
            </motion.h1>
          </div>
        </div>
      </div>
      <motion.div
        className={styleMain.icon}
        animate={controls}
        // animate={{ y: -20 }}
        // transition={{ ease: "easeOut", duration: 2 }}
        // whileHover={{ scale: 1.1 }}
        onMouseEnter={() => setHovered(false)}
        onMouseLeave={() => setHovered(true)}
      >
        <div className={styleMain.banner_buttons}>
          <Link
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            offset={-38}
            duration={500}
          >
            <ChevronsDown size={64} color="#7facfafa" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Main;
