import React from 'react';

const CityInput = ({ city, setValue }) => {
  return (

    <input
      key={`${city.lat}-${city.lng}`}
      value={city.name}
      onChange={(evt) => setValue(city.id, 'name', evt.target.value)}
    />
  );
};

export default React.memo(CityInput, (prepProps, nextProps) => prepProps.name === nextProps.name && prepProps.setValue === nextProps.setValue);
