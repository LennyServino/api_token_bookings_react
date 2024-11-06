import { useEffect, useState } from 'react'

/* import './App.css' */
import Login from './components/Login'
import Rutas from './routes/Rutas'
import { BrowserRouter } from 'react-router-dom'
import stylesMenu from './styles/Menu.module.css'
import Menu from './routes/Menu'

//importando iconos
import { IoMenu } from "react-icons/io5";

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
        {
          /* si el usuario esta muestro el dashboard */
          user &&
          <div className={stylesMenu.dashboard}>
            <button className={stylesMenu.hamburger} onClick={toggleMenu}>
              <IoMenu />
            </button>

            <Menu className={`${stylesMenu.menu} ${menuOpen ? stylesMenu.active : 'hidden'}`} />

            {/* contenedor del contenido */}
            <div className={stylesMenu.content}>
              <Rutas user={user} />
            </div>
          </div>
        }
      </BrowserRouter>
    </>
  )
}

export default App
