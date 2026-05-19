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
