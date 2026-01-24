// import { motion, useScroll, useTransform } from "framer-motion";
// import { MessageCircle, ShoppingBag, ChevronDown } from "lucide-react";
// import heroImage from "@/assets/hero-chocolate-1.jpg";

// const Hero = () => {
//   const { scrollY } = useScroll();
  
//   // Parallax effects
//   const yBg = useTransform(scrollY, [0, 500], [0, 150]);
//   const yText = useTransform(scrollY, [0, 500], [0, -100]);

//   const scrollToProducts = () => {
//     document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
//   };

//   const openWhatsApp = () => {
//     const message = encodeURIComponent("Hello! I'm interested in ordering Darsi's Chocolates.");
//     window.open(`https://wa.me/919494437815?text=${message}`, "_blank");
//   };

//   return (
//     <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a0f0a]">
      
//       {/* 1. Cinematic Background Layer */}
//       <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
//         <img
//           src={heroImage}
//           alt="Premium Chocolates"
//           className="w-full h-full object-cover scale-110 blur-[1px] opacity-40"
//         />
//         {/* Deep vignette for focus */}
//         <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-[#1a0f0a]/80" />
//       </motion.div>

//       {/* 2. Floating "Melting" Accents */}
//       <div className="absolute inset-0 pointer-events-none z-10">
//         <motion.div 
//           animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
//           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-20 left-[10%] w-32 h-32 bg-primary/20 blur-[80px] rounded-full" 
//         />
//         <motion.div 
//           animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute bottom-20 right-[15%] w-64 h-64 bg-bronze/10 blur-[100px] rounded-full" 
//         />
//       </div>

//       {/* 3. Main Content Container */}
//       <div className="relative z-20 container mx-auto px-4">
//         <motion.div
//           style={{ y: yText }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="max-w-5xl mx-auto text-center"
//         >
//           {/* Subtle Tagline */}
//           <motion.div
//             initial={{ letterSpacing: "0.1em", opacity: 0 }}
//             animate={{ letterSpacing: "0.4em", opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="mb-8"
//           >
//             <span className="text-primary font-light uppercase text-xs md:text-sm border-y border-primary/30 py-2 px-4 inline-block">
//               Handcrafted with Love
//             </span>
//           </motion.div>

//           {/* Elegant Typography */}
//           <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl mb-8 leading-tight tracking-tight">
//             <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-cream-muted to-primary">
//               Darsi's
//             </span>
//             <br />
//             <span className="text-cream italic font-serif">Chocolate</span>
//             <motion.span 
//               animate={{ rotate: [0, 15, -15, 0] }}
//               transition={{ repeat: Infinity, duration: 4 }}
//               className="inline-block ml-4 drop-shadow-2xl"
//             >
//               🍫
//             </motion.span>
//           </h1>

//           <p className="text-cream/80 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
//             Step into a world of <span className="text-primary italic font-medium">artisanal indulgence</span>. 
//             Customized creations for your most precious moments.
//           </p>

//           {/* Interactive Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
//             <motion.button
//               whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}
//               whileTap={{ scale: 0.98 }}
//               onClick={scrollToProducts}
//               className="bg-primary text-[#1a0f0a] px-10 py-4 rounded-full font-bold flex items-center gap-3 transition-all uppercase tracking-wider text-sm"
//             >
//               <ShoppingBag size={18} />
//               Discover Collection
//             </motion.button>

//             <motion.button
//               whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
//               whileTap={{ scale: 0.98 }}
//               onClick={openWhatsApp}
//               className="group border border-cream/30 text-cream px-10 py-4 rounded-full font-medium flex items-center gap-3 backdrop-blur-sm transition-all uppercase tracking-wider text-sm"
//             >
//               <MessageCircle size={18} className="group-hover:text-primary transition-colors" />
//               WhatsApp Order
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>

//       {/* 4. Refined Scroll Indicator */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
//         onClick={scrollToProducts}
//       >
//         <span className="text-cream/40 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <ChevronDown className="text-primary/60" size={24} />
//         </motion.div>
//       </motion.div>

//     </section>
//   );
// };

// export default Hero;
import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag, Sparkles } from "lucide-react";
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
      {/* ✅ Background */}
      <div className="absolute inset-0 z-0">
        {/* Image */}
        <img
          src={heroImage}
          alt="Premium Chocolates"
          className="w-full h-full object-cover"
        />

        {/* ✅ Light overlay (catchy) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/95" />

        {/* ✅ Pink/Purple glow overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-secondary/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,105,180,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_60%)]" />
      </div>

      {/* ✅ Decorative Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/25 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />

      {/* ✅ Content */}
      <div className="relative z-10 container-custom px-4 pt-28 md:pt-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/25 bg-white/60 backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-chocolate-dark">
                Handcrafted with Love
              </span>
            </div>
          </motion.div>

          {/* ✅ Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl leading-tight text-chocolate-dark mb-6"
          >
            <span className="gradient-gold-text">Darsi&apos;s Chocolate</span>
          </motion.h1>

          {/* ✅ Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-chocolate-medium text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-semibold"
          >
            Where Chocolate Becomes Art
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {/* ✅ Primary Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToProducts}
              className="px-7 py-4 rounded-2xl text-white font-bold text-base md:text-lg flex items-center gap-2
                         bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))]
                         shadow-[0_18px_50px_rgba(255,105,180,0.25)]
                         hover:brightness-110 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Now
            </motion.button>

            {/* ✅ Outline Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={openWhatsApp}
              className="px-7 py-4 rounded-2xl font-bold text-base md:text-lg flex items-center gap-2
                         border border-primary/40 bg-white/70 backdrop-blur-md text-chocolate-dark
                         hover:border-primary hover:bg-white transition shadow-sm"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              Order on WhatsApp
            </motion.button>
          </motion.div>

          {/* ✅ Quick Info Line */}
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
  className="mt-10 text-sm md:text-base text-chocolate-medium"
>
  ✨ Customised chocolates for all occasions • 
  📍 Ganapavaram, West Godavari,<br />
  Andhra Pradesh
</motion.div>

        </div>
      </div>

      {/* ✅ Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-12 rounded-full border border-primary/40 bg-white/60 backdrop-blur-md flex items-start justify-center p-2"
        >
          <motion.div className="w-2 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
