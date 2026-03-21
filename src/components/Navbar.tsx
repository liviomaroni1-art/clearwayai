import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin } from "lucide-react";
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center"
          >
            <img src={logo} alt="Clearway AI" width="140" height="28" loading="eager" className="h-7 md:h-7 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link key={link.name} to={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium">{link.name}</Link>
              ) : (
                <a key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium">{link.name}</a>
              )
            ))}
          </div>

          <button className="md:hidden text-foreground p-3 min-w-[48px] min-h-[48px] flex items-center justify-center" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 border border-border rounded-full px-2 py-1">
              <button onClick={() => setLanguage('de')} className={`text-xs px-2 py-0.5 rounded-full transition-colors ${language === 'de' ? 'bg-foreground text-background font-semibold' : 'text-muted-foreground hover:text-foreground'}`} aria-label="Deutsch">DE</button>
              <button onClick={() => setLanguage('en')} className={`text-xs px-2 py-0.5 rounded-full transition-colors ${language === 'en' ? 'bg-foreground text-background font-semibold' : 'text-muted-foreground hover:text-foreground'}`} aria-label="English">EN</button>
            </div>
            <a href="https://www.linkedin.com/company/clearway-ai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2"><Linkedin className="w-4 h-4" /></a>
            <Button variant="outline" size="default" asChild>
              <Link to="/contact">{t('nav.contact')}</Link>
            </Button>
            <Button variant="hero" size="default" asChild>
              <Link to="/contact">{t('nav.bookACall')}</Link>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="md:hidden mt-4 pb-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  link.href.startsWith('/') ? (
                    <Link key={link.name} to={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 min-h-[48px] flex items-center font-medium" onClick={() => setIsOpen(false)}>{link.name}</Link>
                  ) : (
                    <a key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 min-h-[48px] flex items-center font-medium" onClick={() => setIsOpen(false)}>{link.name}</a>
                  )
                ))}
                <a href="https://www.linkedin.com/company/clearway-ai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 min-h-[48px] flex items-center gap-2" onClick={() => setIsOpen(false)}><Linkedin className="w-4 h-4" />LinkedIn</a>
                <div className="flex items-center gap-2 py-2">
                  <button onClick={() => setLanguage('de')} className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${language === 'de' ? 'border-foreground bg-foreground text-background font-semibold' : 'border-border text-muted-foreground'}`}>DE</button>
                  <button onClick={() => setLanguage('en')} className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${language === 'en' ? 'border-foreground bg-foreground text-background font-semibold' : 'border-border text-muted-foreground'}`}>EN</button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="default" className="flex-1" asChild><Link to="/contact" onClick={() => setIsOpen(false)}>{t('nav.contact')}</Link></Button>
                  <Button variant="hero" size="default" className="flex-1" asChild><Link to="/contact" onClick={() => setIsOpen(false)}>{t('nav.bookACall')}</Link></Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
