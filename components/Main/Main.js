import styleMain from "../../styles/Main.module.css";
import React from "react";
import Canvas from "../canvas/Canvas";
import { Icon } from "semantic-ui-react";
import { Link } from "react-scroll";
import { useSpring, animated } from "react-spring";

const Main = () => {
  React.useEffect(() => {
    Canvas();
  }, []);
  const props1 = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
  });
  const props2 = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
  });
  const props3 = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1500,
  });

  return (
    <div className={styleMain.main} id="main">
      <canvas id="c" className={styleMain.canvas}></canvas>
      <div className={styleMain.container_main}>
        <div className={styleMain.row}>
          <div className={styleMain.text_center}>
            <animated.h1 style={props1} id={styleMain.hello}>
              Hello, I am
            </animated.h1>
            <animated.h1 style={props2} id={styleMain.name}>
              Huanliang Fan
            </animated.h1>

            <animated.h1 style={props3} id={styleMain.person_description}>
              Full Stack Software Engineer
            </animated.h1>
          </div>
        </div>
      </div>
      <div className={styleMain.icon}>
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
      </div>
    </div>
  );
};

export default Main;
