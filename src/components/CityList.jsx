import React from 'react';
import CityInput from './CityInput';

const CityList = ({ cities }) => {
  return (
    <div>
      {cities.map((city) => (
        <CityInput key={city.id} city={city} />
      ))}
    </div>
  );
};

export default CityList;
