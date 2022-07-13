import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({children}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>HEUSC App</title>
      </Head>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}