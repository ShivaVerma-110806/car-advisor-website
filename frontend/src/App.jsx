import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CompareProvider } from "./context/CompareContext";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import AdvisorPage from "./pages/AdvisorPage";
import ComparePage from "./pages/ComparePage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import GuestRoute from "./components/layout/GuestRoute";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[calc(100vh-80px)] flex flex-col"
      >
        <Routes location={location}>
          {/* Guest only routes */}
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/discover" element={<ProtectedRoute><DiscoverPage /></ProtectedRoute>} />
          <Route path="/car/:id" element={<ProtectedRoute><CarDetailsPage /></ProtectedRoute>} />
          <Route path="/advisor" element={<ProtectedRoute><AdvisorPage /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><ComparePage /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

function AppContent() {
  const { loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accent" />
      </div>
    );
  }

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {!isAuthPage && <Navbar />}
      <AnimatedRoutes />
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <CompareProvider>
            <AppContent />
          </CompareProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
