import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);

  const placeOrder = (orderData) => {
    setOrder(orderData);
  };

  return (
    <OrderContext.Provider value={{ order, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}


export function useOrder() {
  return useContext(OrderContext);
}
