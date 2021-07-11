import styleMain from '../../../styles/Main.module.css'
import React from 'react'
import Canvas from '../../canvas/Canvas'

const  Main = () => {

  React.useEffect(()=>{
   Canvas()
  },[])

  return (
    <div className={styleMain.main} id={styleMain.main}>
      <canvas id="c" className={styleMain.canvas}></canvas>
      <div className={styleMain.container_main}>
        <div className={styleMain.row}>
          <div className={styleMain.text_center}>
            <h1 id={styleMain.hello}>Hello, I am</h1>
            <h1 id={styleMain.name}>Huanliang Fan</h1>
            <h1 id={styleMain.person_description}>
              Full Stack Software Engineer.
            </h1>
          </div>
        </div>

        <div className={styleMain.text_center}>
          <div className={styleMain.banner_buttons}>
            <div className={styleMain.button_main}>
              <a className="btn btn-default btn-border" href="#about">
                Info
              </a>
            </div>

            <div className={styleMain.button_main}>
              <a className="btn btn-default btn-border" href="#projects">
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;