import player from '../styles/Music_player.module.css'
import { Button } from '@mantine/core'
import React from 'react';
class Music_player extends React.PureComponent {
    constructor(props) {
        console.log("Music Rendered");
        super(props);
        this.audio = props.audiosource
        this.state ={
            status: this.audio.paused? "Play" : "Pause"
        }
    }
    render() {
        return (
            <div className={player.main}>
                <Button onClick={() => {
                    if (this.audio.paused) {
                        this.audio.play()
                        this.setState({status: "Pause"})
                    }
                    else{
                        this.audio.pause()
                        this.setState({status: "Play"})
                    }
                }}>{this.state.status}</Button>
            </div>
        )
    }
}
export default Music_player;