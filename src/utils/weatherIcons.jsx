import { Sun, Cloud, CloudRain, CloudSnow, Zap } from 'lucide-react';

export const getWeatherIconType = (condition) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('clear') || conditionLower.includes('sun')) return 'sunny';
  if (conditionLower.includes('cloud')) return conditionLower.includes('few') || conditionLower.includes('scattered') ? 'partly-cloudy' : 'cloudy';
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return 'rainy';
  if (conditionLower.includes('thunder')) return 'thunderstorm';
  if (conditionLower.includes('snow')) return 'snowy';
  return 'sunny';
};

export const getWeatherIcon = (condition) => {
  switch(condition) {
    case 'sunny': return (<Sun className="w-8 h-8 text-yellow-500" />);
    case 'partly-cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
    case 'cloudy': return <Cloud className="w-8 h-8 text-gray-600" />;
    case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
    case 'thunderstorm': return <Zap className="w-8 h-8 text-purple-500" />;
    case 'snowy': return <CloudSnow className="w-8 h-8 text-blue-200" />;
    default: return <Sun className="w-8 h-8 text-yellow-500" />;
  }
};

export const getWeatherIconForMarker = (condition) => {
  const iconMap = {
    'sunny': '☀️',
    'partly-cloudy': '⛅',
    'cloudy': '☁️',
    'rainy': '🌧️',
    'thunderstorm': '⛈️',
    'snowy': '❄️'
  };
  return iconMap[condition] || '☀️';
};