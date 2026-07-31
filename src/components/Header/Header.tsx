import { Link } from 'react-router-dom'
import { Home, Info } from 'lucide-react'
import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand}>
          React Project
        </Link>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            <Home size={16} />
            Home
          </Link>
          <Link to="/about" className={styles.link}>
            <Info size={16} />
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}
