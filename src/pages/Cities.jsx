import React, {
  useEffect,
  useState,
  useReducer,
} from 'react';
import _ from 'lodash';
import CityList from '../components/CityList';
import { matchSorter } from 'match-sorter';
import citiesData from '../data/us-cities.json';

const Cities = () => {
  const forceRerender = useReducer(() => ({}))[1];
  const [cities, setCities] = useState(citiesData);
  const [nameFilter, setNameFilter] = useState('');

  const setValue = (id, key, value) => {
    setCities((cities) => {
      const citiesCopy = _.cloneDeep(cities);
      const cityIndex = citiesCopy.findIndex(
        (city) => city.id === id
      );
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

  const onChangeName = (evt) => {
    const name = evt.target.value;
    setNameFilter(name);
  };

  useEffect(() => {
    setCities(citiesData);
  }, []);

  return (
    <div>
      <label>Find Cities</label>
      <input value={nameFilter} onChange={onChangeName} />
      <button onClick={forceRerender}>
        Force Rerender
      </button>
      <CityList
        cities={getCitiesByName()}
        setValue={setValue}
      />
    </div>
  );
};

export default Cities;
