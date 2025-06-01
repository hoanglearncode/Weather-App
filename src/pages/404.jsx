import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Home, Search, RefreshCw } from 'lucide-react';

export default function Weather404Page() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState('cloud');

  // Rotate weather icons
  useEffect(() => {
    const icons = ['cloud', 'rain', 'sun'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % icons.length;
      setWeatherIcon(icons[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const renderWeatherIcon = () => {
    const iconProps = { 
      size: 120, 
      className: `transition-all duration-1000 ${isAnimating ? 'animate-spin' : 'animate-bounce'}` 
    };

    switch (weatherIcon) {
      case 'rain':
        return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-300`} />;
      case 'sun':
        return <Sun {...iconProps} className={`${iconProps.className} text-yellow-300`} />;
      default:
        return <Cloud {...iconProps} className={`${iconProps.className} text-white`} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden p-10">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating clouds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute opacity-20 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <Cloud size={60 + Math.random() * 40} className="text-white" />
          </div>
        ))}
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Weather icon container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {renderWeatherIcon()}
            {/* Glow effect */}
            <div className="absolute inset-0 blur-xl opacity-50 animate-pulse">
              {renderWeatherIcon()}
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-wider drop-shadow-2xl animate-pulse">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6 animate-pulse"></div>
        </div>

        {/* Error message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 drop-shadow-lg">
            Oops! Trang không tìm thấy
          </h2>
          <p className="text-lg text-white/90 mb-2 drop-shadow">
            Có vẻ như bạn đã lạc vào một cơn bão thông tin...
          </p>
          <p className="text-base text-white/80 drop-shadow">
            Trang bạn đang tìm kiếm có thể đã bị thổi bay bởi gió mạnh!
          </p>
        </div>

        {/* Weather status card */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/30 shadow-2xl">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Trạng thái: Mất kết nối</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-white/70 text-sm">Độ ẩm</div>
              <div className="text-white font-semibold">---%</div>
            </div>
            <div className="space-y-1">
              <div className="text-white/70 text-sm">Nhiệt độ</div>
              <div className="text-white font-semibold">---°C</div>
            </div>
            <div className="space-y-1">
              <div className="text-white/70 text-sm">Gió</div>
              <div className="text-white font-semibold">--- km/h</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Home size={20} className="group-hover:animate-bounce" />
            <span className="font-medium">Về trang chủ</span>
          </button>

          <button 
            onClick={handleRefresh}
            className="group flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <RefreshCw size={20} className={`group-hover:animate-spin ${isAnimating ? 'animate-spin' : ''}`} />
            <span className="font-medium">Thử lại</span>
          </button>

          <button className="group flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Search size={20} className="group-hover:animate-pulse" />
            <span className="font-medium">Tìm kiếm</span>
          </button>
        </div>

        {/* Fun weather fact */}
        <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <p className="text-white/80 text-sm italic">
            💡 Bạn có biết: Mỗi giây có khoảng 100 tia sét đánh xuống Trái Đất!
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
  );
}