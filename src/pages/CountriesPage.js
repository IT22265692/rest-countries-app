import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CountryList from '../components/CountryList';

function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleSearch = (query) => {
    if (query) {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => {
          setFilteredCountries(response.data);
        })
        .catch(() => setFilteredCountries([]));
    } else {
      setFilteredCountries(countries);
    }
  };

  const handleFilter = (region) => {
    if (region) {
      axios
        .get(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => {
          setFilteredCountries(response.data);
        })
        .catch((error) => console.error('Error filtering by region:', error));
    } else {
      setFilteredCountries(countries);
    }
  };

  return (
    <div>
      <h1>Explore Countries</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />
      {filteredCountries.length > 0 ? (
        <CountryList countries={filteredCountries} />
      ) : (
        <p>No countries found.</p>
      )}
    </div>
  );
}

export default CountriesPage;