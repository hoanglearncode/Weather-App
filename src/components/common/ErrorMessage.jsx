import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
      <div className="flex items-center gap-2 justify-center">
        <AlertTriangle className="w-5 h-5 text-red-300" />
        <p className="text-white text-center">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;