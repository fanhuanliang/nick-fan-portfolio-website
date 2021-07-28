import styleMain from "../../styles/Main.module.css";
import React from "react";
import Canvas from "../canvas/Canvas";
import { Icon } from "semantic-ui-react";
import { Link } from "react-scroll";

const Main = () => {
  React.useEffect(() => {
    Canvas();
  }, []);

  return (
    <div className={styleMain.main} id="main">
      <canvas id="c" className={styleMain.canvas}></canvas>
      <div className={styleMain.container_main}>
        <div className={styleMain.row}>
          <div className={styleMain.text_center}>
            <h1 id={styleMain.hello}>
              Hello, I am
            </h1>
            <h1 id={styleMain.name}>
              Huanliang Fan
            </h1>

            <h1 id={styleMain.person_description}>
              Full Stack Software Engineer
            </h1>
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
