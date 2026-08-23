"use client";

import { useState } from 'react'
import style from '../../styles/Popup.module.css'
import ReactPlayer from "react-player";
import { X } from "lucide-react";

const Popup = ({open, onClose, title, youTubeURL}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  if (!open) return null;
  return (
    <div className={style.bottom_layer}>
      <div className={style.top_layer}>
        <span onClick={onClose} className={style.close_button}>
          <X size={32} />
        </span>
        <h2>{title}</h2>
        <div className={style.player}>
          <ReactPlayer
            width="100%"
            height="100%"
            url={youTubeURL}
            playing={isPlaying}
          />
        </div>
      </div>
    </div>
  );
}

export default Popup
