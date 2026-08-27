"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Project as ProjectData } from "../../lib/data";
import PopImage from "./PopImage";
import Popup from "./Popup";

type ProjectProps = {
  projectData: ProjectData;
};

const buttonClasses =
  "m-[5px] inline-block cursor-pointer rounded-md border border-[#84bbf3] bg-[#bddbfa] bg-[linear-gradient(to_bottom,#bddbfa_5%,#80b5ea_100%)] px-6 py-1.5 font-[Arial] text-sm font-bold text-white shadow-[inset_0_1px_0_0_#dcecfb] [text-shadow:0_1px_0_#528ecc] hover:bg-[#80b5ea] hover:bg-[linear-gradient(to_bottom,#80b5ea_5%,#bddbfa_100%)] active:relative active:top-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const Project = ({ projectData }: ProjectProps) => {
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isOpenImg, setIsOpenImg] = useState(false);

  return (
    <>
      <motion.article
        className="m-[5px] flex flex-col justify-between rounded-lg bg-[var(--bg-surface)] p-3.5 text-center text-[var(--text-secondary)] shadow-[5px_5px_2px_1px_var(--shadow-color)] min-[601px]:p-4"
        id="project"
        whileHover={{ scale: 1.05 }}
      >
        <button
          type="button"
          className="relative cursor-pointer border-0 bg-transparent p-0"
          data-testid="project-image-button"
          onClick={() => setIsOpenImg(true)}
          aria-label={`Open ${projectData.appName} image preview`}
        >
          <Image
            className="h-auto max-w-full"
            height={375}
            width={600}
            sizes="(max-width: 600px) 100vw, 320px"
            src={projectData.imageLink}
            alt={`${projectData.appName} preview`}
          />
        </button>
        <div className="mb-3 flex min-h-0 flex-col justify-evenly min-[601px]:min-h-[170px]">
          <h2 className="mb-[10px] mt-5 text-[1.35rem] leading-[1.1] min-[601px]:text-[1.5rem]">
            {projectData.appName}
          </h2>
          <p className="text-[0.95rem] leading-[1.45] min-[601px]:text-base">
            {projectData.description}
          </p>
          <div className="flex flex-wrap justify-center">
            {projectData.techStacks.map((item) => (
              <span
                className="m-0.5 inline-block rounded-md border border-[#dcdcdc] bg-[#f9f9f9] bg-[linear-gradient(to_bottom,#f9f9f9_5%,#e9e9e9_100%)] px-3 py-[3px] font-[Arial] text-[13px] font-bold text-[#666666] shadow-[inset_0_1px_0_0_#ffffff] [text-shadow:0_1px_0_#ffffff]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <button className={buttonClasses} type="button" onClick={() => setIsOpenVideo(true)}>
            Video
          </button>
          <a href={projectData.github} target="_blank" rel="noopener noreferrer">
            <span className={buttonClasses}>Git</span>
          </a>
        </div>
      </motion.article>
      <PopImage
        open={isOpenImg}
        onClose={() => setIsOpenImg(false)}
        urlImg={projectData.imageLink}
      />
      <Popup
        open={isOpenVideo}
        onClose={() => setIsOpenVideo(false)}
        title={projectData.appName}
        youTubeURL={projectData.youTubeLink}
      />
    </>
  );
};

export default Project;
