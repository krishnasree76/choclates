import { useEffect, useMemo, useState } from "react";
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
  const minQty = useMemo(() => {
    const match = product.minOrder?.match(/(\d+)/);
    const qty = match ? parseInt(match[1], 10) : 1;
    return Number.isNaN(qty) ? 1 : qty;
  }, [product.minOrder]);

  const [quantity, setQuantity] = useState(minQty);
  useEffect(() => setQuantity(minQty), [minQty, product.id]);

  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || "");
  const [isFlavorOpen, setIsFlavorOpen] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [isVariantOpen, setIsVariantOpen] = useState(false);

  const { addToCart } = useCart();
  const currentPrice = selectedVariant?.price ?? product.price;

  const unitLabel =
    product.id.includes("bites") ||
    product.id.includes("bars") ||
    product.details.toLowerCase().includes("box")
      ? "Box"
      : "Bar";

  const displayPriceLabel = selectedVariant
    ? `₹${selectedVariant.price} / ${unitLabel}`
    : product.priceLabel;

  const handleAddToCart = () => {
    addToCart(product, {
      selectedFlavor,
      selectedPrice: currentPrice,
      selectedPriceLabel: selectedVariant?.label,
      quantity,
    });
    setQuantity(minQty);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden flex flex-col h-[640px]"
    >
      {/* IMAGE — SAME HEIGHT FOR ALL */}
      <div className="relative h-48 w-full flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* CONTENT AREA */}
      <div className="flex flex-col flex-grow p-5">
        {/* TITLE — FIXED HEIGHT */}
        <h3 className="font-heading text-lg text-foreground leading-snug line-clamp-2 min-h-[48px]">
          {product.name} {selectedVariant ? `(${selectedVariant.label})` : ""}
        </h3>

        {/* DESCRIPTION — FIXED HEIGHT */}
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* SELECTOR AREA — FIXED SPACE */}
        <div className="mt-3 min-h-[60px]">
          {product.variants && (
            <div className="relative">
              <button
                onClick={() => setIsVariantOpen(!isVariantOpen)}
                className="w-full flex justify-between items-center px-4 py-2.5 bg-pink-light border border-primary/30 rounded-xl text-sm"
              >
                <span className="truncate">{selectedVariant?.label || "Select Option"}</span>
                <ChevronDown className={`w-4 h-4 text-primary ${isVariantOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isVariantOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-primary/30 rounded-xl shadow-xl"
                  >
                    {product.variants.map((variant) => (
                      <button
                        key={variant.label}
                        onClick={() => {
                          setSelectedVariant(variant);
                          setIsVariantOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-sm text-left ${
                          selectedVariant?.label === variant.label
                            ? "bg-primary text-white"
                            : "hover:bg-pink-light"
                        }`}
                      >
                        {variant.label} — ₹{variant.price}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* MIN ORDER */}
        <p className="text-primary text-xs mt-3">{product.minOrder}</p>

        {/* PRICE */}
        <div className="text-primary font-bold text-lg mt-2">
          {displayPriceLabel}
        </div>

        {/* QUANTITY */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-muted-foreground text-sm">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(minQty, q - 1))}
              disabled={quantity <= minQty}
              className="w-8 h-8 rounded-full border border-primary/30"
            >
              <Minus className="w-4 h-4 mx-auto" />
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-full border border-primary/30"
            >
              <Plus className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>

        {/* BUTTONS — ALWAYS AT BOTTOM */}
        <div className="mt-auto pt-5 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl border border-green-500 flex items-center justify-center text-green-600"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
