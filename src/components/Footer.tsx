import { Link } from "react-router-dom";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import flagCH from "@/assets/flag-ch.png";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();

  const linkClass = "text-sm hover:text-white transition-colors duration-200 flex items-center gap-1.5";

  return (
    <footer className="relative overflow-hidden" style={{ background: 'hsl(228 14% 4%)' }}>
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(225 14% 14%), transparent)' }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-[20%] w-[600px] h-[300px] rounded-full blur-[180px]" style={{ background: 'hsl(224 76% 58% / 0.04)' }} />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-lg text-white mb-3 tracking-tight">Clearway AI</h3>
              <p className="text-sm leading-[1.7] mb-6 max-w-xs" style={{ color: '#7E8594' }}>
                {t('footer.tagline')}
              </p>
              <div className="flex flex-col gap-3 text-sm" style={{ color: '#7E8594' }}>
                <a
                  href="mailto:hello@clearwayai.co"
                  className="hover:text-white transition-colors inline-flex items-center gap-2.5"
                >
                  <div className="p-1.5 rounded-lg" style={{ background: 'hsl(225 18% 8%)' }}>
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  hello@clearwayai.co
                </a>
                <span className="inline-flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg" style={{ background: 'hsl(225 18% 8%)' }}>
                    <img
                      src={flagCH}
                      alt="Swiss flag"
                      width="14"
                      height="10"
                      className="h-3.5 w-3.5 object-contain"
                    />
                  </div>
                  Freienbach, Switzerland
                </span>
                <a
                  href="https://www.linkedin.com/company/clearway-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4B7BF5] transition-colors inline-flex items-center gap-2.5"
                >
                  <div className="p-1.5 rounded-lg" style={{ background: 'hsl(225 18% 8%)' }}>
                    <Linkedin className="w-3.5 h-3.5" />
                  </div>
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 text-white/40">
                {t('footer.product')}
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <a href="#features" className={linkClass} style={{ color: '#7E8594' }}>
                    {t('nav.product')}
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className={linkClass} style={{ color: '#7E8594' }}>
                    {t('footer.link.howItWorks')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 text-white/40">
                {t('footer.company')}
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/contact" className={linkClass} style={{ color: '#7E8594' }}>
                    {t('footer.link.contact')}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className={linkClass} style={{ color: '#7E8594' }}>
                    {t('footer.link.privacy')}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className={linkClass} style={{ color: '#7E8594' }}>
                    {t('footer.link.terms')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 text-white/40">
                {t('footer.contact')}
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link
                    to="/contact"
                    className="text-sm font-medium text-[#4B7BF5] hover:text-[#7C3AED] transition-colors flex items-center gap-1.5"
                  >
                    {t('footer.cta')}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@clearwayai.co"
                    className={linkClass}
                    style={{ color: '#7E8594' }}
                  >
                    hello@clearwayai.co
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04]">
          <div className="container mx-auto px-6 py-5">
            <p className="text-xs text-center" style={{ color: '#7E8594' }}>
              © 2026 Clearway AI GmbH, Freienbach, Switzerland. {t('footer.rights')}
              {isAdmin && (
                <Link to="/admin/leads" className="ml-3 opacity-30 hover:opacity-60 transition-opacity">
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
