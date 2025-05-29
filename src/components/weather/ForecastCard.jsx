import React from 'react';
import { getWeatherIcon, getWeatherIconType } from '../../utils/weatherIcons.jsx';

const ForecastCard = ({ forecast }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      <div className="grid gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getWeatherIcon(getWeatherIconType(day.icon))}
              <div>
                <p className="font-semibold text-white">{day.day}</p>
                <p className="text-white/70 text-sm capitalize">{day.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{day.high}°</span>
                <span className="text-white/60">{day.low}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;