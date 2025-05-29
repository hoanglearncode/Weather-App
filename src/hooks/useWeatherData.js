import { useState } from 'react';
import { 
  fetchWeatherByCity, 
  fetchWeatherByCoords, 
  fetchForecast, 
  processWeatherData 
} from '../services/weatherService';

export const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchWeatherByCity = async (city) => {
    setLoading(true);
    setError('');
    
    try {
      const weatherData = await fetchWeatherByCity(city);
      const processedData = processWeatherData(weatherData);
      setCurrentWeather(processedData);
      
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

  const searchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      const weatherData = await fetchWeatherByCoords(lat, lon);
      const processedData = processWeatherData(weatherData);
      setCurrentWeather(processedData);
      
      const forecastData = await fetchForecast(lat, lon);
      setForecast(forecastData);
      
    } catch (error) {
      setError(error.message);
      if (!currentWeather) {
        searchWeatherByCity('Ho Chi Minh City');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    currentWeather,
    forecast,
    loading,
    error,
    searchWeatherByCity,
    searchWeatherByCoords,
    setError
  };
};