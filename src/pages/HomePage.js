import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page text-center">
      <div className="home-overlay">
        <h1>🌍 Explore the World, One Country at a Time!</h1>
        <p>
          Welcome to the Countries App — your ultimate guide to discovering fascinating facts, cultures, landmarks, and more from every corner of the globe.
        </p>
        <Link to="/countries" className="btn btn-primary btn-lg home-button">
          Explore Countries
        </Link>
      </div>
    </div>
  );
}

export default HomePage;