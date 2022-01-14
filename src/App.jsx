import React, { useState, useReducer } from 'react';
import Cities from './pages/Cities';

const App = () => {
  const forceRerender = useReducer(() => ({}))[1];
  const [showCities, setShowCities] = useState(false);

  const handleToggleClick = () => {
    setShowCities((showCities) => !showCities);
  };

  return (
    <div>
      <button onClick={handleToggleClick}>Toggle Cities</button>
      <button onClick={forceRerender}>Force Rerender</button>
      {showCities && <Cities />}
    </div>
  );
};

export default App;
