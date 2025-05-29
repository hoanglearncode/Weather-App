import React from 'react';

const LoadingSpinner = ({ text = "Loading weather data..." }) => {
  return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      <p className="text-white mt-4">{text}</p>
    </div>
  );
};

export default LoadingSpinner;