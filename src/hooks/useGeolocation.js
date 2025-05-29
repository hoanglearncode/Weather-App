import { useState } from 'react';
import { GEOLOCATION_OPTIONS } from '../utils/constants.jsx';

export const useGeolocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCurrentLocation(location);
          resolve(location);
        },
        (error) => {
          console.error('Geolocation error:', error);
          reject(new Error('Unable to get your location'));
        },
        GEOLOCATION_OPTIONS
      );
    });
  };

  return {
    currentLocation,
    getCurrentPosition,
    setCurrentLocation
  };
};