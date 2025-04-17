function SearchBar({ onSearch }) {
    const handleSearch = (e) => {
      onSearch(e.target.value);
    };
  
    return (
      <div className="mb-3">
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