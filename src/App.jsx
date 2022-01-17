import React, { useRef, useState, useReducer } from 'react';
import { throttle } from './utils/functions';

const Cities = React.lazy(() => import('./pages/Cities'));

const App = () => {
  const forceRerender = useReducer(() => ({}))[1];
  const [showCities, setShowCities] = useState(false);
  const throttledToggleHandler = useRef(
    throttle(handleToggleClick, 2000)
  ).current;

  function handleToggleClick() {
    setShowCities((showCities) => !showCities);
  }

  return (
    <div>
      <button onClick={throttledToggleHandler}>Toggle Cities</button>
      <button onClick={forceRerender}>Force Rerender</button>
      <React.Suspense fallback={<div>Loading...</div>}>
        {showCities && <Cities />}
      </React.Suspense>
    </div>
  );
};

export default App;
