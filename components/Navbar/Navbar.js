import styleNavbar from "../../styles/Navbar.module.css";
import Navigation from "./Navigation"
import MobileNavigation from "./MobileNavigation"

const Navbar = () => {

  return (
    <div className={styleNavbar.navigation}>
      <div className={styleNavbar.primary_nav}>
        <Navigation />
        <MobileNavigation />
      </div>
    </div>
  );
};

export default Navbar;
