import player from '../styles/Music_player.module.css'
import { Button } from '@mantine/core'
import { useState,useEffect } from 'react';
export default function Music_player() {
    const [isplaying, Setisplaying] = useState(false)
    const trigger = () => Setisplaying(!isplaying)
    const audio = new Audio("1.mp3")
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
