import React, { useState } from 'react';
import { Leaf, Info, Car, TreePine } from 'lucide-react';

interface CO2ModalProps {
  co2Saved: number;
  onClose: () => void;
}

export const CO2Modal: React.FC<CO2ModalProps> = ({ co2Saved, onClose }) => {
  const [distance, setDistance] = useState(1000); // km
  const [weight, setWeight] = useState(1); // tonnes

  const calculateCO2 = (distance: number, weight: number) => {
    return distance * weight * 0.5;
  };

  const treesEquivalent = Math.round(co2Saved / 21); // Average tree absorbs 21kg CO2 per year
  const carKmEquivalent = Math.round(co2Saved * 6); // Average car emits 0.17kg CO2 per km

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-[600px] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Leaf className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                CO₂ Savings Calculator
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-medium text-emerald-800 dark:text-emerald-200">
                Total CO₂ Saved
              </h3>
            </div>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {co2Saved.toLocaleString()} kg
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Distance (km)
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>100 km</span>
                <span>{distance} km</span>
                <span>5000 km</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weight (tonnes)
              </label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>0.1 t</span>
                <span>{weight} t</span>
                <span>10 t</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Calculated CO₂ Savings:
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {calculateCO2(distance, weight).toLocaleString()} kg CO₂
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TreePine className="w-5 h-5 text-emerald-500" />
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Trees Equivalent
                </h4>
              </div>
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                {treesEquivalent.toLocaleString()} trees
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Annual CO₂ absorption
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5 text-emerald-500" />
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Car Travel Saved
                </h4>
              </div>
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                {carKmEquivalent.toLocaleString()} km
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Average car emissions
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Learn more about CO₂ calculations
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};