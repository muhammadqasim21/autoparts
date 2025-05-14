import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  console.log(user);
  
  useEffect(() => {
    if (user ) {
      fetchCartFromDB();
    } else {
      setCartItems([]); 
    }
  }, [user]);

  const fetchCartFromDB = async () => {
    try {
      const response = await axios.get('/api/cart', {
        params: { userEmail: user.email }, 
      });
      console.log(response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart from DB:', error);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      return;
    }
    
    setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.productId === product.id);
        
        if (existingItem) {
          return prevItems.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [
            ...prevItems,
            {
              productId: product.id,
              productName: product.name,
              productPrice: product.price,
              userEmail: user.email ,  
              quantity: 1
            }
          ];
        }
      });
      
    console.log("In Add function",cartItems);
    
    try {
      await axios.post('/api/cart', {
        product,
        userEmail: user.email,
        quantity: 1,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    console.log("In Update function", newQuantity);
    if (newQuantity === 0) {
        await removeItem(id);
        return;
    }
    const existingItem = cartItems.find((item) => item.productId === id);

    if (!existingItem) {
      
      try {
        const productResponse = await axios.get(`/api/products/${id}`); 
        const products = productResponse.data;
  const product = products.find((product) => product.id === Number(id));
  
        
        await addToCart(product);
      } catch (error) {
        console.error('Error fetching product info to re-add to cart:', error);
      }
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === id ? { ...item, quantity: newQuantity } : item
      )
    );

    console.log("In Update function",cartItems);

    
    try {
      await axios.put('/api/cart', {
        productId: id,
        userEmail: user.email,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const removeItem = async (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.productId !== id));
    try {
      await axios.delete('/api/cart', {
        data: {
          productId: id,
          userEmail: user.email,
        },
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  const clearCart = async () => {
    setCartItems([]);
  }
  const clearCartFromDB = async () => {
    if (!user) return;

    try {
      await axios.post('/api/cart/clear', {
        userEmail: user.email,
      });
      console.log("Cart cleared from database");
    } catch (error) {
      console.error('Error clearing cart from DB:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCartFromDB, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
