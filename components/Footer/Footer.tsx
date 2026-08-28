import Image from "next/image";
import email from "../images/email.svg";
import github from "../images/github.svg";
import linkedIn from "../images/linkedin.svg";

const iconLinks = [
  {
    href: "https://github.com/fanhuanliang",
    label: "GitHub",
    icon: github,
  },
  {
    href: "https://www.linkedin.com/in/nick-fan/",
    label: "LinkedIn",
    icon: linkedIn,
  },
  {
    href: "mailto:nick.fan.sde@gmail.com",
    label: "Email",
    icon: email,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-page)] py-2.5 font-['Roboto',Helvetica,serif] min-[601px]:py-3">
      <div className="flex flex-col items-center justify-center">
        <div className="flex">
          {iconLinks.map((link) => (
            <a
              key={link.href}
              className="mx-[18px] inline-flex h-[34px] w-[34px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)]"
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={link.label}
            >
              <Image className="h-[34px] w-[34px]" src={link.icon} alt="" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
