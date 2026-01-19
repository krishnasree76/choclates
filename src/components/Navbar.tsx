import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-chocolate-dark/95 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* ✅ add px-4 to avoid touching edges */}
        <div className="container-custom px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Left Logo */}
            <motion.div
              className="flex items-center gap-3 min-w-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={logo}
                alt="Darsi's Chocolate"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/50 shadow-lg flex-shrink-0"
              />
              <span className="hidden sm:block font-heading text-lg md:text-xl text-cream truncate">
                Darsi's <span className="text-primary">Chocolate</span>
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-cream-muted hover:text-primary transition-colors duration-300 text-sm tracking-wide uppercase"
                >
                  {link.name}
                </button>
              ))}

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 ml-4"
              >
                <ShoppingBag className="w-6 h-6 text-cream hover:text-primary transition-colors" />
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* ✅ Mobile Right Section (fixed width so icon never overflows) */}
            <div className="flex md:hidden items-center justify-end gap-2 w-[96px]">
              {/* Cart */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2"
              >
                <ShoppingBag className="w-6 h-6 text-cream hover:text-primary transition-colors" />
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.button>

              {/* Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-cream flex-shrink-0"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-chocolate-dark/98 backdrop-blur-xl overflow-x-hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center">
                <img
                  src={logo}
                  alt="Darsi's Chocolate"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/50"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-cream"
                  aria-label="Close menu"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 space-y-8">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-2xl text-cream hover:text-primary transition-colors font-heading"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
