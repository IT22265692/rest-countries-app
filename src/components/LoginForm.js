// src/components/LoginForm.js
// Modal form for user login
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginForm({ onClose }) {
  // State for username input
  const [username, setUsername] = useState('');
  // Access login function from context
  const { login } = useContext(AuthContext);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      onClose();
    }
  };

  return (
    // Modal overlay
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {/* Modal title */}
            <h5 className="modal-title">Login</h5>
            {/* Close button */}
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* Login form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;