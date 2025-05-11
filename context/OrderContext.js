import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);

  // Function to save placed order
  const placeOrder = (orderData) => {
    setOrder(orderData);
  };

  return (
    <OrderContext.Provider value={{ order, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

// Hook to use order context easily
export function useOrder() {
  return useContext(OrderContext);
}
