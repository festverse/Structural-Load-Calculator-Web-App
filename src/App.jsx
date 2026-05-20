import { useState } from 'react';

function App() {
  const [deadLoad, setDeadLoad] = useState('');
  const [liveLoad, setLiveLoad] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const total = 
      parseFloat(deadLoad) + parseFloat(liveLoad);
    setResult(total);
  };

  return (
    <div>
      <h1>Structural Load Calculator</h1>

      <input
        type="number"
        placeholder="Dead Load (kN)"
        value={deadLoad}
        onChange={(e) => setDeadLoad(e.target.value)}
      />

      <input
        type="number"
        placeholder="Live Load (kN)"
        value={liveLoad}
        onChange={(e) => setLiveLoad(e.target.value)}
      />

      <button onClick={calculate}>
        Calculate
      </button>

      {result !== null && (
        <p>Total Load: {result} kN</p>
      )}
    </div>
  );
}

export default App;
