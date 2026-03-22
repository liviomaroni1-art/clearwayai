import { Link } from "react-router-dom";
import { Mail, Linkedin } from "lucide-react";
import flagCH from "@/assets/flag-ch.png";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();

  return (
    <footer className="relative bg-black/50 border-t border-white/8 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-xl text-white mb-3">Clearway AI</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-xs">
                {t('footer.tagline')}
              </p>
              <div className="flex flex-col gap-2.5 text-sm text-zinc-500">
                <a
                  href="mailto:hello@clearwayai.co"
                  className="hover:text-zinc-300 transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  hello@clearwayai.co
                </a>
                <span className="inline-flex items-center gap-2">
                  <img
                    src={flagCH}
                    alt="Swiss flag"
                    width="16"
                    height="12"
                    className="h-[1em] w-auto flex-shrink-0"
                  />
                  Freienbach, Switzerland
                </span>
                <a
                  href="https://www.linkedin.com/company/clearway-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-2 mt-1"
                >
                  <Linkedin className="w-4 h-4 flex-shrink-0" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 mb-5">
                {t('footer.product')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    {t('nav.product')}
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    {t('footer.link.howItWorks')}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    {t('nav.pricing')}
                  </a>
                </li>
                <li>
                  <a href="#outcomes" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    {t('footer.link.results')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 mb-5">
                {t('footer.company')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    {t('footer.link.contact')}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    {t('footer.link.privacy')}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    {t('footer.link.terms')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 mb-5">
                {t('footer.contact')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    {t('footer.cta')}
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@clearwayai.co"
                    className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    hello@clearwayai.co
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8">
          <div className="container mx-auto px-6 py-5">
            <p className="text-xs text-zinc-700 text-center">
              © 2026 Clearway AI GmbH, Freienbach, Switzerland. {t('footer.rights')}
              {isAdmin && (
                <Link to="/admin/leads" className="ml-3 opacity-40 hover:opacity-80 transition-opacity">
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
