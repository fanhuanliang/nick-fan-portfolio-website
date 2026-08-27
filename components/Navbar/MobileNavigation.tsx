"use client";

import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";
import NavLinks from "./NavLinks";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex min-h-[34px] w-full items-center min-[901px]:hidden" aria-label="Mobile navigation">
      {open && (
        <div className="absolute left-0 top-[38px] w-full bg-[var(--bg-nav-mobile)]">
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      )}
      <div className="absolute left-6 cursor-pointer">
        <Hamburger
          color="var(--text-inverse)"
          size={25}
          easing="ease-in"
          toggled={open}
          toggle={setOpen}
          label={open ? "Close navigation menu" : "Open navigation menu"}
        />
      </div>
    </nav>
  );
};

export default MobileNavigation;
