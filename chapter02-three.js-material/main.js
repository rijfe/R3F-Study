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

const frontSideGeometry = new THREE.BoxGeometry(1,1,1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color:0x00ffff,
  side: THREE.FrontSide,
});
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.z = 4;
frontSideMesh.position.y = 0.5;
frontSideMesh.castShadow = true
frontSideMesh.receiveShadow = true;
scene.add(frontSideMesh);

const backSideGeometry = new THREE.BoxGeometry(1,1,1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
});
const backSideMesh = new THREE.Mesh(backSideGeometry,backSideMaterial);
backSideMesh.position.set(2,0.5,4); // 바닥인 plane과 바닥이 서로 겹쳐있어 renderer가 무엇을 rend할지 결정하지 못해 이상 현상 발생한다.
backSideMesh.position.y = 0.51; // 이런 간단한 방식으로 해결가능.
backSideMesh.receiveShadow = true;
// backSideMesh.castShadow = true;
scene.add(backSideMesh)

const doubleSideGeometry = new THREE.BoxGeometry(1,1,1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry,doubleSideMaterial);
doubleSideMesh.position.set(4,0.5,4); 
doubleSideMesh.position.y = 0.51;
doubleSideMesh.receiveShadow = true;
// doubleSideMesh.castShadow = true;
scene.add(doubleSideMesh)

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,20);
const torusKnotStandMaterial = new THREE.MeshStandardMaterial({color:0xff0000});
torusKnotStandMaterial.roughness = 0.5;
torusKnotStandMaterial.metalness = 1;
const torusKnotStandardMesh = new THREE.Mesh(torusKnotGeometry, torusKnotStandMaterial);
torusKnotStandardMesh.position.set(-4,1,0);
torusKnotStandardMesh.castShadow = true;
torusKnotStandardMesh.receiveShadow = true;
scene.add(torusKnotStandardMesh);

/* Lambert는 빛 반사 없음. */
const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotLambertMaterial.emissiveIntensity = 0.2;
const torusKnotLambertMesh = new THREE.Mesh(torusKnotGeometry, torusKnotLambertMaterial);
torusKnotLambertMesh.position.set(-2,1,0);
torusKnotLambertMesh.castShadow = true;
torusKnotLambertMesh.receiveShadow = true;
scene.add(torusKnotLambertMesh);

/* Phong은 빛 반사 있음. */
const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({color:0xff0000});
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color(0x0000ff);
torusKnotPhongMaterial.shininess = 100;
const torusKnotPhongMesh = new THREE.Mesh(torusKnotGeometry, torusKnotPhongMaterial);
torusKnotPhongMesh.position.set(0,1,0);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
scene.add(torusKnotPhongMesh);

/* Basic은 빛 영향 X */
const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
const torusKnotBasicMesh = new THREE.Mesh(torusKnotGeometry, torusKnotBasicMaterial);
torusKnotBasicMesh.position.set(2,1,0);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
scene.add(torusKnotBasicMesh);

/* Depth 가까우면 밝아지고 멀면 어두움. */
const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({color:0xffffff});
torusKnotDepthMaterial.opacity = 0.5;
const torusKnotDepthMesh = new THREE.Mesh(torusKnotGeometry, torusKnotDepthMaterial);
torusKnotDepthMesh.position.set(4,1,0);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
scene.add(torusKnotDepthMesh);

/* 동기 */
const textureLoader = new THREE.TextureLoader();
// textureLoader.load("/threejs.webp",(texture)=>{
//   const textureBoxGeometry = new THREE.BoxGeometry(1,1,1);
//   const textureMaterial = new THREE.MeshStandardMaterial({map:texture});
//   const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
//   textureMesh.position.set(0,0.5,2);
//   textureMesh.castShadow = true;
//   textureMesh.receiveShadow = true;
//   scene.add(textureMesh);
// });

/* 비동기 */
const texture = await textureLoader.loadAsync("/threejs.webp");
const textureBoxGeometry = new THREE.BoxGeometry(1,1,1);
const textureMaterial = new THREE.MeshStandardMaterial({map:texture});
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
textureMesh.position.set(0,0.5,2);
textureMesh.castShadow = true;
textureMesh.receiveShadow = true;
scene.add(textureMesh);

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