import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingBag, MessageCircle, ChevronDown, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  // ✅ extract minimum quantity from product.minOrder
  const minQty = useMemo(() => {
    const match = product.minOrder?.match(/(\d+)/);
    const qty = match ? parseInt(match[1], 10) : 1;
    return Number.isNaN(qty) ? 1 : qty;
  }, [product.minOrder]);

  const [quantity, setQuantity] = useState(minQty);

  useEffect(() => {
    setQuantity(minQty);
  }, [minQty, product.id]);

  // ✅ Flavor selector
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || "");
  const [isFlavorOpen, setIsFlavorOpen] = useState(false);

  // ✅ Variant selector (55g/100g etc.)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [isVariantOpen, setIsVariantOpen] = useState(false);

  const { addToCart } = useCart();

  const currentPrice = selectedVariant?.price ?? product.price;

  const unitLabel =
    product.details.toLowerCase().includes("box") ||
    product.id.includes("bites") ||
    product.id.includes("bars")
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
    const variantText = selectedVariant ? `\nOption: ${selectedVariant.label}` : "";

    const message = encodeURIComponent(
      `Hi! I would like to order:\n\n` +
        `Product: ${product.name}${variantText}${flavorText}\n` +
        `Quantity: ${quantity}\n` +
        `Total: ₹${currentPrice * quantity}\n\n` +
        `Please confirm availability.`
    );

    window.open(`https://wa.me/919494437815?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-border shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-visible"
    >
      {/* ✅ Image */}
      <div className="relative p-3">
        <div className="relative rounded-xl overflow-hidden bg-muted h-32 sm:h-44">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Category badge */}
          <span className="absolute top-2 right-2 bg-primary text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            {product.category}
          </span>
        </div>
      </div>

      {/* ✅ Content */}
      <div className="px-4 pb-4">
        {/* Title */}
        <h3 className="font-heading text-sm sm:text-base text-foreground leading-snug line-clamp-1">
          {product.name}
        </h3>

        {/* Desc */}
        <p className="text-muted-foreground text-[11px] sm:text-xs mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* ✅ Variant selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="relative mt-3">
            <button
              onClick={() => {
                setIsVariantOpen((s) => !s);
                setIsFlavorOpen(false);
              }}
              className="w-full rounded-xl border border-primary/25 bg-pink-light px-3 py-2 text-[12px] sm:text-sm
                         flex items-center justify-between hover:border-primary transition"
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
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute z-[9999] top-full left-0 right-0 mt-2 bg-white border border-primary/30 rounded-xl shadow-xl overflow-hidden"
                >
                  {product.variants.map((variant) => (
                    <button
                      key={variant.label}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setIsVariantOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-[12px] sm:text-sm text-left transition
                        ${
                          selectedVariant?.label === variant.label
                            ? "bg-primary text-white"
                            : "hover:bg-pink-light"
                        }`}
                    >
                      <span className="truncate pr-2">
                        {variant.label}
                      </span>
                      <span className="font-semibold">
                        ₹{variant.price}
                      </span>
                      {selectedVariant?.label === variant.label && (
                        <Check className="w-4 h-4 ml-2 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ✅ Flavor selector */}
        {product.flavors && product.flavors.length > 0 && (
          <div className="relative mt-3">
            <button
              onClick={() => {
                setIsFlavorOpen((s) => !s);
                setIsVariantOpen(false);
              }}
              className="w-full rounded-xl border border-primary/25 bg-pink-light px-3 py-2 text-[12px] sm:text-sm
                         flex items-center justify-between hover:border-primary transition"
            >
              <span className="cruncate truncate>
                {selectedFlavor || "Select Flavour"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform ${
                  isFlavorOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isFlavorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute z-[9999] top-full left-0 right-0 mt-2 bg-white border border-primary/30 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="max-h-52 overflow-y-auto">
                    {product.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => {
                          setSelectedFlavor(flavor);
                          setIsFlavorOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-[12px] sm:text-sm text-left transition
                          ${
                            selectedFlavor === flavor
                              ? "bg-primary text-white"
                              : "hover:bg-pink-light"
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

        {/* ✅ Min Order + Price */}
        <div className="mt-3">
          <p className="text-primary text-[11px] sm:text-xs font-medium">
            {product.minOrder}
          </p>

          <p className="text-primary font-extrabold text-base sm:text-lg mt-1">
            {displayPriceLabel}
          </p>
        </div>

        {/* ✅ Quantity row */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-muted-foreground text-xs sm:text-sm">
            Qty
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(minQty, q - 1))}
              disabled={quantity <= minQty}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition
                ${
                  quantity <= minQty
                    ? "border-primary/15 text-primary/30 cursor-not-allowed"
                    : "border-primary/35 text-primary hover:bg-pink-light"
                }`}
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-7 text-center font-semibold text-sm">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-full border border-primary/35 text-primary flex items-center justify-center hover:bg-pink-light transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ✅ Buttons row (clean like screenshot) */}
        <div className="mt-4 flex gap-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 rounded-xl bg-primary text-white font-semibold py-3 text-sm flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppOrder}
            className="w-12 rounded-xl border border-green-500 text-green-600 flex items-center justify-center hover:bg-green-50 transition"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
