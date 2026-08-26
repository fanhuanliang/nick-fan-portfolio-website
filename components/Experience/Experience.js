import React from 'react'
import {experienceData} from '../../lib/data'
import ExperienceCard  from './ExperienceCard'
import style from '../../styles/Experience.module.css'

const Experience = () => {
  return (
    <div className={style.container} id="experience">
      <h1 className={style.title}>Work Experience</h1>
      {experienceData.map((item) => (
        <ExperienceCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Experience
