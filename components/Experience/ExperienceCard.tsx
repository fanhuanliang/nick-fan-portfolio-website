import type { Experience } from "../../lib/data";

type ExperienceCardProps = {
  item: Experience;
};

function getProjectHeadingId(title: string) {
  return `project-${title.replace(/\W+/g, "-").toLowerCase()}`;
}

const ExperienceCard = ({ item }: ExperienceCardProps) => {
  const { company, jobTitle, duration, location, descriptions, keyProjects } = item;

  return (
    <article className="relative mx-auto my-[18px] max-w-[980px] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 text-[var(--text-primary)] min-[601px]:p-[18px]">
      <h1 className="mb-[10px] mt-5 text-[1.6rem] leading-[1.1] min-[601px]:text-[2rem]">
        {company}
      </h1>
      <div className="flex flex-col gap-1 min-[601px]:flex-row min-[601px]:justify-between min-[601px]:gap-5">
        <h3 className="mb-[10px] mt-5 text-[1.2rem] leading-[1.1] min-[601px]:text-[1.4rem]">
          {jobTitle}
        </h3>
        <div className="text-left text-[0.9rem] min-[601px]:text-right min-[601px]:text-[0.95rem]">
          {duration}
          &nbsp;&nbsp;
          {location}
        </div>
      </div>
      <ul className="my-[10px] list-outside list-disc space-y-2 pl-[18px] font-[Helvetica,Arial,sans-serif] text-[0.95rem] leading-normal min-[601px]:text-base min-[601px]:leading-normal">
        {descriptions.map((description) => (
          <li key={description}>{description}</li>
        ))}
      </ul>
      {keyProjects && (
        <div className="mt-5 border-t border-[var(--border-subtle)] pt-4">
          <h3 className="mb-3 mt-0 text-[1.05rem] font-bold leading-[1.2] text-[var(--text-primary)] min-[601px]:text-[1.15rem]">
            Key Projects
          </h3>
          <div className="space-y-4">
            {keyProjects.map((project) => {
              const headingId = getProjectHeadingId(project.title);

              return (
                <section key={project.title} aria-labelledby={headingId}>
                  <h4
                    id={headingId}
                    className="mb-2 mt-0 text-[0.98rem] font-bold leading-[1.25] text-[var(--text-primary)] min-[601px]:text-[1.05rem]"
                  >
                    {project.title}
                  </h4>
                  <ul className="my-0 list-outside list-disc space-y-1.5 pl-[18px] font-[Helvetica,Arial,sans-serif] text-[0.92rem] leading-normal min-[601px]:text-[0.96rem]">
                    {project.descriptions.map((description) => (
                      <li key={description}>{description}</li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
};

export default ExperienceCard;
