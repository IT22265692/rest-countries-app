// src/pages/HomePage.js
// Homepage component displaying welcome message and navigation to countries
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    // Container for homepage with centered content
    <div className="home-page text-center">
      {/* Overlay for text and button with gradient background */}
      <div className="home-overlay">
        {/* Tagline for the app */}
        <h1>🌍 Explore the World, One Country at a Time!</h1>
        {/* Description of app purpose */}
        <p>
          Welcome to the Countries App — your ultimate guide to discovering fascinating facts,
          cultures, landmarks, and more from every corner of the globe.
        </p>
        {/* Link to countries page */}
        <Link to="/countries" className="btn btn-primary btn-lg home-button">
          Explore Countries
        </Link>
      </div>
    </div>
  );
}

export default HomePage;