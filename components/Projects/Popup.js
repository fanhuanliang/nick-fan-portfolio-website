import React from 'react'
import style from '../../styles/Popup.module.css'

const Popup = ({open, onClose}) => {
  if (!open) return null;
  return (
    <div className={style.bottom_layer}>
          <div className={style.top_layer}>
      hello
      <button onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Popup
