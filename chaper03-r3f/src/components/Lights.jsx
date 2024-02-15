import { SpotLight, useHelper } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Lights(){
    const lightRef = useRef(null);
    const targetRef = useRef(null);
    const [target, setTarget] = useState();

    //useHelper(lightRef, THREE.DirectionalLightHelper,3,0xffff00);
    //useHelper(lightRef, THREE.PointLightHelper,1,0xffff00);
    // useHelper(lightRef, THREE.HemisphereLightHelper,1,0xffff00);
    // useHelper(lightRef, THREE.SpotLightHelper,1,0xffff00);

    useEffect(()=>{
        if(targetRef.current) setTarget(targetRef.current);
    },[])

    return (
        <>
            {/* <ambientLight args={[0xffffff, 5]}/> */}

            <directionalLight
                castShadow
                ref={lightRef}
                args={[0xffffff, 5]} 
                position={[4,4,4]}
                shadow-camera-left={-25}
                shadow-camera-right={25}
                shadow-camera-top={25}
                shadow-camera-bottom={-25}
                shadow-camera-near={0.1}
                shadow-camera-far={1000}
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
            />

            {/* <pointLight ref={lightRef} args={[0xffffff, 10, 10, 1]} position-y={2} castShadow={true}/> */}

            {/* <hemisphereLight ref={lightRef} args={[0x0000ff, 0xff0000, 5]} position-y={2}/> */}

            {/* <rectAreaLight args={[0xffffff, 5, 4, 4]} position-y={1} rotation-x={-Math.PI/2}/> */}

            {/* <spotLight ref={lightRef} args={[0xffffff, 10, 100, Math.PI/4, 1, 0.5]} castShadow position={[3,3,3]}/> */}

            {/* <SpotLight 
                color={0xffffff} 
                intensity={10} 
                distance={100} 
                angle={Math.PI/4} 
                penumbra={1} 
                decay={0.5} 
                anglePower={100} 
                attenuation={5}
                radiusBottom={10}
                radiusTop={1}
                opacity={1}
                volumetric
                debug
                position={[3,3,3]}
                target={target}
            /> */}
        </>
    );
}

export default Lights;