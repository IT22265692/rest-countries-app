// src/components/CountryCard.js
// Component to display a single country card with details and favorite toggle
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function CountryCard({ country }) {
  // Access user from authentication context
  const { user } = useContext(AuthContext);

  // Toggle favorite status for the country
  const toggleFavorite = () => {
    if (!user) return;
    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
    if (favorites.includes(country.cca3)) {
      // Remove country from favorites
      const updated = favorites.filter((id) => id !== country.cca3);
      localStorage.setItem(`favorites_${user.username}`, JSON.stringify(updated));
    } else {
      // Add country to favorites
      favorites.push(country.cca3);
      localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
    }
    // Trigger re-render of favorites list
    window.dispatchEvent(new Event('storage'));
  };

  // Check if the country is a favorite
  const isFavorite = user
    ? (JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || []).includes(country.cca3)
    : false;

  return (
    // Card container with full height
    <div className="card h-100">
      {/* Country flag image */}
      <img
        src={country.flags.png}
        className="card-img-top"
        alt={`${country.name.common} flag`}
      />
      <div className="card-body">
        {/* Country name */}
        <h5 className="card-title">{country.name.common}</h5>
        {/* Country details */}
        <p className="card-text">
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}<br />
          <strong>Region:</strong> {country.region}<br />
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        {/* Link to country details page */}
        <Link to={`/country/${country.cca3}`} className="btn btn-primary me-2">
          View Details
        </Link>
        {/* Favorite toggle button (visible when logged in) */}
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