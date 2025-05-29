import React from 'react';

const Footer = ({ currentLocation }) => {
  return (
    <div className="text-center mt-8 text-white/60">
      <p>Weather data provided by OpenWeatherMap • Map by Mapbox • Last updated: {new Date().toLocaleTimeString()}</p>
      {currentLocation && (
        <p className="text-sm mt-2">
          📍 Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
};

export default Footer;