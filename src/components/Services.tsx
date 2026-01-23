import { motion } from "framer-motion";
import { Gift, Heart, Cake, Users, PartyPopper, Briefcase } from "lucide-react";

const services = [
  {
    icon: Gift,
    title: "Corporate Gifting",
    description: "Impress your clients and employees with customised chocolate hampers",
  },
  {
    icon: Heart,
    title: "Wedding Favors",
    description: "Beautiful return gifts that your guests will cherish",
  },
  {
    icon: Cake,
    title: "Birthday Specials",
    description: "Personalised photo chocolates to make birthdays memorable",
  },
  {
    icon: Users,
    title: "Baby Showers",
    description: "Adorable themed chocolates for your special celebrations",
  },
  {
    icon: PartyPopper,
    title: "Festival Hampers",
    description: "Celebrate Diwali, Rakhi, Christmas with our festive collections",
  },
  {
    icon: Briefcase,
    title: "Bulk Orders",
    description: "Special pricing for large quantity orders for events",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding relative bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-semibold mb-4 block">
            What We Offer
          </span>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Customised Chocolates for{" "}
            <span className="gradient-purple-text">All Occasions</span>
          </h2>

          {/* ✅ Updated Subtitle Text */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Crafted to celebrate your moments—beautifully, deliciously, personally.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg border border-border group hover:border-primary/40 transition-all duration-500"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 mx-auto mb-6 rounded-full bg-pink-light flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <service.icon className="w-7 h-7 text-primary" />
              </motion.div>

              <h3 className="font-heading text-xl text-foreground mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
