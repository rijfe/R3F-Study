import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight) //  비율 맞추기
document.body.appendChild(renderer.domElement);

/* 장면 생성*/
const scene = new THREE.Scene();

/* 카메라 생성 
   -perspective ➡️ 주로 사용 ➡️ 절두체 안에 있는거만 담는다. near, far 밖에 있는 mesh나 물체는 담지 않는다.
   -orthographic ➡️ 내가 사용해야 됨 */

const camera = new THREE.PerspectiveCamera(
  60, // fov
  window.innerWidth / window.innerHeight , //aspect
  0.1, // near
  100 // far
);
camera.position.z = 5;
camera.position.y = 1; // camera와 mesh의 위치가 같아 mesh가 안보이던걸 해결하기 위해 camera 좌표값 수정.

const light = new THREE.DirectionalLight(0xffffff, 5);
light.castShadow = true;
light.position.set(3,4,5);
light.lookAt(0,0,0);
scene.add(light);

const floorGeometry = new THREE.PlaneGeometry(20,20) // 바닥 역할을 할 geometry
const floorMaterial = new THREE.MeshStandardMaterial({color:0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // 바닥 x 축 기준으로 -Math.PI / 2 만큼 회전. 회전 값은 radian
floor.receiveShadow = true;
floor.castShadow =true;
scene.add(floor);

const geometry = new THREE.BoxGeometry(1,1,1) // widt, height, depth
const material = new THREE.MeshStandardMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material); // mesh에 geometry, material 추가
mesh.castShadow = true;
mesh.position.y = 0.5;
scene.add(mesh);

const capsuleGeometry = new THREE.CapsuleGeometry(1,2,20,30);
const capsuleMaterial = new THREE.MeshStandardMaterial({color:0xffff00});
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsule.position.set(3,1.75,0);
capsule.castShadow = true;
capsule.receiveShadow = true;
scene.add(capsule);

const cylinderGeometry = new THREE.CylinderGeometry(1,1,2);
const cylinderMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
const cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
cylinder.position.set(-3,1,0);
cylinder.castShadow = true;
cylinder.receiveShadow = true;
scene.add(cylinder);

const torusGeometry = new THREE.TorusGeometry(0.5,0.1,16,100);
const torusMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});
const torus = new THREE.Mesh(torusGeometry,torusMaterial);
torus.position.set(0,0.5,1);
torus.castShadow = true;
torus.receiveShadow = true;
scene.add(torus);

const starShape = new THREE.Shape();
starShape.moveTo(0,1);
starShape.lineTo(0.2,0.2);
starShape.lineTo(1,0.2);
starShape.lineTo(0.4,-0.1);
starShape.lineTo(0.6,-1);
starShape.lineTo(0,-0.5);
starShape.lineTo(-0.6,-1);
starShape.lineTo(-0.4,-0.1);
starShape.lineTo(-1,0.2);
starShape.lineTo(-0.2,0.2);

const shapeGeometry = new THREE.ShapeGeometry(starShape);
const shapeMaterial = new THREE.MeshStandardMaterial({color:0xff00ff});
const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
shape.position.set(0,1,2);
scene.add(shape);

const extrudeSettings = {
  steps: 1,
  depth: 0.1,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize:0.3,
  bevelSegments:100,
};

const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({color:0x0ddaaf});
const extrude = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrude.position.set(2,1.3,2);
extrude.castShadow = true;
extrude.receiveShadow = true;
scene.add(extrude);

const controls = new OrbitControls(camera, renderer.domElement); // camera 컨트롤.
controls.update();

window.addEventListener("resize",()=>{                    // 웹 페이지 크기 변동 할때마다 사이즈 변경.
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
})

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();

renderer.render(scene, camera); // scene, camera render