import { Phone, MapPin, Shield, Globe, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-900 py-16 md:py-20">
      <div className="container mx-auto px-6">
        {/* Founder Trust Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xl md:text-2xl text-primary font-bold mb-4 flex items-center justify-center gap-2">
            🏔️ FREIENBACH, SWITZERLAND
          </div>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Hi, I'm building AI receptionists for Swiss clinics and law firms. 
            <br className="hidden md:block" />
            Every system is custom-built, secure, and client-specific.
          </p>
          
          {/* Demo Number - Big CTA */}
          <a 
            href={`tel:${demoNumber.replace(/\s/g, '').replace(/[()]/g, '')}`}
            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors mb-6"
          >
            <Phone className="w-8 h-8" />
            {demoNumber}
          </a>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-slate-300">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-slate-300">
              <span>🇨🇭</span>
              <span>Swiss Made</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-slate-300">
              <Globe className="w-4 h-4 text-primary" />
              <span>30+ Languages</span>
            </div>
          </div>
          
          {/* Tech stack */}
          <p className="text-slate-400 text-sm mb-6">
            sales@clearwayai.co • Powered by Retell.ai + n8n
          </p>
          
          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://linkedin.com/company/clearwayai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:sales@clearwayai.co" 
              className="text-slate-400 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Clearway AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Freienbach SZ 🇨🇭</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
