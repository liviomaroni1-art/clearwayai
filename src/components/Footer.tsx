import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, ArrowRight, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  const quickLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security", href: "/security" },
  ];

  const services = [
    { label: "AI Receptionist", href: "#services" },
    { label: "Email Automation", href: "#services" },
    { label: "Chat Support", href: "#services" },
    { label: "Custom Integrations", href: "#services" },
  ];
  
  return (
    <footer className="bg-[#060608] border-t border-white/5">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & CTA Column */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-100 mb-4">Clearway AI</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI-powered automation that captures every lead, 24/7. Swiss precision, built for ambitious businesses worldwide.
            </p>
            <Button variant="hero" size="default" className="btn-glow" asChild>
              <Link to="/contact">
                Get Your Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            
            {/* Trust badges */}
            <div className="flex items-center gap-4 mt-6 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>HIPAA Ready</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-gray-400 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a href={service.href} className="text-gray-400 hover:text-primary transition-colors">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`tel:${demoNumber.replace(/\s/g, '').replace(/[()]/g, '')}`}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {demoNumber}
                </a>
                <p className="text-xs text-gray-500 mt-1 ml-6">Try our AI live—24/7</p>
              </li>
              <li>
                <a 
                  href="mailto:sales@clearwayai.co"
                  className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  sales@clearwayai.co
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                Freienbach, Switzerland
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a 
                href="mailto:sales@clearwayai.co" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href={`tel:${demoNumber.replace(/\s/g, '').replace(/[()]/g, '')}`}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 group">
              © {new Date().getFullYear()} Clearway AI. All rights reserved.
              <Link 
                to="/admin" 
                className="ml-2 opacity-0 group-hover:opacity-30 hover:!opacity-100 transition-opacity duration-300 text-gray-600"
              >
                ·
              </Link>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {legalLinks.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href} 
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-lg">🇨🇭</span>
              <span>Swiss Engineering, Global Trust</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
