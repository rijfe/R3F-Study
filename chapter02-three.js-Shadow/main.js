import "./style.css";
import * as THREE from "three";
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