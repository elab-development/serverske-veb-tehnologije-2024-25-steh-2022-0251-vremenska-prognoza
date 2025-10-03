import { useScrollToTop } from "@/hooks/scrollToTop";
import { useAuthContext } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

const Layout = () => {
  const { user, isLoading } = useAuthContext();
  useScrollToTop();
  return (
    <div>
      <Navbar user={user} isLoading={isLoading} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
