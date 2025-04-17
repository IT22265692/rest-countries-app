function FilterBar({ onFilter }) {
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
    return (
      <div className="mb-3">
        <select className="form-select" onChange={(e) => onFilter(e.target.value)}>
          <option value="">Filter by Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default FilterBar;