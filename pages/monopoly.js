import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import React, { useState,useEffect } from "react";
import { Color, TextureLoader } from 'three';
import {Button} from '@mantine/core';
import io from 'socket.io-client'
let socket;

function Monopoly(props) {
    const [pos,setState] = useState(0)

    useEffect(()=> {socketstart();},[])
    const socketstart = async()=>{
        await fetch('/api/socket')
        socket = io()
        socket.on('connect',()=>{
            console.log("connected")
        })
        socket.on('newpos', e =>{
            e = Number.parseInt(e)
            setState(e)
        })
    }
    const update=()=>{
        let val = (pos+1) % 40;
        setState(val);
        socket.emit('position',val);
    }
    return (
        <div id="canvas-container" style={{ height: '600px' }}>
            <Canvas camera={{ position: [5, 5, 7] }}>
                <ambientLight intensity={0.1} />
                <directionalLight position={[0, 0, 5]} />
                <OrbitControls />
                <mesh>
                    <boxGeometry args={[9, 9, 0.3]} />
                    <meshStandardMaterial color={"#cde6d0"}/>
                </mesh>
                <Edge cid={0} position={[-5.375,-5.375,0]} pos={pos}/>
                <Edge cid={10} position={[-5.375,5.375,0]} pos={pos}/>
                <Edge cid={20} position={[5.375,5.375,0]} pos={pos}/>
                <Edge cid={30} position={[5.375,-5.375,0]} pos={pos}/>
                <Hedge position={[-5.375, 0, 0]} texture={'yellow'} cid={0} rotation={false} pos={pos}/>
                <Vedge position={[0, 5.375, 0]} texture={'blue'} cid={10} rotation={false} pos={pos}/>
                <Hedge position={[5.375, 0, 0]} texture={'red'} cid={20} rotation={true} pos={pos}/>
                <Vedge position={[0, -5.375, 0]} texture={'green'} cid={30} rotation={true} pos={pos}/>
                
            </Canvas>
            <Button onClick={update}>Click</Button>
        </div>
    )
}

function Vedge(props) {
    let box = []
    if(props.rotation){
        for (let index = 0; index < 5; index++) {
            box.push(
                <mesh position={[index, props.position[1], props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                    <boxGeometry args={[1, 1.75, 0.3]} />
                    <meshStandardMaterial color={props.pos==(65-(props.cid + index))? "rgb(36, 36, 36)":new Color(props.texture)}/>
                </mesh>
            )
        }
        for (let index = 1; index < 5; index++) {
            box.push(
                <mesh position={[-index, props.position[1], props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                    <boxGeometry args={[1, 1.75, 0.3]} />
                    <meshStandardMaterial color={props.pos==(props.cid + index + 5)? "rgb(36, 36, 36)":new Color(props.texture)}/>
                </mesh>
            )
        }
    }
    else{
        for (let index = 0; index < 5; index++) {
            box.push(
                <mesh position={[index, props.position[1], props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                    <boxGeometry args={[1, 1.75, 0.3]} />
                    <meshStandardMaterial color={props.pos==(props.cid + index + 5)? "rgb(36, 36, 36)":new Color(props.texture)}/>
                </mesh>
            )
        }
        for (let index = 1; index < 5; index++) {
            box.push(
                <mesh position={[-index, props.position[1], props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                    <boxGeometry args={[1, 1.75, 0.3]} />
                    <meshStandardMaterial color={props.pos==(25-(props.cid + index))? "rgb(36, 36, 36)":new Color(props.texture)}/>
                </mesh>
            )
        }
    }
    return (
        <>{box}</>
    )
}
function Hedge(props) {
    let box = []
    if(props.rotation){
        for (let index = 1; index < 5; index++) {
            box.push(
                <mesh position={[props.position[0], -index, props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                    <boxGeometry args={[1.75, 1, 0.3]} />
                    <meshStandardMaterial color={new Color(props.pos==(props.cid + index + 5)?"rgb(36, 36, 36)":props.texture)}/>
                </mesh>
            )
        }
        for (let index = 0; index < 5; index++) {
            box.push(
                <mesh position={[props.position[0], index, props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                    <boxGeometry args={[1.75, 1, 0.3]} />
                    <meshStandardMaterial color={new Color(props.pos==(46-(props.cid + index + 1))? "rgb(36, 36, 36)":props.texture)}/>
                </mesh>
            )
        }
    }
    else{
        for (let index = 0; index < 5; index++) {
            box.push(
                <mesh position={[props.position[0], index, props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                <boxGeometry args={[1.75, 1, 0.3]} />
                <meshStandardMaterial color={new Color(props.pos==(props.cid + index + 5)? "rgb(36, 36, 36)":props.texture)}/>
            </mesh>
        )
    }
    for (let index = 1; index < 5; index++) {
        box.push(
            <mesh position={[props.position[0], -index, props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                <boxGeometry args={[1.75, 1, 0.3]} />
                <meshStandardMaterial color={new Color(props.pos==(5-(props.cid + index))?"rgb(36, 36, 36)":props.texture)}/>
            </mesh>
        )
    }
}
    return (
        <>{box}</>
    )
}

function Edge(props){
    return(
        <mesh position={props.position}>
                <boxGeometry args={[1.75, 1.75, 0.3]} />
                <meshStandardMaterial color={new Color(props.cid===props.pos?'rgb(36, 36, 36)' : 'white')}/>
        </mesh>
    )
}
export default Monopoly;