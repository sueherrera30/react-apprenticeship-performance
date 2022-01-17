import _ from 'lodash';
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

export default React.memo(CityInput, (prevProps, nextProps) =>
  _.isEqual(prevProps.city, nextProps.city)
);
