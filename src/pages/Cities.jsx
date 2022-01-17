import React, { useEffect, useState, useRef } from 'react';
import CityList from '../components/CityList';
import { matchSorter } from 'match-sorter';
import citiesData from '../data/us-cities.json';
import { debounce } from '../utils/functions';
import { useCities } from '../contexts/CitiesContext';

const Cities = () => {
  const { cities } = useCities();
  const [nameFilter, setNameFilter] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const debouncedFilterHandler = useRef(
    debounce(getCitiesByName, 1000)
  ).current;

  console.log('re-render');
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
    getCitiesByName(data, '');
  }, []);

  useEffect(() => {
    console.log('cities cambio');
  }, [cities]);

  return (
    <div>
      <label>Find Cities</label>
      <input value={nameFilter} onChange={handleNameChange} />
      <CityList cities={filteredCities} />
    </div>
  );
};

export default React.memo(Cities);
