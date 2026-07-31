import styles from './Home.module.scss'

export function Home() {
  return (
    <div>
      <h1 className={styles.title}>Home</h1>
      <p className={styles.text}>
        Start building your assessment here. Add routes in{' '}
        <code className={styles.code}>src/App.tsx</code> and API calls in{' '}
        <code className={styles.code}>src/services</code>.
      </p>
    </div>
  )
}
