import { HiLocationMarker } from 'react-icons/hi';
import React from 'react';

const searchBarStyle = {
    backgroundColor: '#fff',
    borderRadius: '22px',
    border: '6px solid rgba(120, 120, 120, 0.374)',
    padding: '.5rem 1rem',
    width: '40%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const SearchBar = ({ filter, setFilter }) => {
    return (
        <div style={searchBarStyle}>
            <HiLocationMarker color="var(--blue)" size={25} />
            <input
                style={{ flex: 1, marginLeft: '0.5rem', marginRight: '0.5rem', padding: '0.5rem', border: 'none', outline: 'none' }}
                placeholder="Search ..."
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <button className="bg-purple-700 text-white font-bold py-1 px-4 border rounded ">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
