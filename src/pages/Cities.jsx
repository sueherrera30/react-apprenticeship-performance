import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import CityList from '../components/CityList';
import { matchSorter } from 'match-sorter';
import citiesData from '../data/us-cities.json';
import { debounce } from '../utils/functions';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const debouncedFilterHandler = useRef(debounce(getCitiesByName, 500)).current;

  const setValue = (id, key, value) => {
    setCities((cities) => {
      const citiesCopy = _.cloneDeep(cities);
      const cityIndex = citiesCopy.findIndex((city) => city.id === id);
      citiesCopy[cityIndex][key] = value;
      return citiesCopy;
    });
  };

  function getCitiesByName(cities, cityName) {
    const filteredCities = matchSorter(cities, cityName, {
      keys: ['name'],
    });
    setFilteredCities(filteredCities);
  }

  const handleNameChange = (evt) => {
    const name = evt.target.value;
    setNameFilter(name);
    debouncedFilterHandler(cities, name);
  };

  useEffect(() => {
    const data = citiesData.slice(0, 100);
    setCities(data);
    getCitiesByName(data, '');
  }, []);

  useEffect(() => {
    getCitiesByName(cities, nameFilter);
  }, [cities]);

  return (
    <div>
      <label>Find Cities</label>
      <input value={nameFilter} onChange={handleNameChange} />
      <CityList cities={filteredCities} setValue={setValue} />
    </div>
  );
};

export default Cities;
