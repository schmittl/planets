import './index.css';
import THREE from 'three';
import Earth from 'earth/earth';
import Moon from 'moon/moon';
import Sun from 'sun/sun';
import Stars from 'stars/stars';
import FlyControls from 'controls';

var clock;
var renderer;
var scene;
var camera;
var stars;
var earth;
var moon;
var sun;
var controls;
var frameid;
var canvas;
var hasFocus;

function createRenderer() {
  renderer = new THREE.WebGLRenderer();
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
  controls = new FlyControls(camera);
  controls.movementSpeed = 20;
  controls.rollSpeed = 0.25;
  controls.autoForward = false;
  controls.dragToLook = false;
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
}

function createMoon() {
  moon = new Moon();
  earth.mesh.add(moon.mesh);
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
  frameid = requestAnimationFrame(loop);

  earth.update(delta);
  moon.update(delta);
  controls.update( hasFocus ? delta : 0 ); // freeze camera when mouse is not on canvas

  renderer.render(scene, camera);
}

init();