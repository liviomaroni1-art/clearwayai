import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Clearway AI" className="h-8 w-auto" />
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#benefits" className="hover:text-foreground transition-colors">
              Benefits
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright & Positioning */}
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">
              © {new Date().getFullYear()} Clearway AI. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Your AI automation partner for service-based teams.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
