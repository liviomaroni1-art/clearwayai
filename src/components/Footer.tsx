import { Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import flagCH from "@/assets/flag-ch.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Footer = () => {
  const { isAdmin } = useAuth();

  const quickLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Results", href: "#results" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-card/30 border-t border-border/30">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:grid lg:grid-cols-4 gap-8 lg:gap-8">

          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">Clearway AI</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              AI-powered outbound and follow-up systems that turn your existing leads into revenue.
            </p>
            <Button variant="hero" size="sm" className="btn-glow" asChild>
              <Link to="/contact">
                Book a Strategy Call
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>

          <div className="flex gap-12 lg:contents">
            <div>
              <h4 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center min-h-[44px] py-2">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center min-h-[44px] py-2">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-1">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center min-h-[44px] py-2">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@clearwayai.co"
                  className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] py-2"
                >
                  <Mail className="w-4 h-4" />
                  hello@clearwayai.co
                </a>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
                <img src={flagCH} alt="Swiss flag" width="16" height="12" className="h-[1em] w-auto" />
                Freienbach, Switzerland
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/20">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col items-center text-center gap-2">
            <p className="text-sm text-muted-foreground group">
              © {new Date().getFullYear()} Clearway AI. All rights reserved.
              {isAdmin && (
                <Link
                  to="/admin/leads"
                  className="ml-2 opacity-50 hover:opacity-100 transition-opacity duration-300 text-primary"
                >
                  Admin
                </Link>
              )}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <img src={flagCH} alt="Swiss flag" width="16" height="12" className="h-[1em] w-auto" />
              <span>Swiss precision. Built for B2B growth.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
