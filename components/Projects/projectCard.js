import Image from "next/image";
import styleProject from "../../styles/Project.module.css";
import { useState } from "react";
import Popup from "./Popup"
import PopImage from "./PopImage"

const ProjectCard = ({ projectData }) => {
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
      <div className={styleProject.project_card}>
        <h2>{projectData.appName}</h2>
        <p className={styleProject.description}>{projectData.description}</p>
        <div className={styleProject.tech_stacks}>
          {projectData.techStacks.map((item, idx) => (
            <div className={styleProject.tech_stack} key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={styleProject.button}>
        <button onClick={openVideoModal}>Video</button>
        <a href={projectData.github} target="_blank" rel="noopener noreferrer">
          <button>Git</button>
        </a>
      </div>
      <Popup
        open={isOpenVideo}
        onClose={() => setIsOpenVideo(false)}
        title={projectData.appName}
        youTubeURL={projectData.youTubeLink}
      />
    </div>
  );
};

export default ProjectCard;