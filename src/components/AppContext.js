'use client';
import { SessionProvider } from 'next-auth/react';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export default function AppContext({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  function saveCartProducts(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function removeCartProduct(id) {
    setCartProducts((prevCartProducts) => {
      const indexToRemove = prevCartProducts.findIndex(
        (product) => product._id === id
      );

      if (indexToRemove === -1) {
        return prevCartProducts;
      }

      const newCartProducts = [...prevCartProducts];
      newCartProducts.splice(indexToRemove, 1);
      saveCartProducts(newCartProducts);
      return newCartProducts;
    });

    toast.success('Product removed');
  }

  function clearCartProduct() {
    setCartProducts([]);
    saveCartProducts([]);
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProducts(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCartProduct,
        }}
      >
        {' '}
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
