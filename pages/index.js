import Head from 'next/head'
import styles from '../styles/Home.module.css'
import bstyles from '../styles/Button.module.css'
import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Music_player from '../ui-component/music-player'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HEUSC App</title>
      </Head>

      <main className={styles.main}>
        <CNavBar />
      </main>
    </div>
  )
}
export function CNavBar() {
  const [opened, setOpened] = useState(false);
  const router = useRouter()
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        styles={{
          drawer: { backgroundColor: '#39256a', color: 'aliceblue' },
        }}
        title="Menu"
        padding="xl"
        size='20%'
      >
        {
          <>
            <Music_player />
            <div className={bstyles.bmenu}>
              <Button onClick={() => router.push('/do-list', undefined, { shallow: true })} className={bstyles.mb}>To-do List</Button>
            </div>
          </>
        }
      </Drawer>
      <Button onClick={() => setOpened(true)} className={bstyles.sus}><FontAwesomeIcon icon={faBars} size='2x' /></Button>
    </div>

  )
}