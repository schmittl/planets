import './index.css';
import THREE from 'three';
import Earth from 'earth/earth';
import Moon from 'moon/moon';
import FlyControls from 'controls';

var clock;
var renderer;
var scene;
var camera;
var earth;
var moon;
var controls;
var frameid;
var canvas;
var hasFocus;

function createRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvas = renderer.domElement;
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

function createControls() {
  controls = new FlyControls(camera);
  controls.movementSpeed = 20;
  controls.rollSpeed = 0.25;
  controls.autoForward = false;
  controls.dragToLook = false;
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

function createMoon() {
  moon = new Moon();
  earth.mesh.add(moon.mesh);
}

function onWindowResize() {
  var height = window.innerHeight;
  var width  = window.innerWidth;
  renderer.setSize( width, height );
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function onMouseLeave() {
  hasFocus = false;
}

function onMouseEnter() {
  hasFocus = true;
}

function registerEventListener() {
  window.addEventListener('resize', onWindowResize, false);
  canvas.addEventListener('mouseleave', onMouseLeave, false);
  canvas.addEventListener('mouseenter', onMouseEnter, false);
}

function init() {
  scene = new THREE.Scene();
  clock = new THREE.Clock();

  createRenderer();
  createCamera();
  createControls();

  createLight();
  createEarth();
  createMoon();

  registerEventListener();
  document.body.appendChild(canvas);

  loop();
}


function loop() {
  var delta = clock.getDelta();
  frameid = requestAnimationFrame(loop);

  earth.update(delta);
  moon.update(delta);
  controls.update( hasFocus ? delta : 0 ); // freeze camera when mouse is not on canvas


  renderer.render(scene, camera);
}

init();