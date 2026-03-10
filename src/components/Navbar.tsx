import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

import logo from "@/assets/clearway-logo-new.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: "How It Works", href: isHomePage ? "#how-it-works" : "/#how-it-works" },
    { name: "Who It's For", href: isHomePage ? "#who-its-for" : "/#who-its-for" },
    { name: "Outcomes", href: isHomePage ? "#outcomes" : "/#outcomes" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Clearway AI"
              width="120"
              height="24"
              loading="eager"
              className="h-6 md:h-6 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          <button
            className="md:hidden text-foreground p-3 min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/clearway-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <Button variant="hero" size="default" asChild>
              <Link to="/contact">Book a Demo</Link>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  link.href.startsWith('/') ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 min-h-[48px] flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 min-h-[48px] flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  )
                ))}
                <a
                  href="https://www.linkedin.com/company/clearway-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 min-h-[48px] flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
                <Button variant="hero" size="default" className="w-full" asChild>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Book a Demo
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
