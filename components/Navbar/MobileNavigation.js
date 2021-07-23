import NavLinks from "./NavLinks";
import styleNavbar from "../../styles/Navbar.module.css";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react"

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styleNavbar.MobileNavigation}>
      {open && <NavLinks />}
      <div>
        <Hamburger
          color="#ffff"
          size={25}
          easing="ease-in"
          onToggle={(toggled) => {
            setOpen(!open);
          }}
        />
      </div>
    </nav>
  );
};

export default MobileNavigation;
