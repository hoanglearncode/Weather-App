import React from 'react';
import { Star, Clock, Users } from 'lucide-react';
const ActivityCard = ({ activity, isGridView }) => (
        <div className={`bg-white/10 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
            isGridView ? 'hover:scale-105' : 'hover:translate-x-2'
        }`}>
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl mb-2">{activity.image}</div>
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{activity.rating}</span>
                    </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {activity.title}
                </h3>
                
                <p className="text-sm mb-4 line-clamp-2">
                    {activity.description}
                </p>
                
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm ">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center text-sm ">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{activity.participants}</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.source === 'ml_prediction' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                    }`}>
                        {activity.source === 'ml_prediction' ? 'AI Đề xuất' : 'Phổ biến'}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {activity.category}
                    </span>
                </div>
            </div>
        </div>
    );

export default ActivityCard;