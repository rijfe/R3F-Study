import { Box, Circle, Cone, Cylinder, Plane, Sphere, Torus, TorusKnot } from "@react-three/drei";
import * as THREE from "three"

function Meshes(){
    return(
        <>
            {/* <mesh>
                <boxGeometry args={[1, 1, 1]}/>
                <meshBasicMaterial color={0xff0000}/>
            </mesh> */}
            <Plane args={[40,40]} rotation-x={-Math.PI/2} receiveShadow = {true}>
                <meshStandardMaterial/>
            </Plane>
            {/* <Box args={[1,1,1]} castShadow={true} position-y={0.5}>
                <meshStandardMaterial color={0xff0000} />
            </Box>

            <Sphere args={[1]} position={[0,1,-3]} material-color={0xffff00}/>

            <Circle
                args={[1]}
                position={[0,1,3]}
                material-color={"violet"}
                material-side={THREE.DoubleSide}
            />

            <Cone
                args={[1, 2]}
                position={[3,1,3]}
                material-color={"brown"}
            />

            <Cylinder
                args={[2, 1, 2]}
                position={[3,1,-3]}
                material-color={"pink"}
            />

            <Torus
                args={[1, 0.2]}
                position={[-3,1.2,-3]}
                material-color={"hotpink"}
            /> */}

            <TorusKnot
                args={[1,0.2,128,128,2,3]}
                material-color={"teal"}
                position={[0,1.6,0]}
                receiveShadow
                castShadow
            >
                <meshStandardMaterial color={0xff0000} roughness={0.5} metalness={1}/>
            </TorusKnot>

            <TorusKnot
                args={[1,0.2,128,128,2,3]}
                position={[5,1.6,0]}
                receiveShadow
                castShadow
            >
                <meshLambertMaterial color={0xff0000} emissive={0x0abff0} emissiveIntensity={0.5}/>
            </TorusKnot>

            <TorusKnot
                args={[1,0.2,128,128,2,3]}
                position={[-5,1.6,0]}
                receiveShadow
                castShadow
            >
                <meshPhongMaterial color={0xff0000} emissive={0x00ff00} emissiveIntensity={0.5} specular={0x0000ff} shadowSide={100}/>
            </TorusKnot>

            <TorusKnot
                args={[1,0.2,128,128,2,3]}
                position={[5,1.6,5]}
                receiveShadow
                castShadow
            >
                <meshDepthMaterial opacity={0.5}/>
            </TorusKnot>
        </>
    );
}

export default Meshes;