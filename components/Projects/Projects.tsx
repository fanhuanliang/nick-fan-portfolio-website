import { projectsData } from "../../lib/data";
import Project from "./Project";

export default function Projects() {
  return (
    <section
      className="min-h-screen bg-[var(--bg-band)] px-4 py-[34px] text-[var(--text-inverse)] min-[601px]:px-8 min-[601px]:py-[42px]"
      id="projects"
    >
      <h1 className="mb-[10px] mt-5 text-center font-['Source_Sans_Pro',Arial,sans-serif] text-[2rem] leading-[1.1] min-[601px]:text-[2.4rem]">
        Projects
      </h1>
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-5 pt-5 font-sans min-[601px]:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
        {projectsData.map((projectData) => (
          <Project key={projectData.id} projectData={projectData} />
        ))}
      </div>
    </section>
  );
}
