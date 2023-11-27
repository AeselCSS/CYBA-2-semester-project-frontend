import { NavBarButtons } from './NavbarButton'
import NavbarLogo from './NavbarLogo'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    
  return (
   <>
      <nav>
        <NavbarLogo/>
        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/about">
          Abous Us
        </NavLink>

        <NavLink to="/contact">
          Contact
        </NavLink>

        <NavBarButtons/>
      </nav>
   </>
  )
}
