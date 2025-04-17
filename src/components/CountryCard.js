import { Link } from 'react-router-dom';

function CountryCard({ country }) {
  return (
    <div className="card h-100">
      <img
        src={country.flags.png}
        className="card-img-top"
        alt={`${country.name.common} flag`}
      />
      <div className="card-body">
        <h5 className="card-title">{country.name.common}</h5>
        <p className="card-text">
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}<br />
          <strong>Region:</strong> {country.region}<br />
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <Link to={`/country/${country.cca3}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CountryCard;