import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-chocolate-1.jpg";

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.querySelector("#products");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello! I'm interested in ordering chocolates from Darsi's Chocolate. Please share the catalog."
    );
    window.open(`https://wa.me/919494437815?text=${message}`, "_blank");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium Chocolates"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate-dark/90 via-chocolate-dark/70 to-chocolate-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate-dark/60 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-bronze/10 rounded-full blur-3xl animate-float-delayed" />

      {/* Content */}
      <div className="relative z-20 container-custom text-center px-4 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-block text-primary text-sm md:text-base tracking-[0.3em] uppercase font-medium">
            Handcrafted with Love
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-cream mb-6"
        >
          Darsi's Chocolate{" "}
          <span className="inline-block">🍫</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-cream-muted text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Step into a world of delectable, handcrafted chocolates…{" "}
          <span className="text-primary">customised chocolates</span> for every occasion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProducts}
            className="btn-gold flex items-center gap-2 text-base md:text-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openWhatsApp}
            className="btn-outline-gold flex items-center gap-2 text-base md:text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Order on WhatsApp
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
