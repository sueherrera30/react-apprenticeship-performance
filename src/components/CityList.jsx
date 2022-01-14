import React from 'react';
import CityInput from './CityInput';

const CityList = ({ cities, setValue }) => {
  return (
    <div>
      {cities.map((city) => (
        <CityInput key={city.id} city={city} setValue={setValue} />
      ))}
    </div>
  );
};

export default CityList;
