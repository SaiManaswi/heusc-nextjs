import player from '../styles/Music_player.module.css'
import { Button } from '@mantine/core'
import React from 'react';
class Music_player extends React.PureComponent {
    constructor(props) {
        console.log("Music Rendered");
        super(props);
        this.audio = props.audiosource
    }

    render() {
        return (
            <div className={player.main}>
                <Button onClick={() => this.audio.play()}>Play</Button>
                <Button onClick={() => this.audio.pause()}>Pause</Button>
                <Button onClick={() => console.log(this.audio.currentTime)}>currentTime</Button>
            </div>
        )
    }
}
export default Music_player;