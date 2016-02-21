import './index.css';
import THREE from 'three';
import Earth from 'earth/earth';
import Moon from 'moon/moon';
import Sun from 'sun/sun';
import Stars from 'stars/stars';
import OrbitControls from 'OrbitControls';

var clock, renderer, scene, camera, controls, canvas;
var stars, earth, moon, sun;

function createRenderer() {
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  canvas = renderer.domElement;
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    45, // Field of View
    window.innerWidth / window.innerHeight, // aspect ratio
    10, 1000); // far and near plane
  camera.position.x = 90;
  camera.position.y = 32;
  camera.position.z = 200;
  camera.lookAt(scene.position);
}

function createControls() {
  controls = new OrbitControls(camera, canvas);
  controls.noKeys = true;
  controls.noPan = true;
  controls.minDistance = 40;
  controls.maxDistance = 500;
}

function createLight() {
  var pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.castShadow = true;
  scene.add(pointLight);

  var ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);
}

function createStars() {
  stars = new Stars();
  scene.add(stars.mesh);
}

function createEarth() {
  earth = new Earth();
  scene.add(earth.createOrbit());
}

function createMoon() {
  moon = new Moon();
  earth.mesh.add(moon.mesh);
  earth.mesh.add(moon.createOrbit());
}

function createSun() {
  sun = new Sun();
  sun.mesh.add(earth.mesh);
  scene.add(sun.mesh);
}

function onWindowResize() {
  var height = window.innerHeight;
  var width  = window.innerWidth;
  renderer.setSize( width, height );
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function registerEventListener() {
  window.addEventListener('resize', onWindowResize, false);
}

function init() {
  scene = new THREE.Scene();
  clock = new THREE.Clock();

  createRenderer();
  createCamera();
  createControls();

  createStars();
  createLight();
  createEarth();
  createMoon();
  createSun();

  registerEventListener();
  document.body.appendChild(canvas);

  loop();
}


function loop() {
  var delta = clock.getDelta();

  earth.update(delta);
  moon.update(delta);
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

init();