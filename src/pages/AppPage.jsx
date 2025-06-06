import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import CurrentWeather from '../components/weather/CurrentWeather';
import ForecastCard from '../components/weather/ForecastCard';
import WeatherMap from '../components/map/WeatherMap';
import Footer from '../components/layout/Footer';
import { useWeatherData } from '../hooks/useWeatherData';
import { useGeolocation } from '../hooks/useGeolocation';
import ActivityPage from './ActivityPage';
import { AppContext } from '../hooks/useActivity';

const App = () => {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    searchWeatherByCity,
    searchWeatherByCoords,
    setError
  } = useWeatherData();

  console.log('Current Weather:', currentWeather);
  const { currentLocation, getCurrentPosition, setCurrentLocation } = useGeolocation();
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const {tab, setTab  } = React.useContext(AppContext);
  // Handle search
  const handleSearch = (query) => {
    searchWeatherByCity(query);
  };

  // Get current location weather
  const handleGetCurrentLocation = async () => {
    try {
      const location = await getCurrentPosition();
      await searchWeatherByCoords(location.lat, location.lng);
    } catch (error) {
      setError(error.message);
      // Fallback to default city if geolocation fails
      if (!currentWeather) {
        searchWeatherByCity('Ho Chi Minh City');
      }
    }
  };

  // Handle map click
  const handleMapClick = async (lat, lng) => {
    setCurrentLocation({ lat, lng });
    await searchWeatherByCoords(lat, lng);
  };

  // Toggle map visibility
  const toggleMap = () => {
    setShowMap(!showMap);
  };

  // Load weather on component mount - get user's location first
  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header />

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onGetCurrentLocation={handleGetCurrentLocation}
          onToggleMap={toggleMap}
          loading={loading}
          showMap={showMap}
          mapLoaded={mapLoaded}
        />
        <div className='flex  w-full bg-white/10 backdrop-blur-md rounded-2xl items-center justify-center mb-8'>
            <button className={`text-center w-1/2 py-3 px-5 text-xl font-semibold text-gray-600 ${tab ? "bg-white rounded-l-2xl border-b-2 border-green-600" : ""}`} onClick={()=>{setTab(!tab)}}>Weather</button>
            <button className={`text-center w-1/2 py-3 px-5 text-xl font-semibold text-gray-600 ${tab ? "" : "bg-white rounded-r-2xl  border-b-2 border-green-600"}`} onClick={()=>{setTab(!tab)}}>Activity</button>
        </div>
        {/* Main Content Grid */}
        <div className={`grid gap-6 ${showMap ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {/* Weather Content */}

          
          {tab ? (<div className="space-y-6">
            {/* Loading */}
            {loading && <LoadingSpinner />}

            {/* Error */}
            {error && <ErrorMessage message={error} />}

            {/* Current Weather */}
            {currentWeather && !loading && (
              <div className="felx flex-col w-[100%]">
                <CurrentWeather weather={currentWeather} />
              </div>
            )}

            
            {/* 5-Day Forecast */}
            {forecast.length > 0 && !loading && (
              <ForecastCard forecast={forecast} />
            )}
          </div>
          ) : (
            <div className="space-y-6">
              {/* Loading */}
              {loading && <LoadingSpinner />}

              {/* Error */}
              {error && <ErrorMessage message={error} />}

              
              {/* recomment activity */}
              <ActivityPage weather={currentWeather} mode={showMap ? 'list' : 'gird'}/>
            </div>
          )}
          {/* Map Container */}
          {showMap && (
            <WeatherMap
              currentWeather={currentWeather}
              onMapClick={handleMapClick}
              mapLoaded={mapLoaded}
              setMapLoaded={setMapLoaded}
            />
          )}
        </div>

        {/* Footer */}
        <Footer currentLocation={currentLocation} />
      </div>
    </div>
  );
};

export default App;