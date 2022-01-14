import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import CityList from '../components/CityList';
import { matchSorter } from 'match-sorter';
import citiesData from '../data/us-cities.json';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  const setValue = (id, key, value) => {
    setCities((cities) => {
      const citiesCopy = _.cloneDeep(cities);
      const cityIndex = citiesCopy.findIndex((city) => city.id === id);
      citiesCopy[cityIndex][key] = value;
      return citiesCopy;
    });
  };

  const getCitiesByName = () => {
    const cityName = nameFilter;
    const filteredCities = matchSorter(cities, cityName, {
      keys: ['name'],
    });
    return filteredCities.slice(0, 100);
  };

  const handleNameChange = (evt) => {
    const name = evt.target.value;
    setNameFilter(name);
  };

  useEffect(() => {
    setCities(citiesData);
  }, []);

  return (
    <div>
      <label>Find Cities</label>
      <input value={nameFilter} onChange={handleNameChange} />
      <CityList cities={getCitiesByName()} setValue={setValue} />
    </div>
  );
};

export default Cities;
