import NavLinks from "./NavLinks"
import styleNavbar from "../../styles/Navbar.module.css";

const Navigation = () => {
  return (
    <nav className={styleNavbar.Navigation}>
      <NavLinks />
    </nav>
  );
}

export default Navigation
