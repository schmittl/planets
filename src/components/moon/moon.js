import THREE from 'three';
import utils from '../utils';
import moonMap from './moonmap1k.jpg';
import moonBumpMap from './moonbump1k.jpg';

class Moon {
  constructor() {
    //create geometry
    var sphereGeometry = new THREE.SphereGeometry(2, 30, 30);

    //load textures
    var moonTexture = utils.loadTexture(moonMap);
    var bumpTexture = utils.loadTexture(moonBumpMap);

    //create material
    var moonMaterial = new THREE.MeshPhongMaterial();
    moonMaterial.map = moonTexture;
    moonMaterial.bumpMap = bumpTexture;

    this.moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    this.moonMesh.name = 'moon';
    this.moonMesh.position.setX(30);
    this.moonMesh.receiveShadow = true;
    this.moonMesh.castShadow = true;

    this.counter = 0;
    this.speed = 0.5;
    this.orbitRadius = 40;
  }

  get mesh() {
    return this.moonMesh;
  }

  createOrbit() {
    var material = new THREE.LineBasicMaterial({ color: 0x888888 });
    var geometry = new THREE.CircleGeometry(this.orbitRadius, 100);
    geometry.vertices.shift();
    var line = new THREE.Line(geometry, material);
    line.rotation.x = Math.PI / 2;
    return line;
  }

  update(delta) {
    this.counter += delta * this.speed;
    this.moonMesh.rotation.y +=  delta * 0.5;

    this.moonMesh.position.x = this.orbitRadius * Math.sin(this.counter);
    this.moonMesh.position.z = this.orbitRadius * Math.cos(this.counter);
  }
}

export default Moon;