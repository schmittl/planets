import THREE from 'three';
import Earth from 'earth/earth';

var renderer;
var scene;
var camera;
var earth;

function createRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    45, // Field of View
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, 1000); // far and near plane
  camera.position.x = 90;
  camera.position.y = 32;
  camera.position.z = 32;
  camera.lookAt(scene.position);
}

function createLight() {
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(100, 10, -50);
  directionalLight.name = 'directional';
  scene.add(directionalLight);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
}

function createEarth() {
  earth = new Earth();
  scene.add(earth.mesh);
}

//init() gets executed once
function init() {
  scene = new THREE.Scene();

  createRenderer();
  createCamera();

  createLight();
  createEarth();

  document.body.appendChild(renderer.domElement);

  //render() gets called at end of init
  //as it looped forever
  render();
}

//infinite loop
function render() {
  earth.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

init();