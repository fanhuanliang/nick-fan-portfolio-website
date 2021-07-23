import styleNavbar from "../../styles/Navbar.module.css";
import Navigation from "./Navigation"
import MobileNavigation from "./MobileNavigation"

const Navbar = () => {

  return (
    <div className={styleNavbar.navigation}>
      <div className="container-fluid">
        <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right">
          <div className={styleNavbar.primary_nav}>
            <Navigation />
            <MobileNavigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
