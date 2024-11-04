import { useState } from 'react'

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
            <Rutas />
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
