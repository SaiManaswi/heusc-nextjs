import Head from 'next/head'
import styles from '../styles/Home.module.css'
import bstyles from '../styles/Button.module.css'
import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [opened, setOpened] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>HEUSC App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to HEUSC
        </h1>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          styles={{
            drawer: { backgroundColor: '#252741', color: 'aliceblue' },
          }}
          title="Menu"
          padding="xl"
          size='20%'
        >
          {
            <div className={bstyles.bmenu}>
              <Button onClick={() => router.push('/do-list', undefined, { shallow: true })} className={bstyles.mb}>To-do List</Button>
            </div>
          }
        </Drawer>
        <Button onClick={() => setOpened(true)} className={bstyles.sus}>Open Menu</Button>
      </main>
    </div>
  )
}
