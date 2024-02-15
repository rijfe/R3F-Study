import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";

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
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshStandardMaterial({color: 0xffff00});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh);

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
/* 빛이 어디 방향으로 향하고 어디에 있는지 알도록 해주는 Helper. */
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

// const controls = new OrbitControls(camera, renderer.domElement); // camera 컨트롤.
// controls.enableDamping = true; // 돌리는 방향으로 조금 더 회전
// controls.dampingFactor = 0.03; 
// controls.enableZoom = true; // 줌 가능 여부
// controls.enablePan = true; // 화면 이동 여부
// controls.autoRotate = false; // 자동 회전
// controls.autoRotateSpeed = 1; // 자동 회전 속도

// /* 세로 방향 회전 각도 */
// controls.maxPolarAngle = Math.PI/2;
// controls.minPolarAngle = Math.PI/4;
// /* 가로 방향 회전 각도 */
// controls.maxAzimuthAngle = Math.PI/2;
// controls.minAzimuthAngle = -Math.PI/2;

/* 나는듯한 Controls, wasd로 이동 가능 시야 방향은 마우스로 조절 */
// const controls = new FlyControls(camera, renderer.domElement);
// controls.movementSpeed = 1;
// controls.rollSpeed = Math.PI/10;
// controls.autoForward = false;

camera.position.set(0,1,5);

/* 사람처럼 이동하는 컨트롤 */
// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.lookSpeed = 0.1; // 카메라 회전 속도
// controls.movementSpeed = 1; // 카메라 움직이는 속도
// controls.lookVertical = false; //카메라에 수직이동 여부

/* FPS게임에 유용하게 사용가능 lock이 활성화 되면 드래그 없이 화면 전환 가능 
   클릭 시 화면 전환, 빠져 나오려면 ESC 누르면 됨.
*/
// const controls = new PointerLockControls(camera, renderer.domElement);
// window.addEventListener("click",()=>{
//   controls.lock();
// });

/* 중심점을 기준으로 컨트롤 */
const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2; //회전 속도
controls.zoomSpeed = 1.5; // 줌 속도
controls.panSpeed = 0.5; // 화면 이동 속도
controls.noRotate = false;
controls.noPan = false;
controls.noZoom = false;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.05;

const target = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({color:0x0000ff})
);
target.position.set(4,0.5,0);
scene.add(target);
controls.target = target.position;

window.addEventListener("resize",()=>{                    // 웹 페이지 크기 변동 할때마다 사이즈 변경.
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
})

const clock = new THREE.Clock();
const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  //controls.update(); // Orbit
  // controls.update(clock.getDelta()); // fly
  //controls.update(clock.getDelta()); // first
  controls.update(); // trackball
};

render();

renderer.render(scene, camera); // scene, camera render