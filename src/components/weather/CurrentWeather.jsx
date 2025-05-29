import React from 'react';
import { MapPin } from 'lucide-react';
import WeatherDetails from './WeatherDetails';
import SunTimes from './SunTimes';

const CurrentWeather = ({ weather }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-white/70" />
        <h2 className="text-2xl font-bold text-white">{weather.location}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Main Weather Info */}
        <div className="text-center">
          <div className="text-6xl font-light text-white mb-2">
            {weather.temperature}°C
          </div>
          <p className="text-xl text-white/80 mb-2 capitalize">{weather.description}</p>
          <p className="text-white/60">Feels like {weather.feelsLike}°C</p>
        </div>

        {/* Weather Details Grid */}
        <WeatherDetails weather={weather} />
      </div>

      {/* Sun Times */}
      <SunTimes sunrise={weather.sunrise} sunset={weather.sunset} />
    </div>
  );
};

export default CurrentWeather;