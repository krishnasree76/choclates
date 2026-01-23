import { motion } from "framer-motion";
import { Award, Heart, Leaf } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every piece is handcrafted with passion and care",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the finest ingredients from trusted sources",
  },
  {
    icon: Leaf,
    title: "Pure & Hygiene",
    description:
      "Made using pure, quality ingredients in a clean and hygienic environment",
  },
];

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-pink-light">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-semibold mb-4 block">
            Our Story
          </span>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
            The Art of the <span className="gradient-purple-text">Fine Chocolate</span>
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            From the heart of the Godavari region, Darsi’s Chocolate is a trusted name in
            customised chocolates—thoughtfully handcrafted with love, care, and the
            finest ingredients to make every special moment truly unforgettable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg border border-border group hover:border-primary/40 transition-all duration-500"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-pink-light flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary" />
              </motion.div>

              <h3 className="font-heading text-2xl text-foreground mb-3">
                {feature.title}
              </h3>

              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
