import React, { useState } from 'react';
import { Package, Calendar, MapPin, Scale, Mail, CreditCard, Clock, Phone, User } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface OrderDetailsProps {
  order: {
    id: string;
    date: string;
    departure: string;
    arrival: string;
    kg: number;
    letters: number;
    price: string;
    status: string;
    sender: {
      name: string;
      avatar: string;
    };
    traveler: {
      name: string;
      avatar: string;
    };
  };
  onClose: () => void;
}

const orderStatuses = ['New Order', 'In Transit', 'Delivered', 'Cancelled'] as const;

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(order);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedOrder.departure) {
      newErrors.departure = 'Departure is required';
    }
    if (!editedOrder.arrival) {
      newErrors.arrival = 'Arrival is required';
    }
    if (!editedOrder.kg) {
      newErrors.kg = 'Weight is required';
    }
    if (!editedOrder.price) {
      newErrors.price = 'Price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Here you would typically make an API call to update the order
      console.log('Saving order:', editedOrder);
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEditedOrder({
      ...editedOrder,
      [field]: value
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const renderInput = (
    label: string,
    field: string,
    value: string | number,
    type: 'text' | 'number' = 'text'
  ) => (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => handleInputChange(field, type === 'number' ? Number(e.target.value) : e.target.value)}
        className={`w-full px-3 py-2 rounded border ${
          errors[field] 
            ? 'border-rose-500 dark:border-rose-500' 
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
        focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
        placeholder={label}
      />
      {errors[field] && (
        <p className="text-sm text-rose-500 mt-1">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[800px] max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {isEditing ? 'Edit Order' : 'Order Details'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedOrder(order);
                      setErrors({});
                    }}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300"
                >
                  Edit Order
                </button>
              )}
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)] space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-primary-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {order.id}
                </span>
              </div>
              {isEditing ? (
                <select
                  value={editedOrder.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                           focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  {orderStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              ) : (
                <StatusBadge status={editedOrder.status} />
              )}
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-primary-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Date
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">{order.date}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Sender Card */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-primary-500" />
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Sender</h3>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={order.sender.avatar}
                  alt={order.sender.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900"
                />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">{order.sender.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">sender@email.com</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">+33 6 12 34 56 78</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Traveler Card */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-secondary-500" />
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Traveler</h3>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={order.traveler.avatar}
                  alt={order.traveler.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-secondary-100 dark:ring-secondary-900"
                />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">{order.traveler.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">traveler@email.com</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">+33 6 98 76 54 32</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Route Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Departure
                  </label>
                  {isEditing ? (
                    renderInput('Departure', 'departure', editedOrder.departure)
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">{order.departure}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Arrival
                  </label>
                  {isEditing ? (
                    renderInput('Arrival', 'arrival', editedOrder.arrival)
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">{order.arrival}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Package Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight
                  </label>
                  {isEditing ? (
                    renderInput('Weight', 'kg', editedOrder.kg, 'number')
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">{order.kg} kg</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Letters
                  </label>
                  {isEditing ? (
                    renderInput('Letters', 'letters', editedOrder.letters, 'number')
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">{order.letters} pcs</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Payment Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price
                  </label>
                  {isEditing ? (
                    renderInput('Price', 'price', editedOrder.price)
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{order.price}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Status
                  </label>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full text-sm">
                    Paid
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Delivery Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                    <Package className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Order Created</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.date}</p>
                  </div>
                </div>
                {order.status !== 'New Order' && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-900/40 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">In Transit</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Estimated delivery in 2 days</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};