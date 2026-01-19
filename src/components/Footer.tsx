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

  return (
    <footer className="relative py-16 px-4 border-t border-primary/20">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container-custom">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            src={logo}
            alt="Darsi's Chocolate"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary/50 mb-6"
          />

          <h3 className="font-heading text-2xl text-cream mb-3">
            Darsi's Chocolate
          </h3>
          <p className="text-cream-muted max-w-md mb-8">
            Handcrafted chocolates made with love in the heart of Andhra Pradesh
          </p>

          {/* ✅ Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-cream-muted hover:text-primary transition-colors text-sm font-medium tracking-wide"
              >
                {link.name}
              </a>
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
                className="w-11 h-11 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* ✅ Copyright */}
          <p className="text-cream-muted/60 text-sm flex flex-wrap items-center justify-center gap-1">
            © {currentYear} Darsi's Chocolate. Made with
            <Heart
              className="w-4 h-4 text-primary inline-block"
              fill="currentColor"
            />
            by{" "}
            <a
              href="https://staffarc.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              StaffArc
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
