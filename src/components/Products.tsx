import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <section id="products" className="section-padding relative bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-semibold mb-4 block">
            Our Collection
          </span>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Exquisite <span className="gradient-purple-text">Chocolates</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handcrafted selection of premium chocolates, from classic
            flavors to exclusive designer creations
          </p>
        </motion.div>

        {/* ✅ MATCHES REFERENCE CARD SHAPE */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-6 
          lg:gap-8
          items-stretch
        ">
          {products.map((product, index) => (
            <div key={product.id} className="flex">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
