import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = "🍫 *Order from Darsi's Chocolate*\n\n";

    items.forEach((item) => {
      const unitPrice = item.selectedPrice ?? item.product.price;
      const lineTotal = unitPrice * item.quantity;

      message += `▪ ${item.product.name}\n`;

      if (item.selectedFlavor) {
        message += `  Flavour: ${item.selectedFlavor}\n`;
      }

      if (item.selectedPriceLabel) {
        message += `  Option: ${item.selectedPriceLabel}\n`;
      }

      message += `  Qty: ${item.quantity} × ₹${unitPrice} = ₹${lineTotal}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Total: ₹${getTotalPrice()}*\n\n`;
    message += `Please confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919494437815?text=${encodedMessage}`, "_blank");

    clearCart();
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* ✅ Drawer (FIXED OFFSET BELOW ANNOUNCEMENT BAR) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="
              fixed right-0 z-[80] flex flex-col
              top-9 md:top-10
              h-[calc(100vh-36px)] md:h-[calc(100vh-40px)]
              w-full max-w-md
              bg-white border-l border-border
            "
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-xl sm:text-2xl text-foreground">
                  Your Cart
                </h2>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-pink-light transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <p className="text-muted-foreground/70 text-sm mt-2">
                    Add some delicious chocolates!
                  </p>
                </div>
              ) : (
                items.map((item) => {
                  const unitPrice = item.selectedPrice ?? item.product.price;
                  const lineTotal = unitPrice * item.quantity;

                  return (
                    <motion.div
                      key={item.cartItemId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-pink-light rounded-2xl p-4 flex gap-4 border border-border"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />

                      <div className="flex-1">
                        <h3 className="text-foreground font-medium text-sm line-clamp-1">
                          {item.product.name}
                        </h3>

                        {(item.selectedFlavor || item.selectedPriceLabel) && (
                          <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                            {item.selectedFlavor && (
                              <p>Flavour: {item.selectedFlavor}</p>
                            )}
                            {item.selectedPriceLabel && (
                              <p>Option: {item.selectedPriceLabel}</p>
                            )}
                          </div>
                        )}

                        <p className="text-primary font-semibold mt-2">
                          ₹{lineTotal}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span className="text-foreground text-sm w-6 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="ml-auto p-1.5 rounded-full hover:bg-destructive/10 transition-colors text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-border space-y-4 bg-white">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-primary font-heading text-2xl">
                    ₹{getTotalPrice()}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order via WhatsApp
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
