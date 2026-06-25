import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Discover", path: "/discover" },
    { label: "AI Advisor", path: "/advisor" },
    { label: "Compare", path: "/compare" },
  ],
  Company: [
    { label: "About", path: "#" },
    { label: "Blog", path: "#" },
    { label: "Contact", path: "#" },
  ],
  Legal: [
    { label: "Privacy", path: "#" },
    { label: "Terms", path: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-text-primary">CarGenius</h3>
            <p className="mt-2 text-sm text-text-secondary">The AI car decision assistant</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-text-primary mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-text-muted">© 2024 CarGenius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
