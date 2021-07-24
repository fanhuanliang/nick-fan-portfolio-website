import Image from "next/image";
import styleProject from "../../styles/Project.module.css";
import { useState } from "react";
import Popup from "./Popup"

const Project = ({ projectData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    console.log("click", isOpen);
    setIsOpen(true);
  }

  return (
    <div className={styleProject.project_card_container} id="project">
      <Image
        className="project_card"
        height={375}
        width={600}
        src={projectData.imageLink}
        alt="image_of_project"
      />
      <div className="project_card">
        <h2>{projectData.appName}</h2>
        <div>{projectData.description}</div>
        <div>{projectData.techStacks}</div>
      </div>
      <div>
        <button onClick={openModal}>Learn more</button>
      </div>
      <Popup open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};


export default Project;