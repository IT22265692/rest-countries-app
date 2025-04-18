// src/App.js
// Main application component that sets up routing and authentication context
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for styling
import HomePage from './pages/HomePage';
import CountriesPage from './pages/CountriesPage';
import CountryDetailPage from './pages/CountryDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext'; // Provides user authentication state
import './App.css'; // Custom styles

function App() {
  return (
    // Wrap app with AuthProvider to manage user login state
    <AuthProvider>
      {/* Router enables client-side navigation */}
      <Router>
        {/* Render navigation bar on all pages */}
        <Navbar />
        {/* Semi-transparent wrapper for content readability */}
        <div className="app-wrapper">
          <div className="container mt-4">
            {/* Define routes for different pages */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/countries" element={<CountriesPage />} />
              <Route path="/country/:code" element={<CountryDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;