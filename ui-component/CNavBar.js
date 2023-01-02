import bstyles from '../styles/Button.module.css'
import Content from './Contents';
import { Drawer, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Music_player from '../ui-component/music-player'
import React from 'react';
import dynamic from 'next/dynamic'

class CNavBar extends React.PureComponent{
  constructor(props) {
    console.log("Nav Bar Rendered")
    super(props);
    this.state = {opened : false};
    this.audio = new Audio();
  }

  render(){
  return (
    <div>
      <Drawer
        opened={this.state.opened}
        onClose={() => this.setState({opened : false})}
        styles={{
          drawer: { backgroundColor: '#162B62', color: 'aliceblue' },
        }}
        title="Menu"
        padding="xl"
        size='15%'
      >
        {
          <>
            <Music_player audiosource={this.audio}/>
            <Content/>
          </>
        }
      </Drawer>
      <Button onClick={() => this.setState({opened : true})} className={bstyles.sus}><FontAwesomeIcon icon={faBars} size='2x' /></Button>
    </div>

  )}
}

export default dynamic(() => Promise.resolve(CNavBar), {
  ssr: false
})