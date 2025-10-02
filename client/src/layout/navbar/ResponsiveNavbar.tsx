import { Link } from "react-router-dom";

interface Link {
  name: string;
  href: string;
}

interface Props {
  links: Link[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ResponsiveNavbar: React.FC<Props> = ({ links, isOpen, setIsOpen }) => {
  if (!isOpen) {
    document.body.style.overflow = "auto";
    return null;
  }
  document.body.style.overflow = "hidden";
  return (
    <div className="container fixed left-0 top-20 z-[1] mx-auto flex h-[100dvh] w-[100vw] bg-background md:hidden">
      <ul className="mt-20 flex w-full flex-col gap-2">
        {links.map((link) => (
          <li className="flex w-full" key={link.name}>
            <Link
              onClick={() => setIsOpen(false)}
              className="text-textColor flex w-full items-center gap-2 py-4 text-2xl"
              to={link.href}
            >
              <span className="underline">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsiveNavbar;
