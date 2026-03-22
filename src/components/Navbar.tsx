import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/clearway-logo-new.png";
import { useLanguage } from "@/lib/i18n";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { key: 'nav.product', href: isHomePage ? "#features" : "/#features" },
    { key: 'nav.solutions', href: isHomePage ? "#who-its-for" : "/#who-its-for" },
    { key: 'nav.howItWorks', href: isHomePage ? "#how-it-works" : "/#how-it-works" },
    { key: 'faq.title', href: isHomePage ? "#faq" : "/#faq" },
    { key: 'nav.contact', href: '/contact', isRoute: true },
  ];

  const linkClass =
    "text-[#8B8BA3] hover:text-[#F1F1F5] transition-colors duration-200 text-sm font-medium";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#1E1E2E]"
      style={{ background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center flex-shrink-0"
        >
          <img
            src={logo}
            alt="Clearway AI"
            width="140"
            height="28"
            loading="eager"
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop center nav */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link key={link.key} to={link.href} className={linkClass}>
                {t(link.key)}
              </Link>
            ) : (
              <a key={link.key} href={link.href} className={linkClass}>
                {t(link.key)}
              </a>
            )
          )}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('de')}
              className={`text-xs px-2 py-1 rounded transition-colors uppercase tracking-wide ${
                language === 'de'
                  ? 'text-white font-bold'
                  : 'text-[#8B8BA3] hover:text-[#F1F1F5]'
              }`}
              aria-label="Deutsch"
            >
              De
            </button>
            <span className="text-[#1E1E2E]">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`text-xs px-2 py-1 rounded transition-colors uppercase tracking-wide ${
                language === 'en'
                  ? 'text-white font-bold'
                  : 'text-[#8B8BA3] hover:text-[#F1F1F5]'
              }`}
              aria-label="English"
            >
              En
            </button>
          </div>

          <Button variant="hero" size="default" className="text-sm px-5 rounded-lg" asChild>
            <Link to="/contact">{t('hero.cta')}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-3 min-w-[48px] min-h-[48px] flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-t border-[#1E1E2E]"
            style={{ background: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(12px)' }}
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.key}
                    to={link.href}
                    className="text-[#8B8BA3] hover:text-[#F1F1F5] transition-colors py-3 min-h-[48px] flex items-center text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                ) : (
                  <a
                    key={link.key}
                    href={link.href}
                    className="text-[#8B8BA3] hover:text-[#F1F1F5] transition-colors py-3 min-h-[48px] flex items-center text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(link.key)}
                  </a>
                )
              )}

              <div className="flex items-center gap-3 py-3 border-t border-[#1E1E2E] mt-2">
                <button
                  onClick={() => setLanguage('de')}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-colors uppercase tracking-wide ${
                    language === 'de'
                      ? 'border-[#4F6EF7]/40 bg-[#4F6EF7]/10 text-white font-semibold'
                      : 'border-[#1E1E2E] text-[#8B8BA3]'
                  }`}
                >
                  De
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-colors uppercase tracking-wide ${
                    language === 'en'
                      ? 'border-[#4F6EF7]/40 bg-[#4F6EF7]/10 text-white font-semibold'
                      : 'border-[#1E1E2E] text-[#8B8BA3]'
                  }`}
                >
                  En
                </button>
              </div>

              <Button variant="hero" size="lg" className="w-full mt-2 text-sm" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  {t('hero.cta')}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
