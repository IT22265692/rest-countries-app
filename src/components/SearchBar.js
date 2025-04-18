// src/components/SearchBar.js
// Component for searching countries by name
function SearchBar({ onSearch }) {
  // Handle input changes and pass to parent
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-3">
      {/* Search input field */}
      <input
        type="text"
        className="form-control"
        placeholder="Search for a country..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;