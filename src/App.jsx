import React, { useRef, useState } from 'react';
import { throttle } from './utils/functions';

const Cities = React.lazy(() => import('./pages/Cities'));

const App = () => {
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
      <React.Suspense fallback={<div>Loading...</div>}>
        {showCities && <Cities />}
      </React.Suspense>
    </div>
  );
};

export default App;
