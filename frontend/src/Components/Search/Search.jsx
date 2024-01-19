import { CiSearch } from "react-icons/ci";
import "./Search.css";

const Search = () => {


  // ----- Search component with input field and search button
  
  return (
    <div className="search">
      <input placeholder="Sök..." type="text" />
      <button>
        <CiSearch />
      </button>
    </div>
  );
};

export default Search;
