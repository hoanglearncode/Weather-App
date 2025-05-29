import React from 'react';
import { Sunrise, Sunset } from 'lucide-react';

const SunTimes = ({ sunrise, sunset }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sunrise className="w-5 h-5 text-yellow-300" />
          <span className="text-white/70">Sunrise</span>
        </div>
        <p className="text-xl font-bold text-white">{sunrise}</p>
      </div>

      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sunset className="w-5 h-5 text-orange-300" />
          <span className="text-white/70">Sunset</span>
        </div>
        <p className="text-xl font-bold text-white">{sunset}</p>
      </div>
    </div>
  );
};

export default SunTimes;