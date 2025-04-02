import { createContext, useReducer } from "react";
import {createAction} from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartValue: 0,
}

const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
return {
  ...state,
  ...payload,
};
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`Unknown reducer type ${type} in cartReducer`);
  }
}


export const CartProvider = ({ children }) => {
  const [{cartItems, isCartOpen, cartCount, cartValue},dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (newCartItems) =>{
    const newCartCount = newCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
    );

    const newCartValue = newCartItems.reduce(
        (value, cartItem) => value + cartItem.quantity * cartItem.price,
        0
    );
    dispatch(createAction( CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartValue: newCartValue, cartCount: newCartCount}))
  }

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemToCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(
        createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))

  }


  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartValue,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
