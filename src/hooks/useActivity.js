const dataActivity = {
  "travel_recommendations": [
    {
      "id": 1,
      "location": {
        "name": "Bãi biển Mỹ Khê",
        "city": "Đà Nẵng",
        "coordinates": {
          "lat": 16.0544,
          "lon": 108.2022
        },
        "type": "beach"
      },
      "weather_conditions": {
        "optimal": {
          "temperature_range": {
            "min": 25,
            "max": 35
          },
          "weather_main": ["Clear", "Clouds"],
          "wind_speed_max": 15,
          "humidity_max": 70,
          "precipitation": 0
        },
        "acceptable": {
          "temperature_range": {
            "min": 22,
            "max": 38
          },
          "weather_main": ["Clear", "Clouds", "Mist"],
          "wind_speed_max": 20,
          "humidity_max": 80,
          "precipitation_max": 2
        }
      },
      "activities": ["tắm biển", "lướt sóng", "chụp ảnh", "thể thao bãi biển"],
      "description": "Bãi biển đẹp với cát trắng mịn, thích hợp cho các hoạt động ngoài trời khi thời tiết nắng đẹp",
      "rating": 4.8,
      "best_time": ["06:00-10:00", "16:00-19:00"],
      "season_preference": ["spring", "summer", "autumn"]
    },
    {
      "id": 2,
      "location": {
        "name": "Chùa Cầu Hội An",
        "city": "Hội An",
        "coordinates": {
          "lat": 15.8801,
          "lon": 108.3380
        },
        "type": "cultural"
      },
      "weather_conditions": {
        "optimal": {
          "temperature_range": {
            "min": 20,
            "max": 30
          },
          "weather_main": ["Clear", "Clouds"],
          "wind_speed_max": 10,
          "humidity_max": 75,
          "precipitation": 0
        },
        "acceptable": {
          "temperature_range": {
            "min": 18,
            "max": 35
          },
          "weather_main": ["Clear", "Clouds", "Mist", "Drizzle"],
          "wind_speed_max": 15,
          "humidity_max": 85,
          "precipitation_max": 5
        }
      },
      "activities": ["tham quan", "chụp ảnh", "mua sắm", "ẩm thực"],
      "description": "Di tích lịch sử nổi tiếng, phù hợp tham quan trong nhiều điều kiện thời tiết",
      "rating": 4.9,
      "best_time": ["07:00-11:00", "15:00-18:00"],
      "season_preference": ["autumn", "winter", "spring"]
    },
    {
      "id": 3,
      "location": {
        "name": "Núi Bà Nà Hills",
        "city": "Đà Nẵng",
        "coordinates": {
          "lat": 15.9954,
          "lon": 107.9881
        },
        "type": "mountain"
      },
      "weather_conditions": {
        "optimal": {
          "temperature_range": {
            "min": 15,
            "max": 25
          },
          "weather_main": ["Clear", "Clouds"],
          "wind_speed_max": 12,
          "humidity_max": 80,
          "precipitation": 0
        },
        "acceptable": {
          "temperature_range": {
            "min": 12,
            "max": 28
          },
          "weather_main": ["Clear", "Clouds", "Mist", "Fog"],
          "wind_speed_max": 18,
          "humidity_max": 90,
          "precipitation_max": 3
        }
      },
      "activities": ["cáp treo", "tham quan", "chụp ảnh", "giải trí"],
      "description": "Khu du lịch trên núi với khí hậu mát mẻ, thích hợp khi thời tiết nóng ở thành phố",
      "rating": 4.6,
      "best_time": ["08:00-17:00"],
      "season_preference": ["summer", "spring", "autumn"]
    },
    {
      "id": 4,
      "location": {
        "name": "Phố cổ Hà Nội",
        "city": "Hà Nội",
        "coordinates": {
          "lat": 21.0285,
          "lon": 105.8542
        },
        "type": "cultural"
      },
      "weather_conditions": {
        "optimal": {
          "temperature_range": {
            "min": 18,
            "max": 28
          },
          "weather_main": ["Clear", "Clouds"],
          "wind_speed_max": 8,
          "humidity_max": 70,
          "precipitation": 0
        },
        "acceptable": {
          "temperature_range": {
            "min": 15,
            "max": 32
          },
          "weather_main": ["Clear", "Clouds", "Mist", "Drizzle"],
          "wind_speed_max": 12,
          "humidity_max": 85,
          "precipitation_max": 8
        }
      },
      "activities": ["đi bộ", "ẩm thực", "mua sắm", "khám phá văn hóa"],
      "description": "Khu phố cổ với nhiều hoạt động trong nhà và ngoài trời, phù hợp nhiều thời tiết",
      "rating": 4.7,
      "best_time": ["06:00-10:00", "17:00-22:00"],
      "season_preference": ["autumn", "winter", "spring"]
    },
    {
      "id": 5,
      "location": {
        "name": "Vịnh Hạ Long",
        "city": "Quảng Ninh",
        "coordinates": {
          "lat": 20.9101,
          "lon": 107.1839
        },
        "type": "natural"
      },
      "weather_conditions": {
        "optimal": {
          "temperature_range": {
            "min": 20,
            "max": 30
          },
          "weather_main": ["Clear", "Clouds"],
          "wind_speed_max": 10,
          "humidity_max": 75,
          "precipitation": 0
        },
        "acceptable": {
          "temperature_range": {
            "min": 16,
            "max": 35
          },
          "weather_main": ["Clear", "Clouds", "Mist"],
          "wind_speed_max": 15,
          "humidity_max": 85,
          "precipitation_max": 3
        }
      },
      "activities": ["du thuyền", "tham quan động", "chèo kayak", "chụp ảnh"],
      "description": "Di sản thiên nhiên thế giới, tuyệt đẹp khi thời tiết quang đãng",
      "rating": 4.9,
      "best_time": ["08:00-17:00"],
      "season_preference": ["autumn", "winter", "spring"]
    },
    {
      "id": 6,
      "location": {
        "name": "Trung tâm thương mại Vincom",
        "city": "TP.HCM",
        "coordinates": {
          "lat": 10.7769,
          "lon": 106.7009
        },
        "type": "indoor"
      },
      "weather_conditions": {
        "optimal": {
          "temperature_range": {
            "min": 32,
            "max": 40
          },
          "weather_main": ["Rain", "Thunderstorm"],
          "wind_speed_max": 25,
          "humidity_max": 95,
          "precipitation_min": 10
        },
        "acceptable": {
          "temperature_range": {
            "min": 25,
            "max": 45
          },
          "weather_main": ["Clear", "Clouds", "Rain", "Thunderstorm", "Drizzle"],
          "wind_speed_max": 30,
          "humidity_max": 100,
          "precipitation_max": 50
        }
      },
      "activities": ["mua sắm", "ăn uống", "xem phim", "giải trí"],
      "description": "Hoạt động trong nhà, lý tưởng khi thời tiết xấu hoặc quá nóng",
      "rating": 4.3,
      "best_time": ["10:00-22:00"],
      "season_preference": ["summer", "rainy_season"]
    }
  ],
  "weather_mapping": {
    "Clear": {
      "description": "Trời quang đãng",
      "preferred_activities": ["outdoor", "beach", "mountain", "sightseeing"],
      "avoid_activities": ["indoor_only"]
    },
    "Clouds": {
      "description": "Có mây",
      "preferred_activities": ["outdoor", "cultural", "walking", "photography"],
      "avoid_activities": ["sunbathing"]
    },
    "Rain": {
      "description": "Mưa",
      "preferred_activities": ["indoor", "cultural_indoor", "shopping", "museums"],
      "avoid_activities": ["beach", "mountain", "outdoor_sports"]
    },
    "Thunderstorm": {
      "description": "Dông bão",
      "preferred_activities": ["indoor", "shopping", "entertainment"],
      "avoid_activities": ["outdoor", "water_activities", "mountain"]
    },
    "Mist": {
      "description": "Sương mù",
      "preferred_activities": ["cultural", "indoor", "photography"],
      "avoid_activities": ["beach", "long_distance_viewing"]
    }
  },
  "recommendation_algorithm": {
    "scoring_factors": {
      "weather_match": 0.4,
      "temperature_comfort": 0.25,
      "activity_suitability": 0.2,
      "location_rating": 0.1,
      "seasonal_preference": 0.05
    },
    "filtering_rules": {
      "exclude_if": [
        "temperature < location.min_temp - 5",
        "temperature > location.max_temp + 5",
        "precipitation > location.max_precipitation",
        "wind_speed > location.max_wind"
      ]
    }
  },
  "api_integration": {
    "openweather_fields": [
      "weather.main",
      "weather.description",
      "main.temp",
      "main.humidity",
      "wind.speed",
      "rain.1h",
      "clouds.all"
    ],
    "sample_request": {
      "url": "https://api.openweathermap.org/data/2.5/weather",
      "params": {
        "lat": 16.0544,
        "lon": 108.2022,
        "appid": "YOUR_API_KEY",
        "units": "metric",
        "lang": "vi"
      }
    }
  }
}

export const getActivityRecommendations = (weatherData) => {
  const recommendations = dataActivity.travel_recommendations.filter(activity => {
    const { weather_conditions } = activity;
    const currentWeather = weatherData.weather[0].main;
    const currentTemp = weatherData.main.temp;
    const currentHumidity = weatherData.main.humidity;
    const currentWindSpeed = weatherData.wind.speed;

    // Check if current weather matches optimal conditions
    const isOptimalWeather = weather_conditions.optimal.weather_main.includes(currentWeather) &&
      currentTemp >= weather_conditions.optimal.temperature_range.min &&
      currentTemp <= weather_conditions.optimal.temperature_range.max &&
      currentHumidity <= weather_conditions.optimal.humidity_max &&
      currentWindSpeed <= weather_conditions.optimal.wind_speed_max;

    // Check if current weather matches acceptable conditions
    const isAcceptableWeather = weather_conditions.acceptable.weather_main.includes(currentWeather) &&
      currentTemp >= weather_conditions.acceptable.temperature_range.min &&
      currentTemp <= weather_conditions.acceptable.temperature_range.max &&
      currentHumidity <= weather_conditions.acceptable.humidity_max &&
      currentWindSpeed <= weather_conditions.acceptable.wind_speed_max;

    return isOptimalWeather || isAcceptableWeather;
  });

  return recommendations;
}