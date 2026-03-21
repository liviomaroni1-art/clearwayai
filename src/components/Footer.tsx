import { Link } from "react-router-dom";
import { Mail, ArrowRight, Linkedin } from "lucide-react";
import flagCH from "@/assets/flag-ch.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('footer.link.howItWorks'), href: "#how-it-works" },
    { label: t('footer.link.results'), href: "#outcomes" },
    { label: t('footer.link.contact'), href: "/contact" },
  ];

  const legalLinks = [
    { label: t('footer.link.privacy'), href: "/privacy" },
    { label: t('footer.link.terms'), href: "/terms" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:grid lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display text-xl font-bold mb-3">Clearway AI</h3>
            <p className="text-sm text-background/60 mb-6 leading-relaxed">
              {t('footer.desc')}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-background/20 text-background hover:bg-background/10 rounded-full"
              asChild
            >
              <Link to="/contact">
                {t('footer.cta')}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>

          <div className="flex gap-12 lg:contents">
            <div>
              <h4 className="text-xs font-display font-semibold uppercase tracking-wider mb-4 text-background/50">
                {t('footer.links')}
              </h4>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center min-h-[44px] py-2"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center min-h-[44px] py-2"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-display font-semibold uppercase tracking-wider mb-4 text-background/50">
                {t('footer.legal')}
              </h4>
              <ul className="space-y-1">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center min-h-[44px] py-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-display font-semibold uppercase tracking-wider mb-4 text-background/50">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@clearwayai.co"
                  className="flex items-center justify-center lg:justify-start gap-2 text-sm text-background/60 hover:text-background transition-colors min-h-[44px] py-2"
                >
                  <Mail className="w-4 h-4" />
                  hello@clearwayai.co
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/clearway-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center lg:justify-start gap-2 text-sm text-background/60 hover:text-background transition-colors min-h-[44px] py-2"
                >
                  <Linkedin className="w-4 h-4" />
                  {t('footer.link.linkedin')}
                </a>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2 text-sm text-background/60">
                <img src={flagCH} alt="Swiss flag" width="16" height="12" className="h-[1em] w-auto" />
                Freienbach, Switzerland
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container mx-auto px-6 py-5">
          <p className="text-xs text-background/40 text-center group">
            © {new Date().getFullYear()} Clearway AI. {t('footer.rights')}
            {isAdmin && (
              <Link to="/admin/leads" className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
                Admin
              </Link>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
