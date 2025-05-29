import React, { useState, useEffect, useRef } from 'react';
import { Search, Navigation, Map, X } from 'lucide-react';

// Mock constants for demo - replace with your actual constants
const FAVORITE_CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Singapore'];

const SearchBar = ({ 
  onSearch, 
  onGetCurrentLocation, 
  onToggleMap, 
  loading = false, 
  showMap = false, 
  mapLoaded = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const searchInputRef = useRef(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
      searchInputRef.current?.blur(); // Hide mobile keyboard
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFavoriteClick = (city) => {
    onSearch(city);
    setShowFavorites(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  // Mobile-first layout with responsive design
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg">
      {/* Main search section */}
      <div className="space-y-3 sm:space-y-4">
        {/* Search input row */}
        <div className="flex gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for a city..."
              className="w-full pl-9 sm:pl-10 pr-10 py-2.5 sm:py-3 bg-white/20 text-white placeholder-white/70 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
              autoComplete="off"
              autoCapitalize="words"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <button
            onClick={handleSearch}
            disabled={loading || !searchQuery.trim()}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
          >
            {loading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="hidden sm:inline">Search</span>
            )}
            <Search className="w-4 h-4 sm:hidden" />
          </button>
        </div>

        {/* Action buttons row */}
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onGetCurrentLocation}
            disabled={loading}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            title="Get current location weather"
          >
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Location</span>
          </button>

          <button
            onClick={onToggleMap}
            disabled={mapLoaded}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 text-white rounded-xl transition-colors border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              showMap ? 'bg-white/30' : 'bg-white/20 hover:bg-white/30'
            }`}
            title="Toggle map view"
          >
            <Map className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">
              {showMap ? 'Hide Map' : 'Show Map'}
            </span>
          </button>

          {/* Mobile favorites toggle */}
          {isMobile && (
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="px-3 py-2.5 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30 text-xs font-medium"
            >
              Cities
            </button>
          )}
        </div>
      </div>

      {/* Favorites section */}
      {(!isMobile || showFavorites) && (
        <div className={`transition-all duration-300 ${
          isMobile ? 'mt-3' : 'mt-4'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white/70 text-xs sm:text-sm font-medium">
              Quick search:
            </span>
            {isMobile && showFavorites && (
              <button
                onClick={() => setShowFavorites(false)}
                className="ml-auto text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className={`flex gap-1.5 sm:gap-2 ${
            isMobile 
              ? 'grid grid-cols-2 gap-2' 
              : 'flex-wrap'
          }`}>
            {FAVORITE_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => handleFavoriteClick(city)}
                disabled={loading}
                className={`text-white text-xs sm:text-sm rounded-full hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium ${
                  isMobile 
                    ? 'px-3 py-2 bg-white/20 text-center' 
                    : 'px-3 py-1 bg-white/20'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile loading overlay */}
      {loading && isMobile && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <div className="bg-white/90 rounded-xl px-4 py-2 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-gray-700 text-sm font-medium">Searching...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;