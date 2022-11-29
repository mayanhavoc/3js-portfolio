import './style.css'

import * as THREE from 'three';
import { Light } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// field of view (360), aspect ratio, view frustum (objs vis rel to camera, 1 - 1000 means you can see pretty much anything)

const camera = new THREE.PerspectiveCamera( 75,  window.innerWidth/ window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);   
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(5);

renderer.render( scene, camera );

// x,y,z vector points that make up shape

// const geometry = new THREE.TorusGeometry( 10,3, 16, 100)

const coinTexture = new THREE.TextureLoader().load('./public/images/cst.png');

const coin = new THREE.Mesh(
  new THREE.CylinderGeometry( 5, 5, 0.5, 64, 64 ),
  new THREE.MeshBasicMaterial({ map: coinTexture })
  )
scene.add(coin);
  
const silverCoinTexture = new THREE.TextureLoader().load('./public/images/silverCoinTexture.png');

const silverCoin = new THREE.Mesh(
  new THREE.CylinderGeometry( 8, 8, 0.5, 64, 64 ),
  new THREE.MeshBasicMaterial({ map: silverCoinTexture })
)

scene.add( silverCoin );


// Most materials require light source (not Basic Material though)

// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });

// const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

// geometry + material
// const torus = new THREE.Mesh( geometry, material );
// const cylinder = new THREE.Mesh( geometry, material );

// scene.add(torus)


// Avatar

// const avatarTexture = new THREE.TextureLoader().load('./public/images/cst.png');

// const avatar = new THREE.Mesh(
//   new THREE.CylinderGeometry(5, 5, 1.2, 60, 60, 0, 6.3),
//   new THREE.MeshBasicMaterial({ map: avatarTexture })
// )
// scene.add(avatar);


// emits light in all directions
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,25,10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,100);
// scene.add(lightHelper, gridHelper);


// listen to DOM events on mouse and update camera position
const controls = new OrbitControls( camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const star = new THREE.Mesh( geometry, material );

  // x, y and z values for each star
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

// No. of stars
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('./public/images/spaceTexturedark.png');
scene.background = spaceTexture;

// Avatar

// const avatarTexture = new THREE.TextureLoader().load('./public/images/cst.png');

// const avatar = new THREE.Mesh(
//   new THREE.CylinderGeometry(5, 5, 1.2, 60, 60, 0, 6.3),
//   new THREE.MeshBasicMaterial({ map: avatarTexture })
// )
// scene.add(avatar);

// const jupiterTexture = new THREE.TextureLoader().load('./public/images/jupiter.png');

// const planetTexture = new THREE.TextureLoader().load('./public/images/jupiterTextureDark.png');

// const jupiter = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: jupiterTexture,
//     normalMap: planetTexture
//   })
// )

// scene.add(jupiter);

function animate(){
  requestAnimationFrame( animate );

  // every shape has properties like rotation and scale
  coin.rotation.x += 0.02;
  coin.rotation.y += 0.008;
  coin.rotation.z += 0.01;
  
  silverCoin.rotation.x += 0.012;
  silverCoin.rotation.y += 0.008;
  silverCoin.rotation.z += 0.001;

  controls.update();

  renderer.render(scene,camera);
}

animate()

coin.position.z = 1;
coin.position.setX(5);

silverCoin.position.z = 15;
silverCoin.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  coin.rotation.x += 0.02;
  coin.rotation.y += 0.008;
  coin.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting){
      entry.target.classList.add('.show');
    } else {
      entry.target.classList.remove('.show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));