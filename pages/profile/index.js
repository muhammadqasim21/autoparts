// import { useState } from 'react';
// import Link from 'next/link';
// import Navbar from '../../components/Navbar';
// import { useAuth } from '../../context/AuthContext';


// // Sample order history data
// const orderHistory = [
//   {
//     id: 'ORD001',
//     date: '2024-03-15',
//     total: 239.97,
//     status: 'Delivered',
//     items: [
//       { name: 'High-Performance Air Filter', quantity: 1, price: 49.99 },
//       { name: 'Brake Pads Set', quantity: 2, price: 89.99 },
//     ]
//   },
//   {
//     id: 'ORD002',
//     date: '2024-03-10',
//     total: 299.99,
//     status: 'Processing',
//     items: [
//       { name: 'Performance Camshaft', quantity: 1, price: 299.99 },
//     ]
//   }
// ];

// export default function Profile() {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState('profile');
//   return (
    
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//             {/* Tabs */}
//             <div className="border-b border-gray-200">
//               <nav className="flex">
//                 <button
//                   onClick={() => setActiveTab('profile')}
//                   className={`px-6 py-4 text-sm font-medium ${
//                     activeTab === 'profile'
//                       ? 'border-b-2 border-blue-500 text-blue-600'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Personal Details
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('orders')}
//                   className={`px-6 py-4 text-sm font-medium ${
//                     activeTab === 'orders'
//                       ? 'border-b-2 border-blue-500 text-blue-600'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Order History
//                 </button>
//               </nav>
//             </div>

//             {/* Profile Content */}
//             {activeTab === 'profile' && (
//               <div className="p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                     <input
//                       type="text"
//                       value={`${user?.firstname || ''} ${user?.lastname || ''}`.trim()}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
//                       readOnly
//                     />

//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Email</label>
//                     <input
//                       type="email"
//                       value={user?.email || ''}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
//                       readOnly
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Phone</label>
//                     <input
//                       type="tel"
//                       placeholder="Add phone number"
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Address</label>
//                     <textarea
//                       placeholder="Add your address"
//                       rows={3}
//                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
//                     />
//                   </div>
//                   <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
//                     Update Profile
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Order History Content */}
//             {activeTab === 'orders' && (
//               <div className="p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
//                 <div className="space-y-6">
//                   {orderHistory.map((order) => (
//                     <div key={order.id} className="border rounded-lg p-6">
//                       <div className="flex justify-between items-center mb-4">
//                         <div>
//                           <h3 className="text-lg font-medium text-gray-900">Order {order.id}</h3>
//                           <p className="text-sm text-gray-500">Placed on {order.date}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-lg font-medium text-gray-900">${order.total.toFixed(2)}</p>
//                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                             order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                           }`}>
//                             {order.status}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="border-t pt-4">
//                         <h4 className="text-sm font-medium text-gray-900 mb-2">Items</h4>
//                         <ul className="space-y-2">
//                           {order.items.map((item, index) => (
//                             <li key={index} className="flex justify-between text-sm">
//                               <span className='text-black'>{item.name} x {item.quantity}</span>
//                               <span className='text-black'>${(item.price * item.quantity).toFixed(2)}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//   );
// } 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    if (activeTab === 'orders' && user?.email) {
      fetchOrders();
    }
  }, [activeTab, user?.email]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/orders?email=${user.email}`);
      console.log(response.data);
      setOrderHistory(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Personal Details
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Order History
              </button>
            </nav>
          </div>

          {/* Profile Content */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    placeholder="Add phone number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    placeholder="Add your address"
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Update Profile
                </button>
              </div>
            </div>
          )}

          {/* Order History Content */}
          {activeTab === 'orders' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
              <div className="space-y-6">
                {orderHistory.length === 0 ? (
                  <p className="text-gray-500">No orders found.</p>
                ) : (
                  orderHistory.map((order) => (
                    <div key={order.orderId} className="border rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Order {order.orderId}</h3>
                          <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-gray-900">RS {order.total.toFixed(2)}</p>
                    
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Items</h4>
                        <ul className="space-y-2">
                          {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between text-sm">
                              <span className='text-black'>{item.productName} x {item.quantity}</span>
                              <span className='text-black'>RS {(item.productPrice * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
