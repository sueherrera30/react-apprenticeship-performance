import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import _ from 'lodash';
import citiesData from '../data/us-cities.json';

const CitiesStateContext = createContext();
const CitiesUpdaterContext = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const data = citiesData.slice(0, 100);
    setCities(data);
  }, []);

  return (
    <CitiesStateContext.Provider value={cities}>
      <CitiesUpdaterContext.Provider value={setCities}>
        {children}
      </CitiesUpdaterContext.Provider>
    </CitiesStateContext.Provider>
  );
};

const useCitiesState = () => {
  const context = useContext(CitiesStateContext);

  if (context === undefined) {
    throw new Error('useCitiesState must be used within a CitiesProvider');
  }

  return context;
};

const useCitiesUpdater = () => {
  const setCities = useContext(CitiesUpdaterContext);

  if (setCities === undefined) {
    throw new Error('useCitiesUpdater must be used within a CitiesProvider');
  }

  const setValue = (id, key, value) => {
    setCities((cities) => {
      const citiesCopy = _.cloneDeep(cities);
      const cityIndex = citiesCopy.findIndex((city) => city.id === id);
      citiesCopy[cityIndex][key] = value;
      return citiesCopy;
    });
  };

  return { setValue };
};

export { CitiesProvider, useCitiesState, useCitiesUpdater };
