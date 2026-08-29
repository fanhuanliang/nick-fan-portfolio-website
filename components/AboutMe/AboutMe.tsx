import Image from "next/image";
import TechStacks from "./TechStacks";
import { logo } from "../../lib/data";

export default function AboutMe() {
  return (
    <div
      className="min-h-screen bg-[var(--bg-band)] bg-fixed bg-center bg-no-repeat py-[2%] text-[var(--text-inverse)]"
      id="about"
    >
      <div className="mx-auto flex max-w-[1040px] flex-col items-center min-[601px]:flex-row min-[601px]:items-stretch">
        <div className="relative mx-auto mt-8 h-[120px] w-[120px] flex-[0_0_120px] overflow-hidden rounded-full min-[601px]:m-[34px] min-[601px]:h-[150px] min-[601px]:w-[150px] min-[601px]:flex-[0_0_150px]">
          <Image
            src="/images/IMG_7527.JPG"
            alt="Nick Fan"
            fill
            sizes="(max-width: 600px) 120px, 150px"
            className="object-cover"
            style={{ objectPosition: "50% 75%"}}
          />
        </div>
        <div className="mx-0 my-4 px-[15px] min-[601px]:mx-auto min-[601px]:my-[34px]">
          <h1 className="mb-[10px] mt-5 p-[10px] text-left font-[Verdana,'Slabo',Helvetica,serif] text-[1.8rem] font-bold italic leading-[1.1] min-[601px]:text-[2.6rem]">
            About Me
          </h1>
          <p className="w-full px-5 py-5 font-['Comic_Sans_MS',Verdana,Arial,Tahoma,serif] text-[1.05rem] leading-[1.55em] min-[601px]:pr-[120px] min-[601px]:pt-4 min-[601px]:text-[1.25rem]">
            I&apos;m a full-stack software engineer with experience building and
            modernizing enterprise applications using React, TypeScript, C#,
            .NET, REST APIs, and SQL. I enjoy solving complex problems,
            building reliable software, and continuously improving how
            applications are designed and delivered.
            <br />
            I&apos;m passionate about technology and enjoy exploring new tools,
            frameworks, and emerging areas such as AI and machine learning.
            I&apos;m always looking for opportunities to learn, experiment, and
            apply new ideas to real-world software development.
            <br />
            Outside of coding, I enjoy running, swimming, cycling, playing
            guitar and drums, and working out.
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1040px] flex-col content-center justify-center text-center">
        <h1 className="mb-[10px] mt-5 pb-3 text-[2.2rem] leading-[1.1]">
          Technologies
        </h1>
        <div className="mx-[60px] my-5 flex flex-row flex-wrap content-center justify-center text-center">
          {logo.map((item) => (
            <TechStacks key={item.id} tech={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
