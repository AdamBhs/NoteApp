import { FaSearch } from 'react-icons/fa';
import './styleSearch.css';

// eslint-disable-next-line react/prop-types
export default function Search({ value, onChange, handleSearch }) {
 return (
  <div className="search-container">
   <input
    type="text"
    placeholder="Search Notes"
    value={value}
    onChange={onChange}
   />
   <FaSearch className="i-search" onClick={handleSearch} />
  </div>
 );
}
