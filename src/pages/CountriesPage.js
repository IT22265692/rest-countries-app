// src/pages/CountriesPage.js
// Page to display a list of countries with search and filter functionality
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CountryList from '../components/CountryList';

function CountriesPage() {
  // State for all countries and filtered countries
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch all countries on component mount
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Handle search by country name
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

  // Handle filter by region
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
      {/* Page title */}
      <h1>Explore Countries</h1>
      {/* Search input */}
      <SearchBar onSearch={handleSearch} />
      {/* Region filter dropdown */}
      <FilterBar onFilter={handleFilter} />
      {/* Display country list or empty message */}
      {filteredCountries.length > 0 ? (
        <CountryList countries={filteredCountries} />
      ) : (
        <p>No countries found.</p>
      )}
    </div>
  );
}

export default CountriesPage;