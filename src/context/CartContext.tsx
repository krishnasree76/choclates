import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;

  // ✅ selected options
  selectedFlavor?: string;
  selectedPrice?: number;
  selectedPriceLabel?: string;

  // ✅ unique per product+flavour+price
  cartItemId: string;
}

interface AddToCartOptions {
  selectedFlavor?: string;
  selectedPrice?: number;
  selectedPriceLabel?: string;
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];

  // ✅ updated signature
  addToCart: (product: Product, options?: AddToCartOptions) => void;

  // ✅ remove/update by cartItemId
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;

  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const buildCartItemId = (
    productId: string,
    selectedFlavor?: string,
    selectedPrice?: number
  ) => {
    const flavorKey = selectedFlavor ? selectedFlavor.trim() : "default";
    const priceKey = selectedPrice ?? "default";
    return `${productId}__${flavorKey}__${priceKey}`;
  };

  const addToCart = (product: Product, options?: AddToCartOptions) => {
    const qtyToAdd = options?.quantity ?? 1;

    const selectedFlavor = options?.selectedFlavor;
    const selectedPrice = options?.selectedPrice ?? product.price;
    const selectedPriceLabel = options?.selectedPriceLabel ?? product.priceLabel;

    const cartItemId = buildCartItemId(product.id, selectedFlavor, selectedPrice);

    setItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);

      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }

      return [
        ...prev,
        {
          product,
          quantity: qtyToAdd,
          selectedFlavor,
          selectedPrice,
          selectedPriceLabel,
          cartItemId,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getTotalItems = () =>
    items.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce((total, item) => {
      const unitPrice = item.selectedPrice ?? item.product.price;
      return total + unitPrice * item.quantity;
    }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
