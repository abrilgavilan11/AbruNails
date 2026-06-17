import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importamos el Layout
import Layout from './layouts/Layout'

// Importamos las páginas
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Booking from './pages/Booking'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard' // <-- Nueva importación

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Layout (Navbar y Footer visibles) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Catalog />} />
          <Route path="/reservar" element={<Booking />} />
        </Route>

        {/* Rutas sin Layout (Pantallas completas) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} /> {/* <-- Nueva ruta */}
      </Routes>
    </BrowserRouter>
  )
}

export default App