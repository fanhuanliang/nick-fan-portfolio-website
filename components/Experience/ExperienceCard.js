import React from 'react'
import style from "../../styles/Experience.module.css";

const ExperienceCard = ({item}) => {
  const {company, jobTitle, duration, location, descriptions } = item
  return (
    <div className={style.card}>
      <h1>{company}</h1>
      <div className={style.header}>
        <h3>{jobTitle}</h3>
        <div className={style.date}>
          {duration}
          &nbsp;&nbsp;
          {location}
        </div>
      </div>
      {descriptions.map((description, idx) => (
        <ul key={idx} className={style.lists}>
          <li>{description}</li>
        </ul>
      ))}
    </div>
  );
}

export default ExperienceCard
