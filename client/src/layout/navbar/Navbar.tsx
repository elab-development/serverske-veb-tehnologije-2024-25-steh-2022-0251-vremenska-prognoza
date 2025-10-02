import { ThemeToggler } from "@/components/ThemeToggler/Toggler";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import ResponsiveNavbar from "./ResponsiveNavbar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: "/", name: "Home" },
    { href: "/news", name: "News" },
    { href: "/contact", name: "Contact" },
    { href: "/log-in", name: "Log in" },
  ];
  return (
    <nav className="fixed top-0 z-[1] mx-auto flex h-20 w-full items-center justify-between border-b border-foreground/10 bg-background/70 backdrop-blur-lg">
      <div className="container mx-auto flex w-full justify-between">
        <Link
          onClick={() => setIsOpen(false)}
          className="flex items-center"
          to="/"
        >
          <Logo className="text-foreground dark:text-white" />
        </Link>
        <ul className="hidden items-center justify-end gap-8 md:flex">
          {links.map(({ href, name }) =>
            name === "Log in" ? (
              <li key={`${name}`}>
                <Button size="lg" asChild>
                  <Link to={href}>{name}</Link>
                </Button>
              </li>
            ) : (
              <li key={`${name}`}>
                <Link to={href}>{name}</Link>
              </li>
            ),
          )}
          <ThemeToggler />
        </ul>
        <div className="md:hidden">
          <div className="flex items-center gap-2">
            <ThemeToggler />
            <Button
              className="px-0 hover:bg-transparent"
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <Cross2Icon width={32} height={32} />
              ) : (
                <HamburgerMenuIcon width={32} height={32} />
              )}
            </Button>
          </div>
          <ResponsiveNavbar
            links={links}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
