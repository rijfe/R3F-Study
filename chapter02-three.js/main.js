import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer();
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

  const geometry = new THREE.BoxGeometry(1,1,1) // widt, height, depth
  const material = new THREE.MeshStandardMaterial({color: 0xff0000});
  const mesh = new THREE.Mesh(geometry, material); // mesh에 geometry, material 추가

  scene.add(mesh);

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