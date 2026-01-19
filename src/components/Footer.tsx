import { Phone, MapPin, Globe, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <footer className="bg-[#060608] py-16 md:py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-lg md:text-xl text-primary font-semibold mb-4 flex items-center justify-center gap-2">
            🇨🇭 Built in Switzerland, for US teams
          </div>
          
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Premium AI receptionists that help you focus on what matters—not the noise. 
            Every system is custom-built, secure, and tailored to your practice.
          </p>
          
          <a 
            href={`tel:${demoNumber.replace(/\s/g, '').replace(/[()]/g, '')}`} 
            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <Phone className="w-7 h-7" />
            {demoNumber}
          </a>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-gray-400">
              <Globe className="w-4 h-4 text-primary" />
              <span>30+ Languages</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mb-6">
            sales@clearwayai.co • Powered by Retell.ai + n8n
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <a href="https://linkedin.com/company/clearwayai" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:sales@clearwayai.co" className="text-gray-500 hover:text-primary transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ClearwayAI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Freienbach, Switzerland</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;