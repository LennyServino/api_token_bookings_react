import { useEffect, useState } from 'react'

/* import './App.css' */
import Login from './components/Login'
import Rutas from './routes/Rutas'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import stylesMenu from './styles/Menu.module.css'
import Menu from './routes/Menu'
import Calendar from './components/Calendar'
//importando iconos
import { IoMenu } from "react-icons/io5";
import PrivateRoute from './routes/privateRoute'
import Accomodations from './components/Accomodations'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const userStorage = localStorage.getItem('user_email_bookings')
    if(userStorage) {
      setUser(userStorage)
    }    
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <BrowserRouter>
        <div className={stylesMenu.dashboard}>
          <button className={stylesMenu.hamburger} onClick={toggleMenu}>
            <IoMenu />
          </button>

          <Menu className={`${stylesMenu.menu} ${menuOpen ? stylesMenu.active : 'hidden'}`} />

          {/* contenedor del contenido */}
          <div className={stylesMenu.content}>
            <Routes>
              <Route path="/alojamientos" element={
                <PrivateRoute>
                  <Accomodations />
                </PrivateRoute>
              } />

              <Route path="/calendario" element={
                <PrivateRoute>
                  <Calendar />
                </PrivateRoute>
              } /> 

              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to={user ? '/alojamientos' : '/login'} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
