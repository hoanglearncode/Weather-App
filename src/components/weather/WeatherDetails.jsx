import React from 'react';
import { Droplets, Wind, Eye, Gauge } from 'lucide-react';

const WeatherDetails = ({ weather }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="w-5 h-5 text-blue-300" />
          <span className="text-white/70">Humidity</span>
        </div>
        <p className="text-2xl font-bold text-white">{weather.humidity}%</p>
      </div>

      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Wind className="w-5 h-5 text-green-300" />
          <span className="text-white/70">Wind</span>
        </div>
        <p className="text-2xl font-bold text-white">{weather.windSpeed} km/h</p>
      </div>

      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-5 h-5 text-purple-300" />
          <span className="text-white/70">Visibility</span>
        </div>
        <p className="text-2xl font-bold text-white">{weather.visibility} km</p>
      </div>

      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Gauge className="w-5 h-5 text-orange-300" />
          <span className="text-white/70">Pressure</span>
        </div>
        <p className="text-2xl font-bold text-white">{weather.pressure} hPa</p>
      </div>
    </div>
  );
};

export default WeatherDetails;