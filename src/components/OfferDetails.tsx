import React, { useState } from 'react';
import { MessageSquare, Calendar, MapPin, Scale, Mail, CreditCard, Clock, TrendingDown, Phone, User, ArrowRight, Package } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { OrderDetails } from './OrderDetails';

interface OfferDetailsProps {
  offer: {
    id: string;
    date: string;
    departure: string;
    arrival: string;
    initialPrice: string;
    finalPrice: string;
    status: string;
    sender: {
      name: string;
      avatar: string;
    };
    traveler: {
      name: string;
      avatar: string;
    };
    package: {
      weight: number;
      letters: number;
      description: string;
    };
    negotiation: {
      rounds: number;
      duration: string;
      priceReduction: string;
    };
  };
  onClose: () => void;
}

const offerStatuses = ['Pending', 'Converted', 'Rejected', 'Expired'] as const;

export const OfferDetails: React.FC<OfferDetailsProps> = ({ offer, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOffer, setEditedOffer] = useState(offer);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedOffer.departure) {
      newErrors.departure = 'Departure is required';
    }
    if (!editedOffer.arrival) {
      newErrors.arrival = 'Arrival is required';
    }
    if (!editedOffer.finalPrice) {
      newErrors.finalPrice = 'Final price is required';
    }
    if (!editedOffer.package.description) {
      newErrors.description = 'Package description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Here you would typically make an API call to update the offer
      console.log('Saving offer:', editedOffer);
      setIsEditing(false);
    }
  };

  const handleInputChange = (
    field: string,
    value: string,
    nestedField?: string
  ) => {
    if (nestedField) {
      setEditedOffer({
        ...editedOffer,
        [field]: {
          ...editedOffer[field as keyof typeof editedOffer],
          [nestedField]: value
        }
      });
    } else {
      setEditedOffer({
        ...editedOffer,
        [field]: value
      });
    }
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
    value: string,
    nestedField?: string
  ) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(field, e.target.value, nestedField)}
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

  const hasConvertedToOrder = editedOffer.status.toLowerCase() === 'converted';

  // Mock order data based on the offer
  const orderData = hasConvertedToOrder ? {
    id: `ORD${offer.id.slice(4)}`,
    date: offer.date,
    departure: offer.departure,
    arrival: offer.arrival,
    kg: offer.package.weight,
    letters: offer.package.letters,
    price: offer.finalPrice,
    status: 'New Order',
    sender: offer.sender,
    traveler: offer.traveler
  } : null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl w-[800px] max-h-[90vh] overflow-hidden shadow-xl">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {isEditing ? 'Edit Offer' : 'Offer Details'}
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
                        setEditedOffer(offer);
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
                    Edit Offer
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
                  <MessageSquare className="w-5 h-5 text-primary-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {offer.id}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <select
                      value={editedOffer.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                               focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                      {offerStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  ) : (
                    <StatusBadge status={editedOffer.status} />
                  )}
                  {hasConvertedToOrder && (
                    <button
                      onClick={() => setShowOrderDetails(true)}
                      className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      <Package className="w-4 h-4" />
                      View Order Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{offer.date}</span>
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
                    src={offer.sender.avatar}
                    alt={offer.sender.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">{offer.sender.name}</h4>
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
                    src={offer.traveler.avatar}
                    alt={offer.traveler.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-secondary-100 dark:ring-secondary-900"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">{offer.traveler.name}</h4>
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
                      renderInput('Departure', 'departure', editedOffer.departure)
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">{offer.departure}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Arrival
                    </label>
                    {isEditing ? (
                      renderInput('Arrival', 'arrival', editedOffer.arrival)
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">{offer.arrival}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Package Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Weight
                    </label>
                    <span className="text-gray-600 dark:text-gray-400">
                      {offer.package.weight} kg
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Letters
                    </label>
                    <span className="text-gray-600 dark:text-gray-400">
                      {offer.package.letters} pcs
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    {isEditing ? (
                      renderInput('Description', 'package', editedOffer.package.description, 'description')
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">
                        {offer.package.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Price Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Initial Price
                    </label>
                    <span className="text-gray-600 dark:text-gray-400">
                      {offer.initialPrice}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Final Price
                    </label>
                    {isEditing ? (
                      renderInput('Final Price', 'finalPrice', editedOffer.finalPrice)
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {offer.finalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Negotiation Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Clock className="w-4 h-4" />
                      <span>Duration</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">
                      {offer.negotiation.duration}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>Rounds</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">
                      {offer.negotiation.rounds}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <TrendingDown className="w-4 h-4" />
                      <span>Price Reduction</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">
                      {offer.negotiation.priceReduction}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOrderDetails && orderData && (
        <OrderDetails
          order={orderData}
          onClose={() => setShowOrderDetails(false)}
        />
      )}
    </>
  );
};