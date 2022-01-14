import React, { useState } from 'react';

const Cities = React.lazy(() => import('./pages/Cities'));

const App = () => {
  const [showCities, setShowCities] = useState(false);
  return (
    <div>
      <button
        onClick={() =>
          setShowCities((showCities) => !showCities)
        }
      >
        Toggle Cities
      </button>
      <React.Suspense fallback={<div>Loading...</div>}>
        {showCities && <Cities />}
      </React.Suspense>
    </div>
  );
};

export default App;
