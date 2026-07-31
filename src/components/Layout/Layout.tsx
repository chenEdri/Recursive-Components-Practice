import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import styles from './Layout.module.scss'

export function Layout() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
