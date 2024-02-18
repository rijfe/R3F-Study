import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";


function GLBModels(){
    const {scene, animations} = useGLTF("/dancer.glb");
    const ref = useRef(null);
    const three = useThree(); // 아래 useFrame과 같은 객체를 사용할 수 있음.
    const {actions} = useAnimations(animations, ref);

    useEffect(()=>{
        scene.traverse(obj=>{
            if(obj.isMesh){
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
        actions["wave"].play();
    },[scene,actions]);

    useFrame((state, delta)=>{

    });

    return (
        <primitive ref={ref} object={scene} scale={0.01} position-y={0.8}/>
    );
}

export default GLBModels;