"use client";

import { useEffect, useState } from "react";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#certificate", label: "Certificate" },
  { href: "#projects", label: "Projects" },
];

type NavLinksProps = {
  onNavigate?: () => void;
};

const linkClasses =
  "inline-flex min-h-8 items-center border-b-2 border-transparent pb-1 text-[11pt] text-[var(--text-inverse)] transition-colors duration-75 hover:border-[#f5f5f5] hover:text-[var(--text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const NavLinks = ({ onNavigate }: NavLinksProps) => {
  const [activeHref, setActiveHref] = useState("#about");

  useEffect(() => {
    const sectionIds = navLinks
      .filter((link) => !link.external)
      .map((link) => link.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveHref(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-38px 0px -55% 0px",
        threshold: [0.12, 0.28, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <ul className="m-0 flex list-none flex-col items-center gap-0 p-0 min-[901px]:flex-row">
      {navLinks.map((link) => (
        <li
          key={link.href}
          className="mx-0 cursor-pointer px-0 py-[10px] text-[var(--text-inverse)] min-[901px]:mx-[14px] min-[901px]:py-0"
        >
          <a
            className={`${linkClasses} ${
              activeHref === link.href
                ? "border-[#7facfa] text-[#7facfafa]"
                : ""
            }`}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            onClick={link.external ? undefined : onNavigate}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
