import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeToggler/theme-provider";
import { ForecastProvider } from "./hooks/useForecast";
import Layout from "./layout/Layout";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import Post from "./pages/news/Post";
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <ForecastProvider>
      <Router>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/log-in" element={<LogIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<Post />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </ForecastProvider>
  );
}

export default App;
