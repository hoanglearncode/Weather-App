import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import App from './pages/AppPage'
import Weather404Page from './pages/404'
import ActivityPage from './pages/ActivityPage'
const AppRouter = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="*" element={<Weather404Page />} />
        </Routes>
      </>
    )
}

export default AppRouter