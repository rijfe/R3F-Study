import { Box, Circle, Points, useAnimations, useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect,useMemo,useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { isEnteredAtom } from "../stores";
import gsap from "gsap";
import * as THREE from "three";

import Loader from "./Loader";

let timeLine;
const colors = {
    boxMaterialColor: "#DC4F00",
};

function Dancer(){
    const dancerRef = useRef(null);
    const boxRef = useRef(null);
    const starGroupRef01 = useRef(null);
    const starGroupRef02 = useRef(null);
    const starGroupRef03 = useRef(null);
    const rectAreaLightRef = useRef(null);
    const hemisphereLightRef = useRef(null);

    const {scene, animations} = useGLTF("/models/dancer.glb");
    const {actions} = useAnimations(animations, dancerRef);

    const [curAni, setCurAni] = useState("wave");
    const [rotateFinished, setRotateFinished] = useState(false);

    const sroll = useScroll();
    const isEntered = useRecoilValue(isEnteredAtom);
    const three = useThree();

    const texture = useTexture("/textures/5.png");

    const {positions} = useMemo(()=>{
        const count = 500;
        const positions = new Float32Array(count * 3);
        for(let i=0; i<count*3; i++){
            positions[i] = (Math.random() - 0.5) * 25;
        }

        return{positions};
    },[]);

    useEffect(()=>{
        if(!isEntered) return;
        three.camera.lookAt(1,2,0);
        actions["wave"].play();

        three.scene.background = new THREE.Color(colors.boxMaterialColor);

        scene.traverse((obj)=>{
            if(obj.isMesh){
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        })
    },[actions,isEntered, three.camera, three.scene]);

    useEffect(()=>{
        let timeOut;
        if(curAni === "wave"){
            actions[curAni]?.reset().fadeIn(0.5).play();
        }
        else{
            actions[curAni]?.reset().fadeIn(0.5).play().setLoop(THREE.LoopOnce, 1);
        }

        timeOut = setTimeout(()=>{
            if(actions[curAni]){
                actions[curAni].paused = true;
            }
        }, 8000);

        return ()=>{
            clearTimeout(timeOut);
        }
    },[actions, curAni]);

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
        }, 0.5).from(dancerRef.current.position, {
            duration:4,
            x:3,
        }, "<").to(dancerRef.current.position, {
            duration:10,
            x:2,
            z:8,
        }, "<").to(dancerRef.current.position, {
            duration:10,
            x:0,
            z:6,
        }).to(dancerRef.current.position, {
            duration:10,
            x:0,
            z:16,
        });

        gsap.fromTo(three.camera.rotation, {
            z:Math.PI,
        },{
            duration:2.5,
            z:0,
        });

        gsap.fromTo(colors, {boxMaterialColor:"#0C0400"},{duration:2.5, boxMaterialColor:"#DC4F00"});

        gsap.to(starGroupRef01.current, {
            yoyo: true,
            duration:2,
            repeat: -1,
            ease:"linear",
            size:0.05
        });

        gsap.to(starGroupRef02.current, {
            yoyo: true,
            duration:3,
            repeat: -1,
            ease:"linear",
            size:0.05
        });

        gsap.to(starGroupRef03.current, {
            yoyo: true,
            duration:4,
            repeat: -1,
            ease:"linear",
            size:0.05
        });

    },[isEntered, three.camera.position, three.camera.rotation]);

    useFrame(()=>{
        if(!isEntered) return;

        timeLine.seek(sroll.offset * timeLine.duration());

        boxRef.current.material.color = new THREE.Color(colors.boxMaterialColor);

        if(rotateFinished){
            setCurAni("breakdancingEnd");
        }
        else{
            setCurAni("wave");
        }
    });

    if(isEntered){
        return (
            <>
                <primitive ref={dancerRef} object={scene} scale={0.05}/>
                <ambientLight intensity={2}/>
                <rectAreaLight ref={rectAreaLightRef} position={[0,10,0]} intensity={30}/>
                <pointLight position={[0,5,0]} intensity={45} castShadow receiveShadow/>
                <hemisphereLight ref={hemisphereLightRef} position={[0,5,0]} intensity={0} groundColor={"lime"} color={"blue"}/>

                <Box 
                    ref={boxRef}
                    position={[0,0,0]}
                    args={[100,100,100]}
                >
                    <meshStandardMaterial color={"#DC4F00"} side={THREE.DoubleSide}/>
                </Box>

                <Circle 
                    castShadow 
                    receiveShadow
                    args={[8,32]}
                    rotation-x={-Math.PI/2}
                    position-y={-4.4}
                > 
                    <meshStandardMaterial color={"#DC4f00"} side={THREE.DoubleSide}/>
                </Circle>

                <Points positions={positions.slice(0, positions.length/3)}>
                    <pointsMaterial 
                        ref={starGroupRef01}
                        size={0.5} 
                        color={new THREE.Color("#DC4f00")} 
                        sizeAttenuation 
                        depthWrite
                        alphaMap={texture}
                        transparent
                        alphaTest={0.001}
                    />
                </Points>
                <Points positions={positions.slice(positions.length/3, positions.length*2/3)}>
                    <pointsMaterial 
                        ref={starGroupRef02}
                        size={0.5} 
                        color={new THREE.Color("#DC4f00")} 
                        sizeAttenuation 
                        depthWrite
                        alphaMap={texture}
                        transparent
                        alphaTest={0.001}
                    />
                </Points>
                <Points positions={positions.slice(positions.length*2/3)}>
                    <pointsMaterial 
                        ref={starGroupRef03}
                        size={0.5} 
                        color={new THREE.Color("#DC4f00")} 
                        sizeAttenuation 
                        depthWrite
                        alphaMap={texture}
                        transparent
                        alphaTest={0.001}
                    />
                </Points>
            </>
            
        );
    }

    return <Loader isComplited/>;
    
}

export default Dancer;