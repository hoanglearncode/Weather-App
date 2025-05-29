import React, { useRef, useEffect } from 'react';
import { MAPBOX_TOKEN } from '../../utils/constants.jsx';
import { getWeatherIconType, getWeatherIconForMarker } from '../../utils/weatherIcons.jsx';

const WeatherMap = ({ 
  currentWeather, 
  onMapClick, 
  mapLoaded, 
  setMapLoaded 
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

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
    if (mapLoaded && mapContainer.current && !map.current && window.mapboxgl) {
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
        onMapClick(lat, lng);
      });
    }
  }, [mapLoaded, onMapClick]);

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
      
      const weatherIcon = getWeatherIconType(currentWeather.condition);
      markerElement.innerHTML = getWeatherIconForMarker(weatherIcon);

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
  }, [currentWeather]);

  return (
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
  );
};

export default WeatherMap;