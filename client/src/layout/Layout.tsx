import { useScrollToTop } from "@/hooks/scrollToTop";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

const Layout = () => {
  useScrollToTop();
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
