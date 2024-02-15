import "./style.css";
import * as THREE from "three";

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
camera.position.x = 5;
camera.position.y = 5; // camera와 mesh의 위치가 같아 mesh가 안보이던걸 해결하기 위해 camera 좌표값 수정.

const floorGeometry = new THREE.PlaneGeometry(20,20) // 바닥 역할을 할 geometry
const floorMaterial = new THREE.MeshStandardMaterial({color:0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // 바닥 x 축 기준으로 -Math.PI / 2 만큼 회전. 회전 값은 radian
floor.receiveShadow = true;
floor.castShadow =true;
floor.name = "Floor";
scene.add(floor);

/* 태양광 같다고 생각하면 됨. */
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3,4,5);
directionalLight.lookAt(0,0,0);

/* 그림자 품질 */
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;

/* 그림자 크기 */
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;

directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);

const loader = new GLTFLoader();
const gltf = await loader.loadAsync("/dancer.glb");
const charcter = gltf.scene; // Load한 데이터중 scene만 출력
const animationClips = gltf.animations; // 마찬가지로 animation만 출력
charcter.position.y = 0.8;
charcter.scale.set(0.01, 0.01, 0.01);
charcter.receiveShadow = true;
charcter.castShadow = true;

/* traverse를 이용하면 Object의 모든 요소 탐색 가능. */
charcter.traverse(obj => {
  if(obj.isMesh){
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
})
scene.add(charcter);

const mixer = new THREE.AnimationMixer(charcter); 
const action = mixer.clipAction(animationClips[3]); // animation 지정
action.setLoop(THREE.LoopPingPong); // 반복 횟수
// // action.setDuration(10); // animation 실행 시간
// //action.setEffectiveTimeScale(2); // animation 실행 속도
// action.setEffectiveWeight(2); // 낮을수록 춤 대충 침.
action.play(); // animation 실행

/* 일정시간이 지나면 animation 정지 */
// setTimeout(()=>{
//   mixer.clipAction(animationClips[4]).paused = true;
// }, 3000);

const controls = new OrbitControls(camera, renderer.domElement); // camera 컨트롤.
controls.enableDamping = true; // 돌리는 방향으로 조금 더 회전
controls.dampingFactor = 0.03;

/* Three.js 화면 상의 물체를 관통하는 레이저 - Raycaster */
const rayCaster = new THREE.Raycaster();

const newPosition = new THREE.Vector3(0,1,0);

renderer.domElement.addEventListener("pointerdown", (e)=>{
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -((e.clientY / window.innerHeight) * 2 - 1);

  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
  const intersects = rayCaster.intersectObjects(scene.children);

  const intersectsFloor = intersects.find((i)=> i.object.name === "Floor");
  console.log(intersectsFloor);
  newPosition.copy(intersectsFloor.point);
  newPosition.y = 1;
});

window.addEventListener("resize",()=>{                    // 웹 페이지 크기 변동 할때마다 사이즈 변경.
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
})

const clock = new THREE.Clock();
const targetVector = new THREE.Vector3();
const render = () => {
  charcter.lookAt(newPosition);
  targetVector.subVectors(newPosition, charcter.position).normalize().multiplyScalar(0.01);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  controls.update(); // Orbit
  if(mixer){
    mixer.update(clock.getDelta());
  }
};

render();

renderer.render(scene, camera); // scene, camera render