import React, { useState, useReducer } from 'react';
// import Cities from './pages/Cities';
const Cities = React.lazy(() => import('./pages/Cities'))

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
      <React.Suspense fallback={(<p>loading...</p>)}>
        {showCities && <Cities />}
      </React.Suspense>
    </div>
  );
};

export default App;
