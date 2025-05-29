**WeatherApp**

Một ứng dụng thời tiết dựa trên React cung cấp thông tin **thời tiết hiện tại**, **dự báo 5 ngày**, và bản đồ tương tác Mapbox.

---

## 📝 Mục lục

1. [Tổng quan](#tổng-quan)
2. [Tính năng](#tính-năng)
3. [Thư viện và công nghệ](#thư-viện-và-công-nghệ)
4. [Cấu trúc dự án](#cấu-trúc-dự-án)
5. [Biến môi trường / API Keys](#biến-môi-trường--api-keys)
6. [Cách sử dụng](#cách-sử-dụng)
7. [Các thành phần chính & Hook](#các-thành-phần-chính--hook)
8. [Các hàm hỗ trợ](#các-hàm-hỗ-trợ)
9. [Styling](#styling)

---

## Tổng quan

`WeatherApp` là một component React đơn trang, cho phép:

* Lấy và hiển thị thời tiết hiện tại theo thành phố tìm kiếm hoặc vị trí người dùng.
* Hiển thị dự báo thời tiết 5 ngày.
* Tích hợp Mapbox để hiển thị bản đồ thời tiết tương tác.
* Cho phép người dùng nhấp vào bản đồ để xem thời tiết tại tọa độ đó.

---

## Tính năng

* Tìm kiếm thời tiết theo tên thành phố.
* Tự động xác định vị trí người dùng khi load trang.
* Hiển thị nhiệt độ, điều kiện thời tiết, độ ẩm, tốc độ gió, tầm nhìn, áp suất, nhiệt độ cảm nhận, thời gian mặt trời mọc/lặn.
* Dự báo 5 ngày với nhiệt độ cao/thấp và icon mô tả.
* Bản đồ Mapbox với marker thời tiết tùy chỉnh và popup chi tiết.
* Nút tìm nhanh cho các thành phố yêu thích.
* Xử lý trạng thái loading và lỗi.

---

## Thư viện và công nghệ

* React (useState, useEffect, useRef)
* **lucide-react** (thư viện icon)
* **Mapbox GL JS** (bản đồ tương tác)
* Fetch API (giao tiếp mạng)

---

## Cấu trúc dự án

```
src/
└── components/
    └── WeatherApp.jsx   # Component chính
```

---

## Biến môi trường / API Keys

* `API_KEY`: Khóa API OpenWeatherMap
* `MAPBOX_TOKEN`: Khóa truy cập Mapbox

Lưu vào file `.env` hoặc công cụ quản lý bí mật:

```
REACT_APP_WEATHER_API_KEY=your_openweather_key
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

---

## Cách sử dụng

1. Cài đặt dependencies:

   ```bash
   npm install
   ```
2. Thiết lập biến môi trường như trên.
3. Chạy server dev:

   ```bash
   npm start
   ```
4. Mở trình duyệt và truy cập `http://localhost:3000`.

---

## Các thành phần chính & Hook

### WeatherApp Component

* **State hooks**:

  * `currentWeather` (object): dữ liệu thời tiết đã xử lý.
  * `forecast` (array): dữ liệu dự báo 5 ngày.
  * `loading` (boolean): trạng thái loading.
  * `error` (string): thông báo lỗi.
  * `searchQuery` (string): giá trị input tìm kiếm.
  * `currentLocation` (object): tọa độ vị trí hiện tại.
  * `favorites` (array): danh sách thành phố nhanh.
  * `showMap` (boolean): bật/tắt bản đồ.
  * `mapLoaded` (boolean): trạng thái nạp Mapbox.

* **Refs**:

  * `mapContainer`: DOM node chứa bản đồ Mapbox.
  * `map`: thể hiện Mapbox map instance.
  * `marker`: marker thời tiết trên bản đồ.

* **useEffect**:

  1. Nạp script và CSS Mapbox GL JS.
  2. Khởi tạo bản đồ khi đã load và `showMap` = true.
  3. Cập nhật marker và fly-to khi `currentWeather` thay đổi.
  4. Lấy vị trí người dùng khi component mount.

* **Event handlers**:

  * `handleSearch()`: tìm kiếm theo tên thành phố.
  * `getCurrentLocation()`: lấy tọa độ và tìm thời tiết.
  * `toggleMap()`: chuyển hiển thị bản đồ.

---

## Các hàm hỗ trợ

* **fetchWeatherByCity(city)**: gọi API thời tiết hiện tại theo tên thành phố.
* **fetchWeatherByCoords(lat, lon)**: gọi API theo tọa độ.
* **fetchForecast(lat, lon)**: gọi API dự báo 5 ngày và xử lý dữ liệu.
* **processWeatherData(data)**: chuyển đổi response API sang định dạng `currentWeather`.
* **getWeatherIconType(condition)**: map điều kiện thời tiết sang loại icon.
* **getWeatherIcon(condition)**: trả về component icon từ lucide-react.

---

## Styling

* Tailwind CSS cho layout và theme.
* Background gradient (`bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700`).
* Hiệu ứng glassmorphism (`backdrop-blur-md`, `bg-white/10`).
* Responsive grid cho nội dung và bản đồ trên màn hình lớn.

---

*Last updated: May 29, 2025*
