import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import axios from 'axios';
export default function Checkout() {
  const {cartItems, clearCartFromDB, clearCart} = useCart();
  const { placeOrder } = useOrder();
  const router = useRouter();
  const { user } = useAuth();
  const hasPlacedOrder = useRef(false);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const subtotal = cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
  const shipping = 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  console.log(user)
  console.log(cartItems)
  useEffect(() => {
    if (cartItems.length === 0 && !hasPlacedOrder.current) {
      // Redirect to the cart page if the cart is empty
      router.push('/cart'); 
    }
  }, [cartItems, router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      userEmail: user?.email,
      shippingInfo,
      items: cartItems.map(item => ({
        productId: item.id,
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: item.quantity
      })),
      subtotal,
      shipping,
      tax,
      total,
      date: new Date().toLocaleDateString()
    };
    try {
      // API call to place order
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${baseUrl}/api/orders`, orderData);
  
      console.log('Order Placed:', response.data);
      placeOrder(orderData);
      hasPlacedOrder.current = true;
      clearCartFromDB();
      clearCart();
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
  };
}

  return (
    
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            {/* Checkout Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* User Information */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">User Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        value={`${user?.firstname || ''} ${user?.lastname || ''}`.trim()}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-md ${
                    cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:mt-0 lg:col-span-5">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      {/* <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      /> */}
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 text-black">{item.productName}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        RS {(item.productPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-black">Subtotal</span>
                      <span className="text-black">RS {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-black">Shipping</span>
                      <span className="text-black">RS {shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-black">Tax</span>
                      <span className="text-black">RS {tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-medium">
                      <span className="text-black">Total</span>
                      <span className="text-black">RS {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}   