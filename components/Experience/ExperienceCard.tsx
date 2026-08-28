import type { Experience } from "../../lib/data";

type ExperienceCardProps = {
  item: Experience;
};

const ExperienceCard = ({ item }: ExperienceCardProps) => {
  const { company, jobTitle, duration, location, descriptions } = item;

  return (
    <article className="relative mx-auto my-[18px] max-w-[980px] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 text-[var(--text-primary)] min-[601px]:p-[18px]">
      <div className="absolute -left-[31px] top-7 hidden h-4 w-4 rounded-full border-2 border-[var(--text-inverse)] bg-[#7facfafa] min-[901px]:block" />
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
    </article>
  );
};

export default ExperienceCard;
