import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from './Login'
import Register from './Register'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat Voll</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Login />
        <Register />
      </main>
    </div>
  )
}
