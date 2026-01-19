import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <section id="products" className="section-padding relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4 block">
            Our Collection
          </span>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mb-6">
            Exquisite <span className="gradient-gold-text">Chocolates</span>
          </h2>

          <p className="text-cream-muted text-lg max-w-2xl mx-auto">
            Discover our handcrafted selection of premium chocolates, from classic
            flavors to exclusive designer creations
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
