import Logo from "@/components/ui/logo";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { href: "/", name: "Home" },
    { href: "/news", name: "News" },
    { href: "/contact", name: "Contact" },
    { href: "/log-in", name: "Log in" },
  ];
  return (
    <footer className="absolute h-auto w-full border-t border-foreground/10 bg-foreground py-14 dark:bg-background">
      <div className="container relative">
        <div className="flex w-full flex-col justify-between gap-12 md:flex-row">
          <div className="flex flex-col gap-6">
            <Link to="/">
              <Logo className="w-32 text-white" />
            </Link>
            <p className="text-accent dark:text-foreground/50">
              Stay ahead of the storm with personalized weather alerts.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6 md:items-end">
            <p className="text-xl font-semibold text-background dark:text-foreground">
              Navigation
            </p>
            <ul className="flex flex-wrap justify-end gap-6 text-accent dark:text-foreground/50">
              {links.map((link) => (
                <li
                  className="hover:text-accent/90 dark:hover:text-foreground/60"
                  key={link.name}
                >
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-10 border-accent/50" />
        <div className="flex w-full flex-col justify-between gap-6 text-accent dark:text-foreground/50 md:flex-row md:gap-0">
          <p>© 2024 Weather KTEH. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Terms</Link>
            </li>
            <li>
              <Link to="/">Cookies</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
