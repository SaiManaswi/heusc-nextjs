import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import React from "react";
import { Color } from 'three';


function monopoly(props) {
    return (
        <div id="canvas-container" style={{ height: '600px' }}>
            <Canvas camera={{ position: [5, 5, 7] }}>
                <ambientLight intensity={0.1} />
                <directionalLight position={[0, 0, 5]} />
                <OrbitControls />
                <mesh>
                    <boxGeometry args={[9, 9, 0.3]} />
                    <meshStandardMaterial color="rgb(144,144,144)" />
                </mesh>
                <Hedge position={[5.375, 0, 0]} />
                <Hedge position={[-5.375, 0, 0]} />
                <Vedge position={[0, 5.375, 0]} />
                <Vedge position={[0, -5.375, 0]} />

            </Canvas>
        </div>
    )
}


function Vedge(props) {
    let box = []
    for (let index = 0; index < 5; index++) {
        box.push(
            <>
                <mesh position={[index, props.position[1], props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                    <boxGeometry args={[1, 1.75, 0.3]} />
                    <meshStandardMaterial/>
                </mesh>
            </>
        )
    }
    for (let index = 1; index < 5; index++) {
        box.push(
            <mesh position={[-index, props.position[1], props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                <boxGeometry args={[1, 1.75, 0.3]} />
                <meshStandardMaterial />
            </mesh>
        )
    }
    return (
        <>{box}</>
    )
}
function Hedge(props) {
    let box = []
    for (let index = 0; index < 5; index++) {
        box.push(
            <mesh position={[props.position[0], index, props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                <boxGeometry args={[1.75, 1, 0.3]} />
                <meshStandardMaterial />
            </mesh>
        )
    }
    for (let index = 1; index < 5; index++) {
        box.push(
            <mesh position={[props.position[0], -index, props.position[2]]} onClick={(e) => console.log(e.eventObject.position)}>
                <boxGeometry args={[1.75, 1, 0.3]} />
                <meshStandardMaterial />
            </mesh>
        )
    }
    return (
        <>{box}</>
    )
}
export default monopoly;