import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeToggler/theme-provider";
import { ProtectedRoute } from "./hooks/protectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { ForecastProvider } from "./hooks/useForecast";
import Layout from "./layout/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
function App() {
  return (
    <ForecastProvider>
      <AuthProvider>
        <Router>
          <ThemeProvider defaultTheme="system" storageKey="theme">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/log-in" element={<LogIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </Router>
      </AuthProvider>
    </ForecastProvider>
  );
}

export default App;
