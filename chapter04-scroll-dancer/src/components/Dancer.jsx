import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect,useRef } from "react";
import { useRecoilValue } from "recoil";
import { isEnteredAtom } from "../stores";
import gsap from "gsap";

import Loader from "./Loader";

let timeLine;

function Dancer(){
    const dancerRef = useRef(null);
    const {scene, animations} = useGLTF("/models/dancer.glb");
    const {actions} = useAnimations(animations, dancerRef);
    const sroll = useScroll();
    const isEntered = useRecoilValue(isEnteredAtom);
    const three = useThree();

    useEffect(()=>{
        if(!isEntered) return;
        actions["wave"].play();
    },[actions,isEntered]);

    useEffect(()=>{
        if(!isEntered) return;
        if(!dancerRef.current) return;

        gsap.fromTo(three.camera.position, {
            x:-5,
            y:5,
            z:5,
        },{
            duration:2.5,
            x:0,
            y:6,
            z:12,
        });

        gsap.fromTo(three.camera.rotation,{
            z:Math.PI
        },{
            duration:2.5,
            z:0
        })
    },[isEntered, three.camera.position, three.camera.rotation]);

    useEffect(()=>{
        if(!isEntered) return;
        if(!dancerRef.current) return;

        timeLine = gsap.timeline();
        timeLine.from(dancerRef.current.rotation, {
            duration:4,
            y:-4 * Math.PI,
        }, 0.5)
    },[isEntered]);

    useFrame(()=>{
        if(!isEntered) return;

        timeLine.seek(sroll.offset * timeLine.duration());
    })

    if(isEntered){
        return (
            <>
                <ambientLight intensity={2}/>
                <primitive ref={dancerRef} object={scene} scale={0.05}/>
            </>
            
        );
    }

    return <Loader isComplited/>;
    
}

export default Dancer;