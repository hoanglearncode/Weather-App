# Hướng Dẫn Sử Dụng OpenWeatherMap API

## 1. Giới Thiệu

OpenWeatherMap là dịch vụ cung cấp dữ liệu thời tiết phong phú, đa dạng (Current Weather, Forecast, Historical Weather, Air Pollution, v.v.) thông qua REST API. Tài liệu này hướng dẫn bạn cách đăng ký, cấu hình và tích hợp OpenWeatherMap API vào dự án JavaScript/React.

---

## 2. Đăng Ký & Lấy API Key

1. Truy cập trang chủ: [https://openweathermap.org/](https://openweathermap.org/)
2. Đăng ký tài khoản (Sign Up) hoặc đăng nhập (Sign In).
3. Vào mục **API keys** trong trang cá nhân.
4. Nhấn **Create key**, đặt tên và lưu lại giá trị **API Key** để sử dụng.

> **Lưu ý:** Giữ bí mật API Key, không commit trực tiếp vào repository công khai.

---

## 3. Cài Đặt Môi Trường

1. Tạo file `.env` ở thư mục gốc dự án:

   ```bash
   REACT_APP_OWM_API_KEY=your_api_key_here
   ```
2. Thêm vào `.gitignore`:

   ```gitignore
   .env
   ```
3. Khởi động lại dev server để biến môi trường được nạp.

---

## 4. Các Endpoint Thông Dụng

| Loại dữ liệu            | Endpoint                        | Phương thức | Tham số chính                                         |
| ----------------------- | ------------------------------- | ----------- | ----------------------------------------------------- |
| Current Weather         | `/data/2.5/weather`             | GET         | `q` (city name), `lat`&`lon` (tọa độ), `id` (city id) |
| 5-day / 3-hour Forecast | `/data/2.5/forecast`            | GET         | tương tự Current                                      |
| 16-day Daily Forecast   | `/data/2.5/forecast/daily`      | GET         | `cnt` (số ngày), tương tự                             |
| Historical Weather      | `/data/2.5/onecall/timemachine` | GET         | `dt` (timestamp), `lat`, `lon`                        |
| Air Pollution           | `/data/2.5/air_pollution`       | GET         | `lat`, `lon`                                          |

> **Ghi chú:** Tất cả request cần thêm `appid={API_KEY}` và có thể thêm `units=metric` (độ C) hoặc `units=imperial` (độ F), `lang=vi` để lấy ngôn ngữ tiếng Việt.

---

## 5. Ví Dụ Triển Khai với Axios

### 5.1. Cài đặt Axios

```bash
npm install axios
```

### 5.2. Tạo axiosClient chung

```js
// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
  params: {
    appid: process.env.REACT_APP_OWM_API_KEY,
    units: 'metric',
    lang: 'vi',
  },
});

axiosClient.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default axiosClient;
```

### 5.3. Tạo service gọi API

```js
// src/api/weatherService.js
import axiosClient from './axiosClient';

const weatherService = {
  getCurrent: city => axiosClient.get('/weather', { params: { q: city } }),
  getForecast: (city, days = 5) => axiosClient.get('/forecast', { params: { q: city, cnt: days } }),
};

export default weatherService;
```

### 5.4. Sử dụng trong React Component

```jsx
import React, { useEffect, useState } from 'react';
import weatherService from '../api/weatherService';

export default function WeatherCard({ city }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    weatherService.getCurrent(city)
      .then(res => setData(res))
      .catch(() => setError('Không lấy được dữ liệu'));
  }, [city]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Đang tải...</p>;

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.weather[0].description}</p>
      <p>Nhiệt độ: {data.main.temp}°C</p>
    </div>
  );
}
```

---

## 6. Xử Lý Lỗi & Giới Hạn

* OpenWeatherMap áp dụng **rate limit**: gói miễn phí \~60 calls/phút.
* Khi vượt quá, API trả về 429 Too Many Requests.
* Luôn catch lỗi và hiển thị thông báo phù hợp.

---

## 7. Lời Khuyên Thêm

* Dùng `onecall` API để lấy cả current, forecast, historical chỉ với một request.
* Tối ưu caching (in-memory hoặc localStorage) nếu cần nhiều lần.
* Sử dụng Typescript để định nghĩa rõ interface dữ liệu.

---

## 8. Kết Luận

Với OpenWeatherMap API, bạn dễ dàng tích hợp dữ liệu thời tiết vào ứng dụng web/mobile. Quan trọng nhất là bảo mật API Key, xử lý lỗi và tối ưu rate limit. Chúc bạn thành công!
