import CountryCard from './CountryCard';

function CountryList({ countries }) {
  return (
    <div className="row">
      {countries.map((country) => (
        <div key={country.cca3} className="col-md-4 mb-4">
          <CountryCard country={country} />
        </div>
      ))}
    </div>
  );
}

export default CountryList;