import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, MapPin, Grid, List, Star, Clock, Users } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ActivityCard from '../components/activity/ActivityCard';

const ActivityPage = ({weathers, mode}) => {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState('Hà Nội');
    const [activities, setActivities] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' cho 2 cột, 'list' cho 1 cột
    const [loading, setLoading] = useState(true);

    // Dữ liệu mô phỏng từ ML API và web scraping
    const weatherBasedActivities = {
        sunny: [
            {
                id: 1,
                title: 'Đi dã ngoại tại Công viên Thống Nhất',
                description: 'Thưởng thức không khí trong lành và tham gia các hoạt động ngoài trời',
                rating: 4.8,
                duration: '2-3 giờ',
                participants: '2-6 người',
                image: '🏞️',
                source: 'web_scraped',
                category: 'Ngoài trời'
            },
            {
                id: 2,
                title: 'Chơi thể thao tại Mỹ Đình',
                description: 'Bóng đá, cầu lông hoặc các môn thể thao khác',
                rating: 4.5,
                duration: '1-2 giờ',
                participants: '4-10 người',
                image: '⚽',
                source: 'ml_prediction',
                category: 'Thể thao'
            },
            {
                id: 3,
                title: 'Tham quan Hoàng Thành Thăng Long',
                description: 'Khám phá di sản văn hóa thế giới tại Hà Nội',
                rating: 4.7,
                duration: '3-4 giờ',
                participants: '1-8 người',
                image: '🏛️',
                source: 'web_scraped',
                category: 'Văn hóa'
            },
            {
                id: 4,
                title: 'Đi bơi tại Aqua Park',
                description: 'Giải nhiệt trong ngày nắng nóng',
                rating: 4.3,
                duration: '2-4 giờ',
                participants: '2-8 người',
                image: '🏊',
                source: 'ml_prediction',
                category: 'Giải trí'
            }
        ],
        rainy: [
            {
                id: 5,
                title: 'Thăm Bảo tàng Dân tộc học',
                description: 'Tìm hiểu văn hóa các dân tộc Việt Nam',
                rating: 4.6,
                duration: '2-3 giờ',
                participants: '1-6 người',
                image: '🏛️',
                source: 'web_scraped',
                category: 'Văn hóa'
            },
            {
                id: 6,
                title: 'Xem phim tại CGV Vincom',
                description: 'Thưởng thức những bộ phim mới nhất',
                rating: 4.4,
                duration: '2-3 giờ',
                participants: '2-4 người',
                image: '🎬',
                source: 'ml_prediction',
                category: 'Giải trí'
            },
            {
                id: 7,
                title: 'Mua sắm tại Tràng Tiền Plaza',
                description: 'Shopping và thưởng thức ẩm thực trong nhà',
                rating: 4.2,
                duration: '3-5 giờ',
                participants: '2-6 người',
                image: '🛍️',
                source: 'web_scraped',
                category: 'Mua sắm'
            },
            {
                id: 8,
                title: 'Học nấu ăn tại Vietnam Cookery',
                description: 'Học cách nấu các món ăn truyền thống Việt Nam',
                rating: 4.9,
                duration: '3-4 giờ',
                participants: '2-8 người',
                image: '👨‍🍳',
                source: 'ml_prediction',
                category: 'Học tập'
            }
        ],
        cloudy: [
            {
                id: 9,
                title: 'Đi café tại Phố cổ',
                description: 'Thưởng thức cà phê và không khí cổ kính',
                rating: 4.7,
                duration: '1-2 giờ',
                participants: '2-4 người',
                image: '☕',
                source: 'web_scraped',
                category: 'Thư giãn'
            },
            {
                id: 10,
                title: 'Tham quan Văn Miếu',
                description: 'Khám phá ngôi trường đại học đầu tiên của Việt Nam',
                rating: 4.8,
                duration: '2-3 giờ',
                participants: '1-8 người',
                image: '🏮',
                source: 'ml_prediction',
                category: 'Văn hóa'
            },
            {
                id: 11,
                title: 'Chụp ảnh tại Cầu Long Biên',
                description: 'Ghi lại những khoảnh khắc đẹp của thành phố',
                rating: 4.5,
                duration: '1-3 giờ',
                participants: '1-4 người',
                image: '📸',
                source: 'web_scraped',
                category: 'Nghệ thuật'
            },
            {
                id: 12,
                title: 'Tham quan Gallery L\'Espace',
                description: 'Chiêm ngưỡng các tác phẩm nghệ thuật đương đại',
                rating: 4.4,
                duration: '1-2 giờ',
                participants: '1-6 người',
                image: '🎨',
                source: 'ml_prediction',
                category: 'Nghệ thuật'
            }
        ]
    };

    const weatherIcons = {
        sunny: <Sun className="w-6 h-6 text-yellow-500" />,
        rainy: <CloudRain className="w-6 h-6 text-blue-500" />,
        cloudy: <Cloud className="w-6 h-6 text-gray-500" />,
        cold: <Snowflake className="w-6 h-6 text-blue-300" />
    };

    const weatherNames = {
        sunny: 'Nắng đẹp',
        rainy: 'Mưa',
        cloudy: 'Nhiều mây',
        cold: 'Lạnh'
    };

    useEffect(() => {
        // Mô phỏng API call đến OpenWeather và ML service
        const simulateAPICall = async () => {
            setLoading(true);
            
            // Giả lập delay API
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mô phỏng dữ liệu từ OpenWeather API
            const mockWeatherConditions = ['sunny', 'rainy', 'cloudy'];
            const randomWeather = mockWeatherConditions[Math.floor(Math.random() * mockWeatherConditions.length)];
            
            setWeather(randomWeather);
            setActivities(weatherBasedActivities[randomWeather]);
            setLoading(false);
            setViewMode(mode);
        };

        simulateAPICall();
    }, []);

    

    if (loading) {
        return (
            <LoadingSpinner text='Đang phân tích thời tiết và tạo đề xuất...'/>
        );
    }

    return (
        <div className="min-h-screen bg-white/10 backdrop-blur-md rounded-2xl text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Weather & Location Info */}
                <div className="bg-white/10 rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-white">{location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {weatherIcons[weather]}
                                <span className="font-medium text-white">
                                    {weatherNames[weather]}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activities Grid/List */}
                <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                        ? 'grid-cols-1 md:grid-cols-2' 
                        : 'grid-cols-1'
                }`}>
                    {activities.map((activity) => (
                        <ActivityCard 
                            key={activity.id} 
                            activity={activity} 
                            isGridView={viewMode === 'grid'} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivityPage;