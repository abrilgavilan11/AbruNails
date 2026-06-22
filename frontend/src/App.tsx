import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Booking from './pages/Booking'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Catalog />} />
          <Route path="/reservar" element={<Booking />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App