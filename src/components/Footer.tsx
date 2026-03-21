import { Link } from "react-router-dom";
import { Mail, Linkedin } from "lucide-react";
import flagCH from "@/assets/flag-ch.png";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();

  return (
    <footer className="relative bg-slate-800 text-white overflow-hidden">
      {/* Dark overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90" />

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-2xl font-bold text-white mb-4">Clearway AI</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xs">
                {t('footer.desc')}
              </p>
              <div className="flex flex-col gap-2 text-sm text-white/50">
                <a href="mailto:hello@clearwayai.co" className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@clearwayai.co
                </a>
                <span className="inline-flex items-center gap-2">
                  <img src={flagCH} alt="Swiss flag" width="16" height="12" className="h-[1em] w-auto" />
                  Freienbach, Switzerland
                </span>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
                {t('footer.socials')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/company/clearway-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-300/80 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* About / Links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
                {t('footer.about')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="text-sm text-blue-300/80 hover:text-blue-300 transition-colors">
                    {t('footer.link.contact')}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-blue-300/80 hover:text-blue-300 transition-colors">
                    {t('footer.link.terms')}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-blue-300/80 hover:text-blue-300 transition-colors">
                    {t('footer.link.privacy')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Started */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
                {t('footer.getStarted')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="text-sm text-blue-300/80 hover:text-blue-300 transition-colors">
                    {t('footer.cta')}
                  </Link>
                </li>
                <li>
                  <a href="#how-it-works" className="text-sm text-blue-300/80 hover:text-blue-300 transition-colors">
                    {t('footer.link.howItWorks')}
                  </a>
                </li>
                <li>
                  <a href="#outcomes" className="text-sm text-blue-300/80 hover:text-blue-300 transition-colors">
                    {t('footer.link.results')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-5">
            <p className="text-xs text-white/30 text-center">
              © {new Date().getFullYear()} Clearway AI. {t('footer.rights')}
              {isAdmin && (
                <Link to="/admin/leads" className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
                  Admin
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
