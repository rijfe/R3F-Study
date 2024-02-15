import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import Meshes from "./Meshes";
import Lights from "./Lights";
import * as THREE from "three";

function MainCanvas(){
    return(
        <Canvas 
            gl={{antialias: true}}
            /* 아래 3개 다 같은 동작 */
            shadows={"soft"}
            // shadows = {{enabled:true, type:THREE.PCFSoftShadowMap}}
            // shadows
            camera={{
                fov:60, 
                aspect: window.innerWidth/window.innerHeight,
                near: 0.1,
                far: 100,
                position: [5,5,5]
            }}
            scene={{background: new Color(0x000000)}}
        >   
            <OrbitControls/>
            <Lights/>
            <Meshes/>
        </Canvas>
    );
}

export default MainCanvas;