import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Heart } from "lucide-react";
import logo from "@/assets/logo.png";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com/darsis_chocolates",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-4 border-t border-border bg-white">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            src={logo}
            alt="Darsi's Chocolate"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 mb-6"
          />

          <h3 className="font-heading text-2xl text-foreground mb-3">
            Darsi's Chocolate
          </h3>

          <p className="text-muted-foreground max-w-md mb-8">
            Handcrafted chocolates made with love in the heart of Andhra Pradesh
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {quickLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-pink-light transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-muted-foreground text-sm space-y-1">
            <p>© {currentYear} Darsi's Chocolate.</p>
            <p className="flex items-center justify-center gap-1">
              Made with
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              by{" "}
              <a
                href="https://staffarc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                StaffArc
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;