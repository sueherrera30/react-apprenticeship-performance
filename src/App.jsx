import React, { useRef, useState, useReducer } from 'react';
import { CitiesProvider } from './contexts/CitiesContext';
import { throttle } from './utils/functions';

const Cities = React.lazy(() => import('./pages/Cities'));

const App = () => {
  const forceRerender = useReducer(() => ({}))[1];
  const [showCities, setShowCities] = useState(false);
  const debouncedToggleHandler = useRef(
    throttle(handleToggleClick, 2000)
  ).current;

  function handleToggleClick() {
    setShowCities((showCities) => !showCities);
  }

  return (
    <div>
      <button onClick={debouncedToggleHandler}>Toggle Cities</button>
      <button onClick={forceRerender}>Force Rerender</button>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CitiesProvider>{showCities && <Cities />}</CitiesProvider>
      </React.Suspense>
    </div>
  );
};

export default App;
