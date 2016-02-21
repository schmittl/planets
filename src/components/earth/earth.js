import THREE from 'three';
import utils from '../utils';
import earthMap from './earthmap2k.jpg';
import earthNormalMap from './earth_normalmap_flat2k.jpg';
import earthSpecularMap from './earthspec2k.jpg';
import clouds from './fair_clouds_1k.png';

class Earth {
  constructor() {
    //create geometry
    var sphereGeometry = new THREE.SphereGeometry(10, 30, 30);

    //load textures
    var earthTexture = utils.loadTexture(earthMap);
    var normalTexture = utils.loadTexture(earthNormalMap);
    var specularTexture = utils.loadTexture(earthSpecularMap);

    //create material
    var earthMaterial = new THREE.MeshPhongMaterial();
    earthMaterial.map = earthTexture;

    earthMaterial.normalMap = normalTexture;
    earthMaterial.normalScale = new THREE.Vector2(0.7, 0.7);

    earthMaterial.specularMap = specularTexture;
    earthMaterial.specular = new THREE.Color(0x262626);


    this.earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    this.earthMesh.name = 'earth';
    this.earthMesh.receiveShadow = true;
    this.earthMesh.castShadow = true;

    // clouds
    var sphereGeometry = new THREE.SphereGeometry(10.2, 30, 30);

    //load texture
    var cloudsTexture = utils.loadTexture(clouds);

    var cloudsMaterial = new THREE.MeshPhongMaterial();
    cloudsMaterial.map = cloudsTexture;
    cloudsMaterial.transparent = true;

    this.cloudsMesh = new THREE.Mesh(sphereGeometry, cloudsMaterial);
    this.cloudsMesh.name = 'clouds';
    this.earthMesh.add(this.cloudsMesh);

    this.counter = 0;
    this.speed = 0.3;
  }

  get mesh() {
    return this.earthMesh;
  }

  update(delta) {
    this.earthMesh.rotation.y += delta * 0.030;
    this.cloudsMesh.rotation.y += delta * 0.042;

    this.counter += delta * this.speed;

    this.earthMesh.position.x = 100 * Math.sin(this.counter);
    this.earthMesh.position.z = 100 * Math.cos(this.counter);
  }
}

export default Earth;