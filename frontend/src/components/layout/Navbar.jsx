import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Button from "../ui/Button";

const navLinks = [
  { label: "Discover", path: "/discover" },
  { label: "AI Advisor", path: "/advisor" },
  { label: "Compare", path: "/compare" },
  { label: "Favorites", path: "/favorites" },
];

export default function Navbar() {
  const location = useLocation();

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
          <span className="text-lg font-semibold text-text-primary">CarGenius</span>
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
          <button className="flex h-10 w-10 items-center justify-center rounded-full glass glass-hover text-text-secondary hover:text-text-primary transition-colors">
            <User className="h-5 w-5" />
          </button>
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
