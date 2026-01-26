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

const unitLabel = useMemo(() => {
  const detailsText = Array.isArray(product.details)
    ? product.details.join(" ").toLowerCase()
    : product.details.toLowerCase();

  const minOrderText = product.minOrder?.toLowerCase() || "";

  const hasBoxVariant =
    product.variants?.some(v => v.label.toLowerCase().includes("box"));

  if (
    product.id.includes("bites") ||
    product.id.includes("bars") ||
    detailsText.includes("box") ||
    minOrderText.includes("box") ||
    hasBoxVariant
  ) {
    return "Box";
  }

  return "Bar";
}, [product]);


const displayPriceLabel = selectedVariant
  ? `₹${selectedVariant.price} / ${unitLabel}`
  : product.priceLabel;



  const handleAddToCart = () => {
  addToCart(product, {
    selectedFlavor: product.assorted ? "Assorted Flavours" : selectedFlavor,
    selectedPrice: currentPrice,
    selectedPriceLabel: selectedVariant ? selectedVariant.label : undefined,
    quantity,
  });

  setQuantity(minQty);
};

  const handleWhatsAppOrder = () => {
    const flavorText = product.assorted
  ? "\nFlavours: Assorted"
  : selectedFlavor
  ? `\nFlavour: ${selectedFlavor}`
  : "";

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
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border group flex flex-col h-full w-full"

    >
      {/* Image */}
      <div className="relative h-40 sm:h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
        <span className="absolute top-3 right-3 bg-primary text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <h3 className="font-heading text-base sm:text-xl text-foreground mb-1 sm:mb-2 line-clamp-1">
          {product.name} {selectedVariant ? `(${selectedVariant.label})` : ""}
        </h3>

        <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
          {product.description}
        </p>
        {/* Product Details (Box breakdown etc.) */}
{Array.isArray(product.details) ? (
  <ul className="text-xs sm:text-sm text-foreground/80 mb-3 space-y-1">
    {product.details.map((d, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
        <span>{d}</span>
      </li>
    ))}
  </ul>
) : (
  <p className="text-xs sm:text-sm text-foreground/80 mb-3">
    {product.details}
  </p>
)}


        {/* Variant Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="relative mb-3 sm:mb-4">
            <button
              onClick={() => setIsVariantOpen(!isVariantOpen)}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-pink-light border border-primary/30 rounded-xl text-foreground text-xs sm:text-sm hover:border-primary transition-colors"
            >
              <span className="truncate">{selectedVariant?.label || "Select Option"}</span>
              <ChevronDown className={`w-4 h-4 text-primary transition-transform ${isVariantOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isVariantOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-primary/30 rounded-xl overflow-hidden shadow-xl"
                >
                  <div className="max-h-44 overflow-y-auto">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.label}
                        onClick={() => {
                          setSelectedVariant(variant);
                          setIsVariantOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-left transition-colors ${
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

        {/* Flavor Selector */}
        {/* ✅ ASSORTED FLAVOURS DISPLAY */}
{product.assorted && product.flavors && (
  <div className="mb-3 sm:mb-4 bg-pink-light border border-primary/30 rounded-xl p-3">
    <p className="text-xs sm:text-sm font-semibold text-foreground mb-2">
      Assorted Flavours Included
    </p>
    <div className="space-y-1">
      {product.flavors.map((flavor) => (
        <div key={flavor} className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
          <Check className="w-4 h-4 text-primary" />
          <span>{flavor}</span>
        </div>
      ))}
    </div>
  </div>
)}

{/* ✅ NORMAL FLAVOUR DROPDOWN (ONLY FOR NON-ASSORTED) */}
{!product.assorted && product.flavors && product.flavors.length > 0 && (
  <div className="relative mb-3 sm:mb-4">
    <button
      onClick={() => setIsFlavorOpen(!isFlavorOpen)}
      className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-pink-light border border-primary/30 rounded-xl text-foreground text-xs sm:text-sm hover:border-primary transition-colors"
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
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-primary/30 rounded-xl overflow-hidden shadow-xl"
        >
          <div className="max-h-44 overflow-y-auto">
            {product.flavors.map((flavor) => (
              <button
                key={flavor}
                onClick={() => {
                  setSelectedFlavor(flavor);
                  setIsFlavorOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-left transition-colors ${
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


        <p className="text-primary text-[11px] sm:text-xs mb-2 sm:mb-4 font-medium">
          {product.minOrder}
        </p>

        <div className="text-primary font-bold text-base sm:text-lg mb-3 sm:mb-4">
          {displayPriceLabel}
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-xs sm:text-sm">Quantity</span>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity((q) => Math.max(minQty, q - 1))}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-colors ${
                quantity <= minQty
                  ? "border-primary/20 text-primary/30 cursor-not-allowed"
                  : "border-primary/40 text-primary hover:bg-pink-light"
              }`}
              disabled={quantity <= minQty}
            >
              <Minus className="w-4 h-4" />
            </motion.button>

            <span className="text-foreground font-semibold w-6 sm:w-8 text-center text-sm">
              {quantity}
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-primary/40 flex items-center justify-center text-primary hover:bg-pink-light transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 sm:gap-3 mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-pink-dark transition-colors text-sm sm:text-base"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="sm:hidden">Add</span>
            <span className="hidden sm:inline">Add to Cart</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppOrder}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-green-500 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
