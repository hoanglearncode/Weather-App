import React, { useRef, useEffect, useState } from 'react';
import { MAPBOX_TOKEN } from '../../utils/constants.jsx';
import { getWeatherIconType, getWeatherIconForMarker } from '../../utils/weatherIcons.jsx';
import { useGeolocation } from '../../hooks/useGeolocation';

const WeatherMap = ({ 
  currentWeather, 
  onMapClick, 
  mapLoaded, 
  setMapLoaded 
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const { currentLocation, getCurrentPosition, setCurrentLocation } = useGeolocation();
  const [userLocation, setUserLocation] = useState({ lat: 21.0285, lng: 105.8542 }); // Default to Hanoi

  // Get user's current location on component mount
  useEffect(() => {
    const initUserLocation = async () => {
      try {
        const location = await getCurrentPosition();
        setUserLocation(location);
      } catch (error) {
        console.warn('Could not get user location, using default:', error);
        // Keep default location (Hanoi)
      }
    };

    initUserLocation();
  }, [getCurrentPosition]);

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
  }, [setMapLoaded]);

  // Initialize map when container is ready and mapbox is loaded
  useEffect(() => {
    if (mapLoaded && mapContainer.current && !map.current && window.mapboxgl && userLocation) {
      window.mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [userLocation.lng, userLocation.lat], // Fixed: lng first, then lat
        zoom: 10,
        projection: 'globe'
      });

      // Add navigation controls
      map.current.addControl(new window.mapboxgl.NavigationControl());
      
      // Add click handler for map
      map.current.on('click', async (e) => {
        const { lng, lat } = e.lngLat;
        onMapClick(lat, lng);
      });

      // Add a marker for user's current location if available
      if (currentLocation) {
        const userMarkerElement = document.createElement('div');
        userMarkerElement.className = 'user-location-marker';
        userMarkerElement.style.cssText = `
          width: 20px;
          height: 20px;
          background: #ef4444;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        `;

        new window.mapboxgl.Marker(userMarkerElement)
          .setLngLat([currentLocation.lng, currentLocation.lat])
          .setPopup(
            new window.mapboxgl.Popup({ offset: 15 })
              .setHTML('<div style="padding: 5px; text-align: center;"><strong>Your Location</strong></div>')
          )
          .addTo(map.current);
      }
    }
  }, [mapLoaded, userLocation, currentLocation, onMapClick]);

  // Update map marker when weather data changes
  useEffect(() => {
    if (map.current && currentWeather && currentWeather.coords && window.mapboxgl) {
      // Remove existing weather marker
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
        transition: transform 0.2s ease;
      `;
      
      // Add hover effect
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.1)';
      });
      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
      });
      
      const weatherIcon = getWeatherIconType(currentWeather.condition);
      markerElement.innerHTML = getWeatherIconForMarker(weatherIcon);

      // Create weather marker
      marker.current = new window.mapboxgl.Marker(markerElement)
        .setLngLat([currentWeather.coords.lon, currentWeather.coords.lat])
        .addTo(map.current);

      // Create popup with more detailed weather info
      const popup = new window.mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="padding: 12px; text-align: center; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1f2937; font-weight: 600;">${currentWeather.location}</h3>
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
              <span style="font-size: 24px; margin-right: 8px;">${getWeatherIconForMarker(weatherIcon)}</span>
              <span style="font-size: 24px; font-weight: bold; color: #3b82f6;">${currentWeather.temperature}°C</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #6b7280; text-transform: capitalize;">${currentWeather.description}</p>
            ${currentWeather.humidity ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #9ca3af;">Humidity: ${currentWeather.humidity}%</p>` : ''}
          </div>
        `);

      marker.current.setPopup(popup);

      // Fly to weather location
      map.current.flyTo({
        center: [currentWeather.coords.lon, currentWeather.coords.lat],
        zoom: 12,
        duration: 2000,
        essential: true
      });
    }
  }, [currentWeather]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        🗺️ Weather Map
        {currentLocation && (
          <span className="ml-2 text-sm font-normal text-white/70">
            (📍 Your location detected)
          </span>
        )}
      </h3>
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
      <div className="flex items-center justify-between mt-3">
        <p className="text-white/70 text-sm">
          💡 Click anywhere on the map to get weather for that location
        </p>
        {!currentLocation && (
          <button 
            onClick={getCurrentPosition}
            className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors"
          >
            📍 Get My Location
          </button>
        )}
      </div>
    </div>
  );
};

export default WeatherMap;