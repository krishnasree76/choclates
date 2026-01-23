import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  ChevronDown,
  Check,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  // ✅ Flavor selector state
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || "");
  const [isFlavorOpen, setIsFlavorOpen] = useState(false);

  // ✅ Variant selector state (Weight/Box/grams)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [isVariantOpen, setIsVariantOpen] = useState(false);

  const { addToCart } = useCart();

  // ✅ Dynamic price based on selected variant
  const currentPrice = selectedVariant?.price ?? product.price;

  // ✅ Dynamic label (Bar/Box fallback)
  const unitLabel =
    product.id.includes("bites") || product.id.includes("bars") || product.details.toLowerCase().includes("box")
      ? "Box"
      : "Bar";

  const displayPriceLabel = selectedVariant
    ? `₹${selectedVariant.price} / ${unitLabel}`
    : product.priceLabel;

  const handleAddToCart = () => {
    // ✅ add based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product, {
  selectedFlavor,
  selectedPrice: currentPrice,
  selectedPriceLabel: selectedVariant ? selectedVariant.label : undefined,
  quantity,
});

    }
    setQuantity(1);
  };

  const handleWhatsAppOrder = () => {
    const flavorText = selectedFlavor ? `\nFlavour: ${selectedFlavor}` : "";
    const variantText = selectedVariant ? `\nSelected: ${selectedVariant.label}` : "";

    const message = encodeURIComponent(
      `Hi! I would like to order:\n\n` +
        `Product: ${product.name}${flavorText}${variantText}\n` +
        `Quantity: ${quantity}\n` +
        `Price: ₹${currentPrice * quantity}\n\n` +
        `Please confirm availability.`
    );

    window.open(`https://wa.me/919494437815?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border group"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
        <span className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* ✅ Show weight selected in title */}
        <h3 className="font-heading text-xl text-foreground mb-2 line-clamp-1">
          {product.name} {selectedVariant ? `(${selectedVariant.label})` : ""}
        </h3>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* ✅ Variant Selector (Weight/Box) */}
        {product.variants && product.variants.length > 0 && (
          <div className="relative mb-4">
            <button
              onClick={() => setIsVariantOpen(!isVariantOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-pink-light border border-primary/30 rounded-xl text-foreground text-sm hover:border-primary transition-colors"
            >
              <span className="truncate">
                {selectedVariant?.label || "Select Option"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform ${
                  isVariantOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isVariantOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-primary/30 rounded-xl overflow-hidden shadow-xl"
                >
                  <div className="max-h-48 overflow-y-auto">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.label}
                        onClick={() => {
                          setSelectedVariant(variant);
                          setIsVariantOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors ${
                          selectedVariant?.label === variant.label
                            ? "bg-primary text-white"
                            : "text-foreground hover:bg-pink-light"
                        }`}
                      >
                        <span className="truncate pr-2">
                          {variant.label} — ₹{variant.price}
                        </span>
                        {selectedVariant?.label === variant.label && (
                          <Check className="w-4 h-4 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ✅ Flavor Selector */}
        {product.flavors && product.flavors.length > 0 && (
          <div className="relative mb-4">
            <button
              onClick={() => setIsFlavorOpen(!isFlavorOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-pink-light border border-primary/30 rounded-xl text-foreground text-sm hover:border-primary transition-colors"
            >
              <span className="truncate">{selectedFlavor || "Select Flavour"}</span>
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform ${
                  isFlavorOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isFlavorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-primary/30 rounded-xl overflow-hidden shadow-xl"
                >
                  <div className="max-h-48 overflow-y-auto">
                    {product.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => {
                          setSelectedFlavor(flavor);
                          setIsFlavorOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors ${
                          selectedFlavor === flavor
                            ? "bg-primary text-white"
                            : "text-foreground hover:bg-pink-light"
                        }`}
                      >
                        <span className="truncate pr-2">{flavor}</span>
                        {selectedFlavor === flavor && (
                          <Check className="w-4 h-4 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Min Order */}
        <p className="text-primary text-xs mb-4 font-medium">{product.minOrder}</p>

        {/* ✅ Price (Dynamic) */}
        <div className="text-primary font-bold text-lg mb-4">
          {displayPriceLabel}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-sm">Quantity</span>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center text-primary hover:bg-pink-light transition-colors"
            >
              <Minus className="w-4 h-4" />
            </motion.button>

            <span className="text-foreground font-semibold w-8 text-center">
              {quantity}
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center text-primary hover:bg-pink-light transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-pink-dark transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppOrder}
            className="w-12 h-12 rounded-xl border border-green-500 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
