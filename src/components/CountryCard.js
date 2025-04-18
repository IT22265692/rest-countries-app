import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function CountryCard({ country }) {
  const { user } = useContext(AuthContext);

  const toggleFavorite = () => {
    if (!user) return;
    const favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
    if (favorites.includes(country.cca3)) {
      const updated = favorites.filter((id) => id !== country.cca3);
      localStorage.setItem(`favorites_${user.username}`, JSON.stringify(updated));
    } else {
      favorites.push(country.cca3);
      localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
    }
    // Trigger re-render
    window.dispatchEvent(new Event('storage'));
  };

  const isFavorite = user
    ? (JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || []).includes(country.cca3)
    : false;

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
        <Link to={`/country/${country.cca3}`} className="btn btn-primary me-2">
          View Details
        </Link>
        {user && (
          <button
            className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-secondary'}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
          </button>
        )}
      </div>
    </div>
  );
}

export default CountryCard;