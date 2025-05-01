// src/components/CountryCard.js
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

function CountryCard({ country }) {
  const { user } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(() => {
    if (!user) return false;
    const favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
    return favorites.includes(country.cca3);
  });

  // Update isFavorite when localStorage changes (e.g., from another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      if (!user) return;
      const favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
      setIsFavorite(favorites.includes(country.cca3));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, country.cca3]);

  const toggleFavorite = () => {
    if (!user) return;
    const favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
    let updatedFavorites;
    if (favorites.includes(country.cca3)) {
      updatedFavorites = favorites.filter((id) => id !== country.cca3);
    } else {
      updatedFavorites = [...favorites, country.cca3];
    }
    localStorage.setItem(`favorites_${user.username}`, JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite); // Update state to trigger re-render
    window.dispatchEvent(new Event('storage')); // Still useful for cross-tab updates
  };

  return (
    <div className="card h-100">
      <img
        src={country?.flags?.png || 'default-flag.png'} // Add fallback
        className="card-img-top"
        alt={`${country?.name?.common || 'Country'} flag`}
      />
      <div className="card-body">
        <h5 className="card-title">{country?.name?.common || 'N/A'}</h5>
        <p className="card-text">
          <strong>Capital:</strong> {country?.capital?.[0] || 'N/A'}<br />
          <strong>Region:</strong> {country?.region || 'N/A'}<br />
          <strong>Population:</strong> {country?.population?.toLocaleString() || 'N/A'}
        </p>
        <Link to={`/country/${country?.cca3 || ''}`} className="btn btn-primary me-2">
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