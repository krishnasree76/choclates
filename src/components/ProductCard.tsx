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
  product?: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);

  // ✅ flavors only (mango, mint etc)
  const flavors = product.flavors ?? [];
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0] || "");
  const [isFlavorOpen, setIsFlavorOpen] = useState(false);

  // ✅ variants only (250g/500g, piece/box etc)
  const variants = product.variants ?? [];
  const [selectedVariantLabel, setSelectedVariantLabel] = useState(
    variants[0]?.label || ""
  );
  const [isVariantOpen, setIsVariantOpen] = useState(false);

  const selectedVariant = useMemo(() => {
    if (!variants.length) return null;
    return variants.find((v) => v.label === selectedVariantLabel) || variants[0];
  }, [variants, selectedVariantLabel]);

  useEffect(() => {
    setSelectedFlavor((product.flavors ?? [])[0] || "");
    setSelectedVariantLabel((product.variants ?? [])[0]?.label || "");
    setQuantity(1);
    setIsFlavorOpen(false);
    setIsVariantOpen(false);
  }, [product.id]);

  // ✅ price based on variant
  const priceToUse = selectedVariant?.price ?? product.price;

  // ✅ label based on variant
  const priceLabelToUse = selectedVariant
    ? `${selectedVariant.label} - ₹${selectedVariant.price}`
    : product.priceLabel;

  const handleAddToCart = () => {
    addToCart(product, {
      selectedFlavor: selectedFlavor || undefined,
      selectedPrice: priceToUse,
      selectedPriceLabel: priceLabelToUse,
      quantity,
    });

    setQuantity(1);
  };

  const handleWhatsAppOrder = () => {
    const flavorText = selectedFlavor ? `\nFlavour: ${selectedFlavor}` : "";
    const variantText = selectedVariant
      ? `\nVariant: ${selectedVariant.label}`
      : "";

    const message = encodeURIComponent(
      `Hi! I would like to order:\n\n` +
        `Product: ${product.name}${flavorText}${variantText}\n` +
        `Quantity: ${quantity}\n` +
        `Unit Price: ₹${priceToUse}\n` +
        `Total: ₹${priceToUse * quantity}\n\n` +
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
      className="glass-card overflow-visible group"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark/80 via-transparent to-transparent" />
        <span className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl text-cream mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-cream-muted text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* ✅ Variant Selector (THEMED LIKE FLAVOUR) */}
        {variants.length > 0 && (
          <div className="relative mb-4">
            <p className="text-cream-muted text-xs mb-2">Select Variant</p>

            <button
              onClick={() => {
                setIsVariantOpen(!isVariantOpen);
                setIsFlavorOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-chocolate-light border border-primary/30 rounded-xl text-cream text-sm hover:border-primary/50 transition-colors"
            >
              <span className="truncate">
                {selectedVariant
                  ? `${selectedVariant.label} - ₹${selectedVariant.price}`
                  : "Select Variant"}
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
                  className="absolute z-50 top-full left-0 right-0 mt-2 bg-chocolate-medium border border-primary/30 rounded-xl shadow-xl overflow-hidden"
                >
                  {/* ✅ Scroll container */}
                  <div className="max-h-56 overflow-y-auto scrollbar-gold">
                    {variants.map((v) => {
                      const isActive = selectedVariantLabel === v.label;
                      return (
                        <button
                          key={v.label}
                          onClick={() => {
                            setSelectedVariantLabel(v.label);
                            setIsVariantOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-primary/10 transition-colors ${
                            isActive
                              ? "bg-primary/20 text-primary"
                              : "text-cream"
                          }`}
                        >
                          <span className="truncate pr-2">
                            {v.label} - ₹{v.price}
                          </span>
                          {isActive && (
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ✅ Flavor Selector */}
        {/* ✅ Flavor Selector */}
{flavors.length > 0 && (
  <div className="relative mb-4">
    <p className="text-cream-muted text-xs mb-2">Select Flavour</p>

    <button
      onClick={() => {
        setIsFlavorOpen(!isFlavorOpen);
        setIsVariantOpen(false);
      }}
      className="w-full flex items-center justify-between px-4 py-3 bg-chocolate-light border border-primary/30 rounded-xl text-cream text-sm hover:border-primary/50 transition-colors"
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
          className="absolute z-[999] top-full left-0 right-0 mt-2 bg-chocolate-medium border border-primary/30 rounded-xl shadow-xl overflow-hidden"
        >
          {/* ✅ For 6 flavours: show all items ALWAYS (NO scroll) */}
          <div className="overflow-hidden">
            {flavors.map((flavor) => (
              <button
                key={flavor}
                onClick={() => {
                  setSelectedFlavor(flavor);
                  setIsFlavorOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-primary/10 transition-colors ${
                  selectedFlavor === flavor
                    ? "bg-primary/20 text-primary"
                    : "text-cream"
                }`}
              >
                <span className="truncate pr-2">{flavor}</span>

                {selectedFlavor === flavor && (
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)}


        {/* Price */}
        <div className="text-primary font-semibold text-lg mb-4">
          {priceLabelToUse}
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-cream-muted text-sm">Quantity</span>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </motion.button>

            <span className="text-cream font-semibold w-8 text-center">
              {quantity}
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
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
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppOrder}
            className="w-12 h-12 rounded-xl border border-green-500/50 flex items-center justify-center text-green-500 hover:bg-green-500/10 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
