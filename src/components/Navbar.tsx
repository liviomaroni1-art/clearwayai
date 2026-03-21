import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
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
    { name: t('nav.howItWorks'), href: isHomePage ? "#how-it-works" : "/#how-it-works" },
    { name: t('nav.whoItsFor'), href: isHomePage ? "#who-its-for" : "/#who-its-for" },
    { name: t('nav.results'), href: isHomePage ? "#outcomes" : "/#outcomes" },
  ];

  const linkClass = "text-foreground/70 hover:text-foreground transition-colors duration-200 text-xs font-semibold uppercase tracking-widest";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center"
        >
          <img src={logo} alt="Clearway AI" width="140" height="28" loading="eager" className="h-7 w-auto object-contain" />
        </Link>

        {/* Desktop nav - right-aligned like Assembly */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.name} to={link.href} className={linkClass}>{link.name}</Link>
            ) : (
              <a key={link.name} href={link.href} className={linkClass}>{link.name}</a>
            )
          ))}

          <a href={`tel:${t('nav.phone').replace(/\s/g, '')}`} className="text-foreground/50 hover:text-foreground transition-colors inline-flex items-center gap-1.5 text-xs">
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t('nav.phone')}</span>
          </a>

          <div className="flex items-center gap-1 ml-2">
            <button onClick={() => setLanguage('de')} className={`text-xs px-2 py-1 rounded transition-colors uppercase tracking-wide ${language === 'de' ? 'text-foreground font-bold' : 'text-foreground/40 hover:text-foreground/70'}`} aria-label="Deutsch">De</button>
            <span className="text-foreground/20">|</span>
            <button onClick={() => setLanguage('en')} className={`text-xs px-2 py-1 rounded transition-colors uppercase tracking-wide ${language === 'en' ? 'text-foreground font-bold' : 'text-foreground/40 hover:text-foreground/70'}`} aria-label="English">En</button>
          </div>

          <Button variant="hero" size="default" className="uppercase tracking-widest text-xs px-6" asChild>
            <Link to="/contact">{t('nav.bookACall')}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-foreground p-3 min-w-[48px] min-h-[48px] flex items-center justify-center" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="md:hidden border-t border-border">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link key={link.name} to={link.href} className="text-foreground/70 hover:text-foreground transition-colors py-3 min-h-[48px] flex items-center text-sm font-semibold uppercase tracking-widest" onClick={() => setIsOpen(false)}>{link.name}</Link>
                ) : (
                  <a key={link.name} href={link.href} className="text-foreground/70 hover:text-foreground transition-colors py-3 min-h-[48px] flex items-center text-sm font-semibold uppercase tracking-widest" onClick={() => setIsOpen(false)}>{link.name}</a>
                )
              ))}
              <div className="flex items-center gap-3 py-3">
                <button onClick={() => setLanguage('de')} className={`text-sm px-3 py-1.5 rounded-full border transition-colors uppercase tracking-wide ${language === 'de' ? 'border-foreground bg-foreground text-background font-semibold' : 'border-border text-muted-foreground'}`}>De</button>
                <button onClick={() => setLanguage('en')} className={`text-sm px-3 py-1.5 rounded-full border transition-colors uppercase tracking-wide ${language === 'en' ? 'border-foreground bg-foreground text-background font-semibold' : 'border-border text-muted-foreground'}`}>En</button>
              </div>
              <Button variant="hero" size="lg" className="w-full mt-2 uppercase tracking-widest text-sm" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>{t('nav.bookACall')}</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
