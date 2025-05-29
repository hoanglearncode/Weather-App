import { API_KEY } from '../utils/constants.jsx';

export const fetchWeatherByCity = async (city) => {
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

export const fetchWeatherByCoords = async (lat, lon) => {
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

export const fetchForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    
    if (response.ok) {
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
            icon: item.weather[0].main
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

export const processWeatherData = (data) => {
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