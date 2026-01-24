import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";

const Contact = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello! I have a question about Darsi's Chocolate."
    );
    window.open(`https://wa.me/919494437815?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="section-padding relative bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-semibold mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Contact <span className="gradient-purple-text">Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions or want to place a custom order? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg border border-border group hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-pink-light flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Phone</h3>
                <a
                  href="tel:+919494437815"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 94944 37815
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg border border-border group hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-pink-light flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Email</h3>
                <a
                  href="mailto:darsischocolatecrafts@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  darsischocolatecrafts@gmail.com
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg border border-border group hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-pink-light flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Instagram</h3>
                <a
                  href="https://instagram.com/darsis_chocolate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  @darsis_chocolate
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-lg border border-border group hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-pink-light flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Address</h3>
                <p className="text-muted-foreground text-sm">
                  GANAPAVARAM,<br />
                  West Godavari,<br />
                  Andhra Pradesh, India
                </p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </motion.button>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl overflow-hidden h-[400px] md:h-auto shadow-lg border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122251.78379520866!2d81.45!3d16.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37cd9d6cc12a55%3A0xdcd1c7a8b9f5c896!2sWest%20Godavari%20District%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1705647900000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Darsi's Chocolate Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
