import Image from "next/image";
import style from "../../styles/TechStacks.module.css";

const TechStacks = ({ logoLink }) => {
  return (
      <div className={style.logo}>
        <Image
          height={100}
          width={100}
          src={logoLink}
          alt="css"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
          }}
        />
      </div>
  );
}

export default TechStacks
