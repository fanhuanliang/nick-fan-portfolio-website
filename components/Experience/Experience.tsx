import { experienceData } from "../../lib/data";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  return (
    <section
      className="min-h-screen bg-[var(--bg-band)] px-4 py-[34px] text-[var(--text-inverse)] min-[601px]:px-9 min-[601px]:py-[42px]"
      id="experience"
    >
      <h1 className="mb-[10px] mt-5 text-center text-[2rem] leading-[1.1] min-[601px]:text-[2.4rem]">
        Work Experience
      </h1>
      <div className="relative mx-auto max-w-[1160px] min-[901px]:pl-10 before:absolute before:left-4 before:top-[18px] before:hidden before:h-[calc(100%-36px)] before:w-px before:bg-[var(--border-subtle)] min-[901px]:before:block">
        {experienceData.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
