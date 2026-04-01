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
    "text-[#7E8594] hover:text-white transition-colors duration-200 text-[13px] font-medium tracking-wide";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto px-4 pt-3">
        <div
          className="container mx-auto px-5 h-14 flex items-center justify-between rounded-2xl border border-white/[0.06]"
          style={{
            background: 'rgba(9, 11, 16, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 4px 24px -1px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center flex-shrink-0"
          >
            <img
              src={logo}
              alt="Clearway AI"
              width="130"
              height="26"
              loading="eager"
              className="h-6 w-auto object-contain"
            />
          </Link>

          {/* Desktop center nav */}
          <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
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
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center gap-0.5 mr-1">
              <button
                onClick={() => setLanguage('de')}
                className={`text-[11px] px-2 py-1 rounded-lg transition-all uppercase tracking-widest font-medium ${
                  language === 'de'
                    ? 'text-white bg-white/[0.08]'
                    : 'text-[#7E8594] hover:text-white'
                }`}
                aria-label="Deutsch"
              >
                De
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`text-[11px] px-2 py-1 rounded-lg transition-all uppercase tracking-widest font-medium ${
                  language === 'en'
                    ? 'text-white bg-white/[0.08]'
                    : 'text-[#7E8594] hover:text-white'
                }`}
                aria-label="English"
              >
                En
              </button>
            </div>

            <Button variant="hero" size="sm" className="text-[13px] px-5 h-9" asChild>
              <Link to="https://funnel.clearwayai.co/">{t('hero.cta')}</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/80 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-white/[0.06] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mx-4 mt-2 rounded-2xl border border-white/[0.06] overflow-hidden"
            style={{
              background: 'rgba(9, 11, 16, 0.9)',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px -4px rgba(0,0,0,0.5)',
            }}
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.key}
                    to={link.href}
                    className="text-[#7E8594] hover:text-white transition-colors py-3 min-h-[44px] flex items-center text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                ) : (
                  <a
                    key={link.key}
                    href={link.href}
                    className="text-[#7E8594] hover:text-white transition-colors py-3 min-h-[44px] flex items-center text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(link.key)}
                  </a>
                )
              )}

              <div className="flex items-center gap-2 py-3 border-t border-white/[0.06] mt-2">
                <button
                  onClick={() => setLanguage('de')}
                  className={`text-sm px-3 py-1.5 rounded-xl transition-all uppercase tracking-wide ${
                    language === 'de'
                      ? 'bg-white/[0.08] text-white font-semibold'
                      : 'text-[#7E8594]'
                  }`}
                >
                  De
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`text-sm px-3 py-1.5 rounded-xl transition-all uppercase tracking-wide ${
                    language === 'en'
                      ? 'bg-white/[0.08] text-white font-semibold'
                      : 'text-[#7E8594]'
                  }`}
                >
                  En
                </button>
              </div>

              <Button variant="hero" size="lg" className="w-full mt-2 text-sm" asChild>
                <Link to="https://funnel.clearwayai.co/" onClick={() => setIsOpen(false)}>
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
