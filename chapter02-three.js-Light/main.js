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
camera.position.z = 8;
camera.position.y = 1; // camera와 mesh의 위치가 같아 mesh가 안보이던걸 해결하기 위해 camera 좌표값 수정.

const floorGeometry = new THREE.PlaneGeometry(20,20) // 바닥 역할을 할 geometry
const floorMaterial = new THREE.MeshStandardMaterial({color:0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // 바닥 x 축 기준으로 -Math.PI / 2 만큼 회전. 회전 값은 radian
floor.receiveShadow = true;
floor.castShadow =true;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh);

/* 주변광, 그림자 생기지 않음. */
// const ambientLight = new THREE.AmbientLight(0xffffff, 5);
// scene.add(ambientLight);

/* 태양광 같다고 생각하면 됨. */
// const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
// directionalLight.castShadow = true;
// directionalLight.position.set(3,4,5);
// directionalLight.lookAt(0,0,0);
// scene.add(directionalLight);
/* 빛이 어디 방향으로 향하고 어디에 있는지 알도록 해주는 Helper. */
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(directionalLightHelper);

/* 광을 반으로 잘라서 위쪽과 아래쪽 색상이 다른 광원. */
// const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5);
// hemisphereLight.position.set(0,1,0);
// hemisphereLight.lookAt(0,0,0);
// scene.add(hemisphereLight);
/* 빛이 어디 방향으로 향하고 어디에 있는지 알도록 해주는 Helper. */
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1);
// scene.add(hemisphereLightHelper);

/* 일정 부분만 퍼지는 광원. */
// const pointLight = new THREE.PointLight(0xffffff, 5,5,4); // 빛의 색, 세기, 빛이 도달하는 최대 거리, 거리에 따라 줄어드는 빛이 양
// pointLight.castShadow = true;
// pointLight.position.set(1,1,1);
// scene.add(pointLight);
/* 빛이 어디 방향으로 향하고 어디에 있는지 알도록 해주는 Helper. */
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

/* 사각형 판 모양에서 빛이 나오는거 같은 광원. */
// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2) // 빛의 색, 세기, 넓이, 높이
// rectAreaLight.position.set(0,1,2);
// scene.add(rectAreaLight);

const targetObj = new THREE.Object3D();
scene.add(targetObj);

/* 무대 조명처럼 비추는 광원.  lookAt 못씀.*/
const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI/4, 1, 1); // 빛의 색, 세기, 빛이 퍼지는 각도, 빛이 끝나는 경계 자연스러움 정도,거리에 따라 줄어드는 빛이 양
spotLight.castShadow = true;
spotLight.position.set(0,5,0);
spotLight.target = targetObj;
spotLight.target.position.set(1,0,2);
scene.add(spotLight);
/* 빛이 어디 방향으로 향하고 어디에 있는지 알도록 해주는 Helper. */
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

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