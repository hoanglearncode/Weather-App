import React, { useState } from 'react';
import { Search, Navigation, Map as MapIcon } from 'lucide-react';
import { FAVORITE_CITIES } from '../../utils/constants.jsx';

const SearchBar = ({ 
  onSearch, 
  onGetCurrentLocation, 
  onToggleMap, 
  loading, 
  showMap, 
  mapLoaded 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/70 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
        <button
          onClick={onGetCurrentLocation}
          disabled={loading}
          className="px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Get current location weather"
        >
          <Navigation className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleMap}
          disabled={!mapLoaded}
          className={`px-4 py-3 text-white rounded-xl transition-colors border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed ${
            showMap ? 'bg-white/30' : 'bg-white/20 hover:bg-white/30'
          }`}
          title="Toggle map view"
        >
          <MapIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Favorites */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-white/70 text-sm mr-2">Quick search:</span>
        {FAVORITE_CITIES.map((city) => (
          <button
            key={city}
            onClick={() => onSearch(city)}
            disabled={loading}
            className="px-3 py-1 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;