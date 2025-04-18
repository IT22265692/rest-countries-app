import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginForm from './LoginForm';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">Countries App</Link>
          <div className="navbar-nav">
            <Link className="nav-link text-white" to="/countries">Countries</Link>
            {user && (
              <Link className="nav-link text-white" to="/favorites">Favorites</Link>
            )}
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
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default Navbar;