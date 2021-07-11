import logoHeader from "./images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import styleHeader from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styleHeader.navigation}>
      <div className="container-fluid">
        <div className={styleHeader.row}>
          <div className={styleHeader.logo}>
            <Image src={logoHeader} alt="Here logo" />
          </div>

          <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right">
            <div className={styleHeader.primary_nav}>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header
