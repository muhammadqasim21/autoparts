// import Link from 'next/link';
// import Navbar from '../components/Navbar';


// // Sample order data - In a real app, this would come from your order context/state
// const orderData = {
//   orderId: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
//   date: new Date().toLocaleDateString(),
//   items: [
//     {
//       id: 1,
//       name: 'High-Performance Air Filter',
//       price: 49.99,
//       quantity: 1,
//       image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
//     },
//     {
//       id: 2,
//       name: 'Brake Pads Set',
//       price: 89.99,
//       quantity: 2,
//       image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
//     }
//   ],
//   shipping: {
//     address: '123 Main St',
//     city: 'New York',
//     state: 'NY',
//     zipCode: '10001',
//     country: 'USA'
//   },
//   subtotal: 229.97,
//   shipping: 10,
//   tax: 22.99,
//   total: 262.96
// };

// export default function OrderConfirmation() {
//   return (
    
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
//               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h1>
//             <p className="text-lg text-gray-600">
//               Your order has been placed successfully. We will send you an email confirmation shortly.
//             </p>
//           </div>

//           <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-medium text-gray-900">Order #{orderData.orderId}</h2>
//                   <p className="text-sm text-gray-500">Placed on {orderData.date}</p>
//                 </div>
//                 <Link
//                   href="/profile"
//                   className="text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   View Order History
//                 </Link>
//               </div>
//             </div>

//             <div className="p-6">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
//               <div className="space-y-4">
//                 {orderData.items.map((item) => (
//                   <div key={item.id} className="flex items-center space-x-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div className="flex-1">
//                       <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
//                       <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                     </div>
//                     <p className="text-sm font-medium text-gray-900">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 border-t border-gray-200 pt-6">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Address</p>
//                     <p className="text-sm font-medium text-gray-900 text-black">{orderData.shipping.address}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">City</p>
//                     <p className="text-sm font-medium text-gray-900">{orderData.shipping.city}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">State</p>
//                     <p className="text-sm font-medium text-gray-900">{orderData.shipping.state}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">ZIP Code</p>
//                     <p className="text-sm font-medium text-gray-900">{orderData.shipping.zipCode}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 border-t border-gray-200 pt-6">
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className='text-black'>Subtotal</span>
//                     <span className='text-black'>${orderData.subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className='text-black'>Shipping</span>
//                     <span className='text-black'>${orderData.shipping.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className='text-black'>Tax</span>
//                     <span className='text-black'>${orderData.tax.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-base font-medium">
//                     <span className='text-black'>Total</span>
//                     <span className='text-black'>${orderData.total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 text-center">
//             <Link
//               href="/products"
//               className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
    
//   );
// } 

import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useOrder } from '../context/OrderContext'; // ✅ Import order context
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
