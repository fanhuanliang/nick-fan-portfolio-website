import styleProjects from "../../styles/Projects.module.css";
import { projectsData } from './ProjectsData'
import Project from "./Project";

export default function Projects() {
  // console.log(projectsData);
  return (
    <>
      <div className={styleProjects.projects} id="projects">
        <div className="projects-header">
          <h1>Projects</h1>
        </div>

        <div className={styleProjects.project_cards_container}>
          {projectsData.map((projectData) => (
            <Project key={projectData.id} projectData={projectData} />
          ))}
        </div>
      </div>
    </>
  );
}
