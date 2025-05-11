import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useOrder } from '../../context/OrderContext'; // ✅ Import order context
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function OrderConfirmation() {
  const { order } = useOrder();
  const router = useRouter();

  // If no order exists in context, redirect to home
  useEffect(() => {
    if (!order) {
      router.push('/');
    }
  }, [order, router]);

  if (!order) return null; // Optional: can show loading or nothing until redirect

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6 text-black">Order Confirmation</h1>
        <p className="mb-4 text-black">Thank you for your order! Here are the details:</p>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-black">Order Info</h2>
          <p className='text-black'><strong>Date:</strong> {order.date}</p>
          <p className='text-black'><strong>Email:</strong> {order.userEmail}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-black">Shipping Info</h2>
          <p className='text-black'>{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.zipCode}, {order.shippingInfo.country}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-black">Items</h2>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between mb-2">
              <span className='text-black'>{item.productName} (x{item.quantity})</span>
              <span className='text-black'>RS {(item.productPrice * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between">
            <span className='text-black'>Subtotal</span>
            <span className='text-black'>RS {order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className='text-black'>Shipping</span>
            <span className='text-black'>RS {order.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className='text-black'>Tax</span>
            <span className='text-black'>RS {order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span className='text-black'>Total</span>
            <span className='text-black'>RS {order.total.toFixed(2)}</span>
          </div>
        </div>

        <Link href="/" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
