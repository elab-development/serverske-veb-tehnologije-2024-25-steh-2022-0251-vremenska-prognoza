import { ThemeToggler } from "@/components/ThemeToggler/Toggler";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/ui/logo";
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/hooks/useAuth";
import { User } from "@/lib/types";
import { ToastClass } from "@/models/toast-class";
import {
  Cross2Icon,
  HamburgerMenuIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveNavbar from "./ResponsiveNavbar";

const Navbar = ({ user }: { user: User | null; isLoading: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthContext();
  const navigator = useNavigate();

  const baseLinks = [
    { href: "/", name: "Home" },
    ...(user ? [{ href: "/news", name: "News" }] : []),
    { href: "/contact", name: "Contact" },
  ];

  const authLinks = user ? [] : [{ href: "/log-in", name: "Log in" }];

  const links = [...baseLinks, ...authLinks];

  const handleSignOut = async () => {
    try {
      await logout();
      navigator("/log-in");
      setIsOpen(false);
    } catch (error) {
      toast(
        ToastClass.create()
          .setTitle("Error")
          .setDescription("There was an error signing out. Please try again.")
          .setVariant("destructive"),
      );
    }
  };

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
          {links.map(({ href, name }) => (
            <li key={name}>
              {name === "Log in" ? (
                <Button size="lg" asChild>
                  <Link to={href}>{name}</Link>
                </Button>
              ) : (
                <Link to={href}>{name}</Link>
              )}
            </li>
          ))}{" "}
          <div className="-mr-4">
            <ThemeToggler />
          </div>
          {user && (
            <li className="flex items-center gap-4">
              {" "}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <PersonIcon width={18} height={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.role === "admin" && (
                    <DropdownMenuItem
                      onClick={() => {
                        navigator("/admin");
                        setIsOpen(false);
                      }}
                    >
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )}
        </ul>

        <div className="md:hidden">
          <div className="flex items-center gap-2">
            <ThemeToggler />
            {user && (
              <li className="flex items-center gap-4">
                {" "}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <PersonIcon width={18} height={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user.role === "admin" && (
                      <DropdownMenuItem
                        onClick={() => {
                          navigator("/admin");
                          setIsOpen(false);
                        }}
                      >
                        Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
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
