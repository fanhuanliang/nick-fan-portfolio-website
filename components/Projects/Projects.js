import styleProjects from "../../styles/Projects.module.css";
import Image from "next/image";

export default function Projects() {
  const projectsData = [
    {
      id: 1,
      imageLink: "../images/responsivedesign.svg",
      url: "http://www.google.com",
      appName: "test1",
      description: "this is a app",
      techStacks: ["React", "React Router", "Express", "MongoDB"],
      github: "github.com",
    },
    {
      id: 2,
      imageLink: "../images/responsivedesign.svg",
      url: "google.com",
      appName: "test2",
      description: "this is a app",
      techStacks: ["React", "React Router", "Express", "MongoDB"],
      github: "github.com",
    },
    {
      id: 3,
      imageLink: "../images/responsivedesign.svg",
      url: "google.com",
      appName: "test3",
      description: "this is a app",
      techStacks: ["React", "React Router", "Express", "MongoDB"],
      github: "github.com",
    },
  ];
  return (
    <>
      <div className={styleProjects.projects} id="projects">
        <div className="projects-header">
          <h1>Projects</h1>
        </div>

        <div className={styleProjects.project_cards_container}>
          {projectsData.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
const Project = ({ project }) => {
  console.log(project.imageLink);
  return (
    <div className={styleProjects.project_car_container}>
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
      <a href={project.url}> google</a>
      <div className="project_card">
        <h2>{project.appName}</h2>
        <div>{project.description}</div>
        <div>{project.techStacks}</div>
      </div>
      <div>
        <button>GitHub</button>
      </div>
    </div>
  );
};
