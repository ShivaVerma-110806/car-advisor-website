import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { label: "Discover", path: "/discover" },
  { label: "AI Advisor", path: "/advisor" },
  { label: "Compare", path: "/compare" },
  { label: "Favorites", path: "/favorites" },
];

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass border-b border-border"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-white transition-transform group-hover:scale-105">
            AI
          </div>
          <span className="text-base sm:text-lg font-semibold text-text-primary">CarGenius</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-300 ${
                location.pathname === link.path || location.pathname.startsWith(link.path + "/")
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/advisor" size="sm" className="hidden sm:inline-flex">
            Ask AI
          </Button>

          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full glass glass-hover text-text-secondary hover:text-text-primary transition-colors text-xs sm:text-sm font-medium focus:outline-none"
              >
                <div className="h-7 w-7 rounded-full bg-accent/20 text-accent-light flex items-center justify-center font-bold text-xs uppercase">
                  {user.name ? user.name[0] : <UserIcon className="h-3 w-3" />}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    {/* Backdrop to dismiss menu */}
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 glass rounded-2xl border border-white/5 py-2 shadow-2xl z-50 origin-top-right"
                    >
                      <div className="px-4 py-2 border-b border-white/5">
                        <p className="text-sm font-semibold text-text-primary truncate">{user.name}</p>
                        <p className="text-xs text-text-muted truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors mt-1"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <nav className="flex md:hidden overflow-x-auto no-scrollbar gap-1 px-4 pb-3">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              location.pathname === link.path
                ? "bg-accent/20 text-accent-light"
                : "text-text-secondary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
