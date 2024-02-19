import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";


function GLBModels(){
    const {scene, animations} = useGLTF("/dancer.glb");
    const ref = useRef(null);
    const three = useThree(); // 아래 useFrame과 같은 객체를 사용할 수 있음.
    const {actions} = useAnimations(animations, ref);
    const [ani, setAni] = useState("wave");

    useEffect(()=>{
        scene.traverse(obj=>{
            if(obj.isMesh){
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
    },[scene,actions]);

    useEffect(()=>{
        actions[ani].fadeIn(0.5).play();
        return(()=>{
            actions[ani].fadeOut(0.5).stop();
        })
    },[actions, ani]);

    useFrame((state, delta)=>{});

    return (
        <primitive 
            ref={ref} 
            object={scene} 
            scale={0.01} 
            position-y={0.8}
            onClick={()=>{
                setAni(prev=>{
                    if(prev === "wave") return "windmill";
                    return "wave";
                });
            }}
            onPointerUp={()=>{}}
            onPointerDown={()=>{}}
        />
    );
}

export default GLBModels;