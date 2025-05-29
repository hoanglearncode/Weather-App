import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Thermometer, Eye, Wind, Droplets, Sun, Cloud, CloudRain, CloudSnow, Zap, Navigation, Clock, Sunrise, Sunset, Gauge, AlertTriangle, Map as MapIcon } from 'lucide-react';

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [favorites, setFavorites] = useState(['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'New York', 'London']);
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  const API_KEY = '6457e48892c6baed601e6adf2fafce33';
  const MAPBOX_TOKEN = 'pk.eyJ1IjoidHRiaW50dCIsImEiOiJjbHBnb282amQwMDVjMmpyeHY5N2c1bXMyIn0.ti-gYOhpihy4YzAFbKuxZQ';

  // Initialize Mapbox
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.mapboxgl) {
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.onload = () => {
        const link = document.createElement('link');
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    } else if (window.mapboxgl) {
      setMapLoaded(true);
    }
  }, []);

  // Initialize map when container is ready and mapbox is loaded
  useEffect(() => {
    if (mapLoaded && showMap && mapContainer.current && !map.current && window.mapboxgl) {
      window.mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [106.68223, 10.762649],
        zoom: 10,
        projection: 'globe'
      });

      // Add navigation controls
      map.current.addControl(new window.mapboxgl.NavigationControl());
      
      // Add click handler for map
      map.current.on('click', async (e) => {
        const { lng, lat } = e.lngLat;
        await getCurrentLocationWeather(lat, lng);
      });
    }
  }, [mapLoaded, showMap]);

  // Update map marker when weather data changes
  useEffect(() => {
    if (map.current && currentWeather && currentWeather.coords && window.mapboxgl) {
      // Remove existing marker
      if (marker.current) {
        marker.current.remove();
      }

      // Create weather icon element for marker
      const markerElement = document.createElement('div');
      markerElement.className = 'weather-marker';
      markerElement.style.cssText = `
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        border: 3px solid #3b82f6;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        cursor: pointer;
      `;
      
      // Add weather icon
      const iconMap = {
        'sunny': '☀️',
        'partly-cloudy': '⛅',
        'cloudy': '☁️',
        'rainy': '🌧️',
        'thunderstorm': '⛈️',
        'snowy': '❄️'
      };
      
      const weatherIcon = getWeatherIconType(currentWeather.condition);
      markerElement.innerHTML = iconMap[weatherIcon] || '☀️';

      // Create marker
      marker.current = new window.mapboxgl.Marker(markerElement)
        .setLngLat([currentWeather.coords.lon, currentWeather.coords.lat])
        .addTo(map.current);

      // Create popup
      const popup = new window.mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="padding: 10px; text-align: center;">
            <h3 style="margin: 0 0 5px 0; font-size: 16px; color: #1f2937;">${currentWeather.location}</h3>
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #3b82f6;">${currentWeather.temperature}°C</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #6b7280; text-transform: capitalize;">${currentWeather.description}</p>
          </div>
        `);

      marker.current.setPopup(popup);

      // Fly to location
      map.current.flyTo({
        center: [currentWeather.coords.lon, currentWeather.coords.lat],
        zoom: 12,
        duration: 2000
      });
    }
  }, [currentWeather, map.current]);

  // Fetch weather by city name
  const fetchWeatherByCity = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'City not found');
      }
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch weather data');
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (response.ok) {
        return data;
      } else {
        throw new Error('Failed to get weather for your location');
      }
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch weather data');
    }
  };

  // Fetch 5-day forecast
  const fetchForecast = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (response.ok) {
        // Process forecast data to get daily forecasts
        const dailyForecasts = [];
        const processedDates = new Set();
        
        data.list.forEach((item) => {
          const date = new Date(item.dt * 1000);
          const dateString = date.toDateString();
          
          if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
            const dayName = dailyForecasts.length === 0 ? 'Today' : 
                          dailyForecasts.length === 1 ? 'Tomorrow' : 
                          date.toLocaleDateString('en-US', { weekday: 'long' });
            
            dailyForecasts.push({
              day: dayName,
              high: Math.round(item.main.temp_max),
              low: Math.round(item.main.temp_min),
              condition: item.weather[0].main,
              description: item.weather[0].description,
              icon: getWeatherIconType(item.weather[0].main)
            });
            
            processedDates.add(dateString);
          }
        });
        
        return dailyForecasts;
      } else {
        throw new Error('Failed to get forecast data');
      }
    } catch (error) {
      console.error('Forecast error:', error);
      return [];
    }
  };

  // Convert weather condition to icon type
  const getWeatherIconType = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) return 'sunny';
    if (conditionLower.includes('cloud')) return conditionLower.includes('few') || conditionLower.includes('scattered') ? 'partly-cloudy' : 'cloudy';
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return 'rainy';
    if (conditionLower.includes('thunder')) return 'thunderstorm';
    if (conditionLower.includes('snow')) return 'snowy';
    return 'sunny';
  };

  // Get weather icon component
  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'partly-cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-600" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'thunderstorm': return <Zap className="w-8 h-8 text-purple-500" />;
      case 'snowy': return <CloudSnow className="w-8 h-8 text-blue-200" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  // Process weather data from API
  const processWeatherData = (data) => {
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      visibility: data.visibility ? Math.round(data.visibility / 1000) : 'N/A',
      pressure: data.main.pressure,
      feelsLike: Math.round(data.main.feels_like),
      sunrise: sunrise,
      sunset: sunset,
      coords: {
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    };
  };

  // Search weather by city
  const searchWeather = async (city) => {
    setLoading(true);
    setError('');
    
    try {
      const weatherData = await fetchWeatherByCity(city);
      const processedData = processWeatherData(weatherData);
      setCurrentWeather(processedData);
      
      // Fetch forecast for this location
      const forecastData = await fetchForecast(processedData.coords.lat, processedData.coords.lon);
      setForecast(forecastData);
      
    } catch (error) {
      setError(error.message);
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  // Get current location weather
  const getCurrentLocationWeather = async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      const weatherData = await fetchWeatherByCoords(lat, lon);
      const processedData = processWeatherData(weatherData);
      setCurrentWeather(processedData);
      
      // Update current location
      setCurrentLocation({ lat, lng: lon });
      
      // Fetch forecast for this location
      const forecastData = await fetchForecast(lat, lon);
      setForecast(forecastData);
      
    } catch (error) {
      setError(error.message);
      // Fallback to default city if geolocation fails
      if (!currentWeather) {
        searchWeather('Ho Chi Minh City');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle geolocation
  const getCurrentLocation = () => {
    setLoading(true);
    setError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCurrentLocationWeather(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Unable to get your location. Showing default city.');
          // Fallback to default city
          searchWeather('Ho Chi Minh City');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
      searchWeather('Ho Chi Minh City');
    }
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchWeather(searchQuery.trim());
      setSearchQuery('');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Toggle map visibility
  const toggleMap = () => {
    setShowMap(!showMap);
  };

  // Load weather on component mount - get user's location first
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather App</h1>
          <p className="text-blue-100">Your complete weather companion with interactive map</p>
        </div>

        {/* Search Bar */}
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
              onClick={getCurrentLocation}
              disabled={loading}
              className="px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Get current location weather"
            >
              <Navigation className="w-5 h-5" />
            </button>
            <button
              onClick={toggleMap}
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
            {favorites.map((city) => (
              <button
                key={city}
                onClick={() => searchWeather(city)}
                disabled={loading}
                className="px-3 py-1 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={`grid gap-6 ${showMap ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {/* Weather Content */}
          <div className="space-y-6">
            {/* Loading */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p className="text-white mt-4">Loading weather data...</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-300" />
                  <p className="text-white text-center">{error}</p>
                </div>
              </div>
            )}

            {/* Current Weather */}
            {currentWeather && !loading && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-white/70" />
                  <h2 className="text-2xl font-bold text-white">{currentWeather.location}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Main Weather Info */}
                  <div className="text-center">
                    <div className="text-6xl font-light text-white mb-2">
                      {currentWeather.temperature}°C
                    </div>
                    <p className="text-xl text-white/80 mb-2 capitalize">{currentWeather.description}</p>
                    <p className="text-white/60">Feels like {currentWeather.feelsLike}°C</p>
                  </div>

                  {/* Weather Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5 text-blue-300" />
                        <span className="text-white/70">Humidity</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{currentWeather.humidity}%</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Wind className="w-5 h-5 text-green-300" />
                        <span className="text-white/70">Wind</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{currentWeather.windSpeed} km/h</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-5 h-5 text-purple-300" />
                        <span className="text-white/70">Visibility</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{currentWeather.visibility} km</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="w-5 h-5 text-orange-300" />
                        <span className="text-white/70">Pressure</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{currentWeather.pressure} hPa</p>
                    </div>
                  </div>
                </div>

                {/* Sun Times */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sunrise className="w-5 h-5 text-yellow-300" />
                      <span className="text-white/70">Sunrise</span>
                    </div>
                    <p className="text-xl font-bold text-white">{currentWeather.sunrise}</p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sunset className="w-5 h-5 text-orange-300" />
                      <span className="text-white/70">Sunset</span>
                    </div>
                    <p className="text-xl font-bold text-white">{currentWeather.sunset}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 5-Day Forecast */}
            {forecast.length > 0 && !loading && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
                <div className="grid gap-4">
                  {forecast.map((day, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getWeatherIcon(day.icon)}
                        <div>
                          <p className="font-semibold text-white">{day.day}</p>
                          <p className="text-white/70 text-sm capitalize">{day.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">{day.high}°</span>
                          <span className="text-white/60">{day.low}°</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map Container */}
          {showMap && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Weather Map</h3>
              <div className="bg-gray-200 rounded-xl overflow-hidden" style={{ height: '600px' }}>
                {mapLoaded ? (
                  <div 
                    ref={mapContainer} 
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                      <p className="text-gray-600">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-white/70 text-sm mt-2">
                💡 Click anywhere on the map to get weather for that location
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60">
          <p>Weather data provided by OpenWeatherMap • Map by Mapbox • Last updated: {new Date().toLocaleTimeString()}</p>
          {currentLocation && (
            <p className="text-sm mt-2">
              📍 Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;