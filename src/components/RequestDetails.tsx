import React, { useState } from 'react';
import { Send, Calendar, MapPin, Scale, Mail, CreditCard, Clock, TrendingDown, Phone, User, MessageSquare, ArrowRight, Check, X } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { OfferDetails } from './OfferDetails';

interface RequestDetailsProps {
  request: {
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
    package: {
      weight: number;
      letters: number;
      description: string;
    };
    negotiation: {
      offers: number;
      duration: string;
      priceReduction: string;
    };
  };
  onClose: () => void;
}

const mockOffers = [
  {
    id: 'OFF001',
    date: '2024-03-15',
    traveler: {
      name: 'Thomas Bernard',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4.8
    },
    price: '€300',
    status: 'Pending',
    negotiable: true
  },
  {
    id: 'OFF002',
    date: '2024-03-15',
    traveler: {
      name: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4.9
    },
    price: '€320',
    status: 'Pending',
    negotiable: false
  }
];

export const RequestDetails: React.FC<RequestDetailsProps> = ({ request, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequest, setEditedRequest] = useState(request);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedOfferDetails, setSelectedOfferDetails] = useState<any>(null);
  const [convertedOffer, setConvertedOffer] = useState(
    request.status.toLowerCase() === 'converted' 
      ? {
          id: `OFF${request.id.slice(4)}`,
          date: request.date,
          departure: request.departure,
          arrival: request.arrival,
          initialPrice: request.initialPrice,
          finalPrice: request.finalPrice,
          status: 'Converted',
          sender: request.sender,
          traveler: {
            name: 'Thomas Bernard',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
          },
          package: request.package,
          negotiation: {
            rounds: request.negotiation.offers,
            duration: request.negotiation.duration,
            priceReduction: request.negotiation.priceReduction
          }
        }
      : null
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedRequest.departure) {
      newErrors.departure = 'Departure is required';
    }
    if (!editedRequest.arrival) {
      newErrors.arrival = 'Arrival is required';
    }
    if (!editedRequest.initialPrice) {
      newErrors.initialPrice = 'Initial price is required';
    }
    if (!editedRequest.package.description) {
      newErrors.description = 'Package description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Here you would typically make an API call to update the request
      console.log('Saving request:', editedRequest);
      setIsEditing(false);
    }
  };

  const handleInputChange = (
    field: string,
    value: string,
    nestedField?: string
  ) => {
    if (nestedField) {
      setEditedRequest({
        ...editedRequest,
        [field]: {
          ...editedRequest[field as keyof typeof editedRequest],
          [nestedField]: value
        }
      });
    } else {
      setEditedRequest({
        ...editedRequest,
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

  const renderOffersTable = () => {
    if (request.status.toLowerCase() === 'converted') {
      return (
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">Converted Offer</h3>
            <button
              onClick={() => setSelectedOfferDetails(convertedOffer)}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <MessageSquare className="w-4 h-4" />
              View Offer Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status="Converted" />
            <span className="text-gray-600 dark:text-gray-400">
              Final Price: <span className="text-emerald-600 dark:text-emerald-400 font-medium">{request.finalPrice}</span>
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Current Offers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Offer ID</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Traveler</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Rating</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Price</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Negotiable</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOffers.map((offer) => (
                <tr 
                  key={offer.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600/20"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-primary-600 dark:text-primary-400">
                      {offer.id}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {offer.date}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={offer.traveler.avatar}
                        alt={offer.traveler.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-800 dark:text-gray-200">
                        {offer.traveler.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {offer.traveler.rating}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {offer.price}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={offer.status} />
                  </td>
                  <td className="py-3 px-4">
                    {offer.negotiable ? (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        <Check className="w-5 h-5" />
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">
                        <X className="w-5 h-5" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedOfferDetails({
                        ...offer,
                        departure: request.departure,
                        arrival: request.arrival,
                        initialPrice: request.initialPrice,
                        finalPrice: offer.price,
                        package: request.package,
                        sender: request.sender,
                        negotiation: {
                          rounds: 1,
                          duration: '1 hour',
                          priceReduction: '0%'
                        }
                      })}
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl w-[800px] max-h-[90vh] overflow-hidden shadow-xl">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Send className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {isEditing ? 'Edit Request' : 'Request Details'}
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
                        setEditedRequest(request);
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
                    Edit Request
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
                  <Send className="w-5 h-5 text-primary-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {request.id}
                  </span>
                </div>
                <StatusBadge status={request.status} />
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Date
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{request.date}</span>
              </div>
            </div>

            {/* Sender Card */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-primary-500" />
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Sender</h3>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={request.sender.avatar}
                  alt={request.sender.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900"
                />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">{request.sender.name}</h4>
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

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Route Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Departure
                    </label>
                    {isEditing ? (
                      renderInput('Departure', 'departure', editedRequest.departure)
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">{request.departure}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Arrival
                    </label>
                    {isEditing ? (
                      renderInput('Arrival', 'arrival', editedRequest.arrival)
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">{request.arrival}</span>
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
                      {request.package.weight} kg
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Letters
                    </label>
                    <span className="text-gray-600 dark:text-gray-400">
                      {request.package.letters} pcs
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    {isEditing ? (
                      renderInput('Description', 'package', editedRequest.package.description, 'description')
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">
                        {request.package.description}
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
                    {isEditing ? (
                      renderInput('Initial Price', 'initialPrice', editedRequest.initialPrice)
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">
                        {request.initialPrice}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Final Price
                    </label>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {request.finalPrice}
                    </span>
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
                      {request.negotiation.duration}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Send className="w-4 h-4" />
                      <span>Offers</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">
                      {request.negotiation.offers}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <TrendingDown className="w-4 h-4" />
                      <span>Price Reduction</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">
                      {request.negotiation.priceReduction}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add the offers table */}
            {renderOffersTable()}
          </div>
        </div>
      </div>

      {selectedOfferDetails && (
        <OfferDetails
          offer={selectedOfferDetails}
          onClose={() => setSelectedOfferDetails(null)}
        />
      )}
    </>
  );
};