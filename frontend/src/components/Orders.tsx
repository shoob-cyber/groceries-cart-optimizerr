import React from 'react';
import { Package, Calendar, DollarSign, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProtectedRoute } from './ProtectedRoute';

export function Orders() {
  const { state } = useCart();

  // Combine real orders with mock data for demonstration
  const mockOrders = [
    {
      id: 1001,
      date: '2024-01-15',
      total: 299.99,
      discount: 59.99,
      finalAmount: 239.99,
      items: 3,
      status: 'Delivered',
      optimized: true
    },
    {
      id: 1002,
      date: '2024-01-10',
      total: 159.99,
      discount: 0,
      finalAmount: 159.99,
      items: 2,
      status: 'Shipped',
      optimized: false
    }
  ];

  const allOrders = [
    ...state.orders.map(order => ({
      id: order.id,
      date: order.timestamp.toLocaleDateString(),
      total: order.totalPrice,
      discount: order.discountApplied,
      finalAmount: order.finalAmount,
      items: order.items.length,
      status: 'Processing',
      optimized: order.optimized
    })),
    ...mockOrders
  ].sort((a, b) => b.id - a.id);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order History</h2>
          <p className="text-gray-600">Track your orders and see optimization savings</p>
        </div>

        {allOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600">Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Package className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{order.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {order.optimized && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        Optimized
                      </span>
                    )}
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Items</p>
                      <p className="font-semibold">{order.items}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Discount</p>
                      <p className="font-semibold text-green-600">${order.discount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Final Amount</p>
                      <p className="font-semibold text-blue-600">${order.finalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}