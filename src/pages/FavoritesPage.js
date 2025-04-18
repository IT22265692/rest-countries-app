import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CountryList from '../components/CountryList';

function FavoritesPage() {
  const { user } = useContext(AuthContext);
  const [favoriteCountries, setFavoriteCountries] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
      if (favorites.length > 0) {
        try {
          const response = await axios.get('https://restcountries.com/v3.1/alpha', {
            params: { codes: favorites.join(',') },
          });
          setFavoriteCountries(response.data);
        } catch (error) {
          console.error('Error fetching favorite countries:', error);
        }
      } else {
        setFavoriteCountries([]);
      }
    };

    fetchFavorites();

    // Listen for storage changes
    window.addEventListener('storage', fetchFavorites);
    return () => window.removeEventListener('storage', fetchFavorites);
  }, [user]);

  if (!user) {
    return <div>Please log in to view your favorite countries.</div>;
  }

  return (
    <div>
      <h1>Your Favorite Countries</h1>
      {favoriteCountries.length > 0 ? (
        <CountryList countries={favoriteCountries} />
      ) : (
        <p>You haven't added any favorite countries yet.</p>
      )}
    </div>
  );
}

export default FavoritesPage;