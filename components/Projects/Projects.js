import styleProjects from "../../styles/Projects.module.css";
import Image from "next/image";
import { projectsData } from './ProjectsData'
export default function Projects() {
  
  console.log(projectsData)
  return (
    <>
      <div className={styleProjects.projects} id="projects">
        <div className="projects-header">
          <h1>Projects</h1>
        </div>

        <div className={styleProjects.project_cards_container}>
          {projectsData.map((projectsData) => (
            <Project key={projectsData.id} projectsData={projectsData} />
          ))}
        </div>
      </div>
    </>
  );
}

const Project = ({ projectsData }) => {
  console.log(projectsData.imageLink);
  return (
    <div className={styleProjects.project_car_container} id="projects">
      {/* <Image
        className="project_card"
        layout="fill"
        style={{
          width: "20px",
          height: "20px",
          maxHeight: "20px",
          maxWidth: "20px",
        }}
        src={project.imageLink}
        alt="image_of_project"
      /> */}
      <a href={projectsData.url}> google</a>
      <div className="project_card">
        <h2>{projectsData.appName}</h2>
        <div>{projectsData.description}</div>
        <div>{projectsData.techStacks}</div>
      </div>
      <div>
        <button>GitHub</button>
      </div>
    </div>
  );
};
