// src/components/Navbar.js
// Navigation bar component with links and authentication controls
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginForm from './LoginForm';

function Navbar() {
  // Access user and logout function from context
  const { user, logout } = useContext(AuthContext);
  // State to control login modal visibility
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Bootstrap navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          {/* App logo/link */}
          <Link className="navbar-brand" to="/">Countries App</Link>
          <div className="navbar-nav">
            {/* Countries page link */}
            <Link className="nav-link text-white" to="/countries">Countries</Link>
            {/* Favorites link (visible when logged in) */}
            {user && (
              <Link className="nav-link text-white" to="/favorites">Favorites</Link>
            )}
            {/* Login/Logout button */}
            {user ? (
              <button className="btn btn-outline-light ms-2" onClick={logout}>
                Logout ({user.username})
              </button>
            ) : (
              <button className="btn btn-outline-light ms-2" onClick={() => setShowLogin(true)}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      {/* Login modal (shown when needed) */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default Navbar;