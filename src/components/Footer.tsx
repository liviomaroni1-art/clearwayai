import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Footer = () => {
  const { isAdmin } = useAuth();
  const demoNumber = "+1 (888) 778-3091";
  
  const quickLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Security", href: "/security" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];
  
  return (
    <footer className="bg-card/50 border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          
          {/* Brand & CTA Column */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">Clearway AI</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              AI-powered phone reception that captures every lead, 24/7. Swiss precision, built for US service businesses.
            </p>
            <Button variant="hero" size="sm" className="btn-glow" asChild>
              <Link to="/contact">
                Book a Demo
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 md:mb-4">Legal</h4>
            <ul className="space-y-2 md:space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 md:mb-4">Get In Touch</h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a 
                  href={`tel:${demoNumber.replace(/\s/g, '').replace(/[()]/g, '')}`}
                  className="flex items-center gap-2 text-sm md:text-base text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <Phone className="w-3 h-3 md:w-4 md:h-4" />
                  {demoNumber}
                </a>
                <p className="text-xs text-muted-foreground mt-1 ml-6">Call to experience the AI—24/7</p>
              </li>
              <li>
                <a 
                  href="mailto:hello@clearwayai.co"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-3 h-3 md:w-4 md:h-4" />
                  hello@clearwayai.co
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                🇨🇭 Freienbach, Switzerland
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-lg">🇨🇭</span>
              <span>Swiss precision. Built for US service businesses.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
