import THREE from 'three'

var renderer;
var scene;
var camera;

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
  camera.position.x = 15;
  camera.position.y = 16;
  camera.position.z = 13;
  camera.lookAt(scene.position);
}

function createSphere() {
  var sphereGeometry = new THREE.SphereGeometry(6,30,30); //height width depth
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: "red"
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);
}

function createLight() {
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(10, 20, 20);
  scene.add(spotLight);
}


//init() gets executed once
function init() {

  scene = new THREE.Scene();

  createRenderer();
  createCamera();

  createLight();
  createSphere();

  document.body.appendChild(renderer.domElement);

  //render() gets called at end of init
  //as it looped forever
  render();
}

//infinite loop
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

init();