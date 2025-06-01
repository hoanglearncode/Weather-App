import React from 'react';
import {AppContext} from '../../hooks/useActivity';
const Header = () => {
  const { tab: isTab } = React.useContext(AppContext);
  return (
    <>
    {isTab ? (
      <div className="p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Weather App</h1>
        <p className="text-blue-100">Your complete weather companion with interactive map</p>
      </div>
    ) : (            
      <div className="p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Hoạt Động Được Đề Xuất</h1>
        <p className="text-blue-100">Dựa trên dữ liệu thời tiết thời gian thực và thuật toán học máy để đề xuất những hoạt động phù hợp nhất</p>
      </div>)}
    </>
  );
};

export default Header;