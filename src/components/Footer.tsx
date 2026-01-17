import { Linkedin, Mail, MapPin, Phone, Shield, Globe } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Clearway AI" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Your AI automation partner for Swiss clinics and law firms. 
              We ensure you never miss an opportunity.
            </p>
            <div className="flex items-center gap-4 mb-4">
              <a 
                href="https://linkedin.com/company/clearwayai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:sales@clearwayai.co" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">GDPR</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 border border-primary/30 rounded text-xs">
                <span>🇨🇭</span>
                <span className="text-primary">Swiss Made</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 border border-primary/30 rounded text-xs">
                <Globe className="w-3 h-3 text-primary" />
                <span className="text-primary">30+ Languages</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#services" className="hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#calculator" className="hover:text-foreground transition-colors">
                ROI Calculator
              </a>
              <a href="#pricing" className="hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#faq" className="hover:text-foreground transition-colors">
                FAQ
              </a>
            </div>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a 
                href="mailto:sales@clearwayai.co" 
                className="hover:text-foreground transition-colors"
              >
                sales@clearwayai.co
              </a>
              <a 
                href={`tel:${demoNumber.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{demoNumber}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Freienbach SZ, Switzerland 🇨🇭</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Clearway AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <span className="text-xs">🇨🇭 Made in Switzerland</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
