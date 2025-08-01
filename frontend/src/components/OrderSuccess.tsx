import React from 'react';
import { CheckCircle, Download, Package, Calendar, DollarSign, Award } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessProps {
  order: Order;
  onContinueShopping: () => void;
}

export function OrderSuccess({ order, onContinueShopping }: OrderSuccessProps) {
  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF invoice
    alert('Invoice download would be implemented here!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-semibold">#{order.id}</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-semibold">{order.timestamp.toLocaleDateString()}</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Paid</p>
            <p className="font-semibold">${order.finalAmount.toFixed(2)}</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">You Saved</p>
            <p className="font-semibold text-green-600">${order.discountApplied.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Ordered Items</h4>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{item.product.name}</h5>
                  <p className="text-sm text-gray-600">{item.product.category}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Value: {item.product.value * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.appliedCoupon && (
          <div className="border-t pt-6 mt-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Applied Coupon</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-700">{order.appliedCoupon.code}</p>
                  <p className="text-sm text-green-600">{order.appliedCoupon.description}</p>
                </div>
                <p className="text-lg font-bold text-green-600">-${order.discountApplied.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t pt-6 mt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Subtotal: ${order.totalPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Discount: -${order.discountApplied.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">${order.finalAmount.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Total Paid</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onContinueShopping}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}