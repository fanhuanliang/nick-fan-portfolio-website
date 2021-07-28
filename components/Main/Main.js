import styleMain from "../../styles/Main.module.css";
import React, { useState, useEffect } from "react";
import Canvas from "../canvas/Canvas";
import { Icon } from "semantic-ui-react";
import { Link } from "react-scroll";
import { motion, useAnimation } from "framer-motion";

const Main = () => {
  useEffect(() => {
    Canvas();
  }, []);
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
        transition: { yoyo: Infinity, duration: 0.5 },
      }));
    } else {
      controls.start(() => ({ y:0 }));
    }
  }, [isHovered]);

  return (
    <div className={styleMain.main} id="main">
      <canvas id="c" className={styleMain.canvas}></canvas>
      <div className={styleMain.container_main}>
        <div className={styleMain.row}>
          <div className={styleMain.text_center}>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 1 }}
              id={styleMain.hello}
            >
              Hello, I am
            </motion.h1>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 2.5 }}
              id={styleMain.name}
            >
              Huanliang Fan
            </motion.h1>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 3.5 }}
              id={styleMain.person_description}
            >
              Full Stack Software Engineer
            </motion.h1>
          </div>
        </div>
      </div>
      <motion.div
        className={styleMain.icon}
        animate={controls}
        // animate={{ y: -20 }}
        // transition={{ yoyo: Infinity }}
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
            offset={-70}
            duration={500}
          >
            <Icon name="angle double down" size="huge" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Main;
