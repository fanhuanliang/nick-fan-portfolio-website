"use client";

import React from 'react'
import style from "../../styles/PopImage.module.css";

const PopImage = ({ open, onClose,urlImg }) => {
  // console.log(urlImg);
  if (!open) return null;
  return (
    <div className={style.bottom_layer} onClick={onClose}>
      <div
        className={style.top_layer}
        onClick={onClose}
        style={{
          background: `no-repeat center/100% url(..${urlImg})`,
        }}
      ></div>
    </div>
  );
};

export default PopImage
