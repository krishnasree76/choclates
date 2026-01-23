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

const announcementText =
  "We deliver across Pan-India. Freshly Prepared for Every Order. Please order at least 7 days in advance. Prepaid orders only. No COD available.";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ✅ Announcement Bar */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-primary text-white h-10 overflow-hidden">
        <div className="relative w-full h-full flex items-center">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-primary to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-primary to-transparent z-10" />

          {/* Marquee */}
          <div className="w-full overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap text-sm font-semibold tracking-wide"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* repeat twice for continuous scroll */}
              <span className="px-6">{announcementText}</span>
              <span className="px-6">{announcementText}</span>
              <span className="px-6">{announcementText}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ✅ Navbar (pushed down by bar height) */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-xl shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Left Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={logo}
                alt="Darsi's Chocolate"
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/30 shadow-lg"
              />
              <span className="hidden sm:block font-heading text-lg md:text-xl text-foreground">
                Darsi's <span className="text-primary">Chocolate</span>
              </span>
            </motion.div>

            {/* Right Nav Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm tracking-wide uppercase"
                >
                  {link.name}
                </button>
              ))}

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 ml-4"
              >
                <ShoppingBag className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Mobile Right Section */}
            <div className="flex md:hidden items-center gap-2">
              {/* Cart Button Mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2"
              >
                <ShoppingBag className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-foreground"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-white/98 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center">
                <img
                  src={logo}
                  alt="Darsi's Chocolate"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-foreground"
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
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-2xl text-foreground hover:text-primary transition-colors font-heading"
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
