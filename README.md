Step 1: Setup Your Environment
Install Required Tools

# Install Node.js from nodejs.org first, then:
npx create-react-app structural-load-calculator
cd structural-load-calculator
npm start
Install Dependencies

npm install recharts tailwindcss @tailwindcss/forms
npx tailwindcss init
Step 2: Project Structure
structural-load-calculator/
├── public/
├── src/
│   ├── components/
│   │   ├── InputForm.jsx
│   │   ├── ResultCard.jsx
│   │   ├── LoadChart.jsx
│   │   └── Header.jsx
│   ├── utils/
│   │   └── loadCalculations.js
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
Step 3: Core Calculation Logic
Create src/utils/loadCalculations.js:


// Standard load calculation formulas (IS 875 / ASCE 7)

export const calculateDeadLoad = (thickness, unitWeight) => {
  // Dead Load = thickness(m) × unit weight(kN/m³)
  return thickness * unitWeight;
};

export const calculateLiveLoad = (occupancyType) => {
  // Standard live loads per IS 875 Part 2
  const liveLoads = {
    residential: 2.0,    // kN/m²
    office: 3.0,         // kN/m²
    commercial: 4.0,     // kN/m²
    industrial: 5.0,     // kN/m²
    storage: 7.5,        // kN/m²
  };
  return liveLoads[occupancyType] || 2.0;
};

export const calculateWindLoad = (basicWindSpeed, area) => {
  // Simplified wind pressure = 0.6 × V²  (N/m²)
  const windPressure = 0.6 * Math.pow(basicWindSpeed, 2) / 1000; // kN/m²
  return windPressure * area;
};

export const calculateTotalLoad = ({
  deadLoad,
  liveLoad,
  windLoad = 0,
  area,
}) => {
  // Factored Load (IS 456): 1.5(DL + LL)
  const unfactored = (deadLoad + liveLoad) * area;
  const factored = 1.5 * unfactored + windLoad;

  return {
    deadLoadTotal: deadLoad * area,
    liveLoadTotal: liveLoad * area,
    unfactoredTotal: unfactored,
    factoredTotal: factored,
  };
};
Step 4: Input Form Component
Create src/components/InputForm.jsx:


import React, { useState } from 'react';

const InputForm = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    slabThickness: '',
    unitWeight: 25,        // kN/m³ for concrete
    occupancyType: 'residential',
    length: '',
    width: '',
    basicWindSpeed: 44,    // m/s default (IS 875)
    includeWind: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        📐 Input Parameters
      </h2>

      {/* Slab Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Slab Thickness (m)
          </label>
          <input
            type="number"
            name="slabThickness"
            value={inputs.slabThickness}
            onChange={handleChange}
            placeholder="e.g. 0.15"
            step="0.01"
            required
            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 
                       focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Unit Weight (kN/m³)
          </label>
          <input
            type="number"
            name="unitWeight"
            value={inputs.unitWeight}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 
                       focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Area */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Length (m)
          </label>
          <input
            type="number"
            name="length"
            value={inputs.length}
            onChange={handleChange}
            placeholder="e.g. 5"
            required
            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 
                       focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Width (m)
          </label>
          <input
            type="number"
            name="width"
            value={inputs.width}
            onChange={handleChange}
            placeholder="e.g. 4"
            required
            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 
                       focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Occupancy */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Occupancy Type
        </label>
        <select
          name="occupancyType"
          value={inputs.occupancyType}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2 focus:ring-2 
                     focus:ring-blue-400 outline-none"
        >
          <option value="residential">Residential (2.0 kN/m²)</option>
          <option value="office">Office (3.0 kN/m²)</option>
          <option value="commercial">Commercial (4.0 kN/m²)</option>
          <option value="industrial">Industrial (5.0 kN/m²)</option>
          <option value="storage">Storage (7.5 kN/m²)</option>
        </select>
      </div>

      {/* Wind Load Toggle */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          name="includeWind"
          checked={inputs.includeWind}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label className="text-sm font-medium text-gray-600">
          Include Wind Load
        </label>
      </div>

      {inputs.includeWind && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Basic Wind Speed (m/s)
          </label>
          <input
            type="number"
            name="basicWindSpeed"
            value={inputs.basicWindSpeed}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 
                       focus:ring-blue-400 outline-none"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                   font-bold py-3 rounded-lg transition duration-200"
      >
        ⚡ Calculate Load
      </button>
    </form>
  );
};

export default InputForm;
Step 5: Results Card Component
Create src/components/ResultCard.jsx:


import React from 'react';

const ResultCard = ({ results }) => {
  if (!results) return null;

  const cards = [
    {
      label: 'Dead Load Total',
      value: results.deadLoadTotal,
      color: 'bg-orange-100 border-orange-400',
      icon: '🏗️',
    },
    {
      label: 'Live Load Total',
      value: results.liveLoadTotal,
      color: 'bg-green-100 border-green-400',
      icon: '👥',
    },
    {
      label: 'Unfactored Total',
      value: results.unfactoredTotal,
      color: 'bg-blue-100 border-blue-400',
      icon: '📊',
    },
    {
      label: 'FactRequest timed out after 30000ms
