import style from "../../styles/Notice.module.css"

const Notice = ({ open, onClose, notification}) => {
  if (!open) return null;
  return (
    <section className={style.bottom_layer} onClick={onClose}>
      <div className={style.top_layer} onClick={onClose}>
        <h1 onClick={onClose}>{notification}</h1>
      </div>
    </section>
  );
};

export default Notice