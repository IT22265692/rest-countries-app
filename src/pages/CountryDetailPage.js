import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CountryDetailPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch((error) => console.error('Error fetching country details:', error));
  }, [code]);

  if (!country) return <div className="text-center">Loading...</div>;

  return (
    <div className="country-detail">
      <Link to="/countries" className="btn btn-outline-secondary mb-4">
        Back to Countries
      </Link>
      <div className="row">
        <div className="col-md-6">
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            className="img-fluid mb-3"
          />
        </div>
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