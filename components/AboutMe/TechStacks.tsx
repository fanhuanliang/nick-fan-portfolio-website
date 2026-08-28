import Image from "next/image";
import type { TechLogo } from "../../lib/data";

type TechStacksProps = {
  tech: TechLogo;
};

const TechStacks = ({ tech }: TechStacksProps) => {
  return (
    <div className="group relative p-5">
      <Image
        height={100}
        width={100}
        src={tech.link}
        alt={tech.label}
        title={tech.label}
        className="h-[100px] w-[100px] object-contain"
      />
      <span className="pointer-events-none absolute left-1/2 top-full z-10 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--bg-surface)] px-2 py-1 text-sm text-[var(--text-primary)] opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        {tech.label}
      </span>
    </div>
  );
};

export default TechStacks;
