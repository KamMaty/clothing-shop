import { createContext, useEffect, useState } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const modifyCartItemQuantity = (
  cartItems,
  itemToModify,
  switchOption
) => {
  return cartItems.map((cartItem) =>
    cartItem.id === itemToModify.id
      ? {
          ...cartItem,
          quantity: Math.max(0, cartItem.quantity + 1),
        }
      : cartItem
  );
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartValue: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);

    const newCartValue = cartItems.reduce(
      (value, cartItem) => value + cartItem.quantity * cartItem.price,
      0
    );
    setCartValue(newCartValue);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };
  const removeItemToCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const modifyItemQuantity = (itemToModify, switchOption) => {
    setCartItems(modifyCartItemQuantity(cartItems, itemToModify, switchOption));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    modifyItemQuantity,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartValue,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
