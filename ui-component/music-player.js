import player from '../styles/Music_player.module.css'
import { Button } from '@mantine/core'
import { useState,useEffect } from 'react';
export default function Music_player() {
    const [isplaying, Setisplaying] = useState(false)
    const trigger = () => Setisplaying(!isplaying)
    const audio = new Audio(`https://s2.naasongs.download/teqc69oze1zawc/Salute%20-%20%282008%29/%5BiSongs.info%5D%2002%20-%20Ninnena%20Nenu.mp3`)
    const ytdl = require('ytdl-core')
    useEffect(() => {
        isplaying ? audio.play() : audio.pause();
      }
    );
    return (
        <div className={player.main}>
            <Button onClick={trigger}>{isplaying ? "Pause" : "Play"}</Button>
        </div>
    )
}
