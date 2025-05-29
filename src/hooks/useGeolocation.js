import { useState, useCallback } from 'react';
import { GEOLOCATION_OPTIONS } from '../utils/constants.jsx';

export const useGeolocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = 'Geolocation is not supported by this browser';
        setError(errorMsg);
        reject(new Error(errorMsg));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCurrentLocation(location);
          setLoading(false);
          setError(null);
          resolve(location);
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Unable to get your location';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
            default:
              errorMessage = 'An unknown error occurred while getting location';
              break;
          }
          
          setError(errorMessage);
          setLoading(false);
          reject(new Error(errorMessage));
        },
        {
          ...GEOLOCATION_OPTIONS,
          // Enhanced options for better accuracy
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }, []);

  const clearLocation = useCallback(() => {
    setCurrentLocation(null);
    setError(null);
  }, []);

  return {
    currentLocation,
    loading,
    error,
    getCurrentPosition,
    setCurrentLocation,
    clearLocation
  };
};