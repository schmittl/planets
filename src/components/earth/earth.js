import THREE from 'three';
import earthMap from './earthmap2k.jpg';
import earthNormalMap from './earth_normalmap_flat2k.jpg';
import earthSpecularMap from './earthspec2k.jpg';
import clouds from './fair_clouds_1k.png';

function loadTexture(path) {
  var texture = new THREE.Texture();
  var loader = new THREE.ImageLoader();
  loader.load(path, function (image) {
    texture.image = image;
    texture.needsUpdate = true;
  });

  return texture;
}

class Earth {
  constructor() {
    //create geometry
    var sphereGeometry = new THREE.SphereGeometry(15, 30, 30);

    //load textures
    var earthTexture = loadTexture(earthMap);
    var normalTexture = loadTexture(earthNormalMap);
    var specularTexture = loadTexture(earthSpecularMap);

    //create material
    var earthMaterial = new THREE.MeshPhongMaterial();
    earthMaterial.map = earthTexture;

    earthMaterial.normalMap = normalTexture;
    earthMaterial.normalScale = new THREE.Vector2(0.7, 0.7);

    earthMaterial.specularMap = specularTexture;
    earthMaterial.specular = new THREE.Color(0x262626);


    this.earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    this.earthMesh.name = 'earth';

    // clouds
    var sphereGeometry = new THREE.SphereGeometry(15.2, 30, 30);

    //load texture
    var cloudsTexture = loadTexture(clouds);

    var cloudsMaterial = new THREE.MeshPhongMaterial();
    cloudsMaterial.map = cloudsTexture;
    cloudsMaterial.transparent = true;

    this.cloudsMesh = new THREE.Mesh(sphereGeometry, cloudsMaterial);
    this.cloudsMesh.name = 'clouds';
    this.earthMesh.children.push(this.cloudsMesh);
  }

  get mesh() {
    return this.earthMesh;
  }

  update(delta) {
    this.earthMesh.rotation.y += delta * 0.030;
    this.cloudsMesh.rotation.y += delta * 0.042;
  }
}

export default Earth;