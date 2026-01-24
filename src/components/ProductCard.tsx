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

  useEffect(() => {
    setQuantity(minQty);
  }, [minQty, product.id]);

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
      selectedPriceLabel: selectedVariant ? selectedVariant.label : undefined,
      quantity,
    });
    setQuantity(minQty);
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
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-56 overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
        <span className="absolute top-3 right-3 bg-primary text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-base sm:text-xl text-foreground mb-1 sm:mb-2 line-clamp-1">
          {product.name} {selectedVariant ? `(${selectedVariant.label})` : ""}
        </h3>

        <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Variant Selector */}
        {product.variants && (
          <div className="relative mb-3 sm:mb-4">
            <button
              onClick={() => setIsVariantOpen(!isVariantOpen)}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-pink-light border border-primary/30 rounded-xl text-xs sm:text-sm"
            >
              <span className="truncate">
                {selectedVariant?.label || "Select Option"}
              </span>
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
                      className={`w-full px-4 py-3 text-xs sm:text-sm text-left ${
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

        <p className="text-primary text-xs mb-2 sm:mb-4 font-medium">
          {product.minOrder}
        </p>

        <div className="text-primary font-bold text-base sm:text-lg mb-3 sm:mb-4">
          {displayPriceLabel}
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-muted-foreground text-xs sm:text-sm">Quantity</span>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(minQty, q - 1))}
              disabled={quantity <= minQty}
              className="w-8 h-8 rounded-full border border-primary/30"
            >
              <Minus className="w-4 h-4 mx-auto" />
            </button>

            <span className="w-6 text-center text-sm">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-full border border-primary/30"
            >
              <Plus className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>

        {/* Buttons at Bottom */}
        <div className="mt-auto pt-4 flex gap-2 sm:gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppOrder}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-green-500 flex items-center justify-center text-green-600"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
