// src/pages/FavoritesPage.js
// Page to display the user's favorite countries
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CountryList from '../components/CountryList';

function FavoritesPage() {
  // Access user from authentication context
  const { user } = useContext(AuthContext);
  // State for favorite countries
  const [favoriteCountries, setFavoriteCountries] = useState([]);

  // Fetch favorite countries when user changes
  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      // Get favorite country codes from localStorage
      const favorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
      if (favorites.length > 0) {
        try {
          // Fetch details for favorite countries
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

    // Update favorites when storage changes
    window.addEventListener('storage', fetchFavorites);
    return () => window.removeEventListener('storage', fetchFavorites);
  }, [user]);

  // Prompt login if user is not authenticated
  if (!user) {
    return <div>Please log in to view your favorite countries.</div>;
  }

  return (
    <div>
      {/* Page title */}
      <h1>Your Favorite Countries</h1>
      {/* Display favorites or empty message */}
      {favoriteCountries.length > 0 ? (
        <CountryList countries={favoriteCountries} />
      ) : (
        <p>You haven't added any favorite countries yet.</p>
      )}
    </div>
  );
}

export default FavoritesPage;