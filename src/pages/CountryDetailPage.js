// src/pages/CountryDetailPage.js
// Page to display detailed information about a single country
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CountryDetailPage() {
  // Get country code from URL parameters
  const { code } = useParams();
  // State for country details
  const [country, setCountry] = useState(null);

  // Fetch country details on mount or when code changes
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch((error) => console.error('Error fetching country details:', error));
  }, [code]);

  // Show loading state if data is not yet available
  if (!country) return <div className="text-center">Loading...</div>;

  return (
    // Container for country details
    <div className="country-detail">
      {/* Back to countries link */}
      <Link to="/countries" className="btn btn-outline-secondary mb-4">
        Back to Countries
      </Link>
      <div className="row">
        {/* Country flag */}
        <div className="col-md-6">
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            className="img-fluid mb-3"
          />
        </div>
        {/* Country information */}
        <div className="col-md-6">
          <h1>{country.name.common}</h1>
          <p><strong>Official Name:</strong> {country.name.official}</p>
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
          <p><strong>Area:</strong> {country.area?.toLocaleString()} km²</p>
          <p><strong>Currency:</strong> {Object.values(country.currencies || {})[0]?.name || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetailPage;