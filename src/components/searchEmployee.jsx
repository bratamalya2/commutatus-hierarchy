import SearchIcon from "@mui/icons-material/Search";

import "../styles/searchIcon.css";

function SearchEmployee({ searchText, setSearchText }) {
  return (
    <div className="search-container">
      <SearchIcon color="primary" />
      <input
        type="text"
        onInput={(e) => setSearchText(e.target.value)}
        placeholder="Search employee by name, phone, email"
        value={searchText}
      />
    </div>
  );
}

export default SearchEmployee;
