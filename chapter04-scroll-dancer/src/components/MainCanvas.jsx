import {  ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Dancer from "./Dancer";
import { Suspense } from "react";
import Loader from "./Loader";
import MovingDom from "./dom/MovingDom";
import { useRecoilValue } from "recoil";
import { isEnteredAtom } from "../stores";

function MainCanvas(){
    const aspectRatio = window.innerWidth/window.innerHeight;
    const isEntered = useRecoilValue(isEnteredAtom);

    return (
        <Canvas 
            id="canvas" 
            gl={{antialias:true}} 
            shadows="soft" 
            camera={{fov:30, aspect: aspectRatio, near:0.01, far:1000, position:[0,6,12]}}
            scene={{background: new THREE.Color(0x000000)}}
        >
                <ScrollControls pages={isEntered ? 8 : 0} damping={0.25}>
                    <Suspense fallback={<Loader/>}>
                        <MovingDom/>
                        <Dancer/>
                    </Suspense>
                </ScrollControls>
        </Canvas>
    );
}

export default MainCanvas;