import THREE from 'three';
import moonMap from './moonmap1k.jpg';
import moonBumpMap from './moonbump1k.jpg';


function loadTexture(path) {
  var texture = new THREE.Texture();
  var loader = new THREE.ImageLoader();
  loader.load(path, function (image) {
    texture.image = image;
    texture.needsUpdate = true;
  });

  return texture;
}

class Moon {
  constructor() {
    //create geometry
    var sphereGeometry = new THREE.SphereGeometry(5, 30, 30);

    //load textures
    var moonTexture = loadTexture(moonMap);
    var bumpTexture = loadTexture(moonBumpMap);

    //create material
    var moonMaterial = new THREE.MeshPhongMaterial();
    moonMaterial.map = moonTexture;
    moonMaterial.bumpMap = bumpTexture;

    this.moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    this.moonMesh.name = 'moon';
    this.moonMesh.position.setX(30);

    this.counter = 0;
    this.speed = 0.5;
  }

  get mesh() {
    return this.moonMesh;
  }

  update(delta) {
    this.counter += delta * this.speed;
    this.moonMesh.rotation.y += delta * 0.030;

    this.moonMesh.position.x = 40 * Math.sin(this.counter);
    this.moonMesh.position.z = 40 * Math.cos(this.counter);
  }
}

export default Moon;