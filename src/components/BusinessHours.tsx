import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const hours = [
  { day: "Monday", time: "10:00 AM - 7:00 PM" },
  { day: "Tuesday", time: "10:00 AM - 7:00 PM" },
  { day: "Wednesday", time: "10:00 AM - 7:00 PM" },
  { day: "Thursday", time: "10:00 AM - 7:00 PM" },
  { day: "Friday", time: "10:00 AM - 7:00 PM" },
  { day: "Saturday", time: "10:00 AM - 7:00 PM" },
  { day: "Sunday", time: "2:00 PM - 5:00 PM" },
];

const BusinessHours = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section className="section-padding relative">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto"
        >
          <div className="glass-card p-8 md:p-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Clock className="w-7 h-7 text-primary" />
              <h2 className="font-heading text-3xl text-cream">Business Hours</h2>
            </div>

            <div className="space-y-4">
              {hours.map((item, index) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors ${
                    item.day === today
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/30"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      item.day === today ? "text-primary" : "text-cream"
                    }`}
                  >
                    {item.day}
                    {item.day === today && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </span>
                  <span className="text-cream-muted">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessHours;
