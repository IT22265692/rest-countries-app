// src/components/CountryList.js
// Component to render a grid of country cards
import CountryCard from './CountryCard';

function CountryList({ countries }) {
  return (
    // Bootstrap grid for country cards
    <div className="row">
      {countries.map((country) => (
        // Column for each country card
        <div key={country.cca3} className="col-md-4 mb-4">
          <CountryCard country={country} />
        </div>
      ))}
    </div>
  );
}

export default CountryList;