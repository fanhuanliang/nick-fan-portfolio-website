import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="sticky left-0 top-0 z-[1000] w-full bg-[var(--bg-nav)] py-0.5">
      <div className="flex min-h-[34px] items-center justify-start pl-6">
        <Navigation />
        <MobileNavigation />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
