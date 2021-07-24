import Image from "next/image";
import styleProject from "../../styles/Project.module.css";
import { useState } from "react";
import Popup from "./Popup"
import PopImage from "./PopImage"

const Project = ({ projectData }) => {
  // console.log(projectData);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isOpenImg, setIsOpenImg] = useState(false);
  const openImgModal = () => {
    setIsOpenImg(true);    
  }
  const openVideoModal = () => {
    setIsOpenVideo(true);
  }

  return (
    <div className={styleProject.project_card_container} id="project">
      <div className={styleProject.project_image}>
        <Image
          className="project_card"
          style={{ cursor: "pointer" }}
          height={375}
          width={600}
          src={projectData.imageLink}
          alt="image_of_project"
          onClick={openImgModal}
        />
      </div>
      <PopImage
        open={isOpenImg}
        onClose={() => setIsOpenImg(false)}
        urlImg={projectData.imageLink}
      />
      <div className="project_card">
        <h2>{projectData.appName}</h2>
        <div>{projectData.description}</div>
        <div>{projectData.techStacks}</div>
      </div>
      <div>
        <button onClick={openVideoModal}>Learn more</button>
      </div>
      <Popup open={isOpenVideo} onClose={() => setIsOpenVideo(false)} />
    </div>
  );
};


export default Project;