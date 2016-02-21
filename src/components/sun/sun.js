import THREE from 'three';
import utils from '../utils';
import sunMap from './texture_sun.jpg';

class Sun {
  constructor() {
    var sphereGeometry = new THREE.SphereGeometry(30, 30, 30);

    var sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffce00,
      map: utils.loadTexture(sunMap)
    });

    this.sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    this.sunMesh.name = 'sun';

    var glowGeometry =  new THREE.SphereGeometry(30.6, 30, 30 );
    var glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffce00,
      transparent: true,
      opacity: 0.2
    });

    this.sunMesh.add(new THREE.Mesh(glowGeometry, glowMaterial));
  }

  get mesh() {
    return this.sunMesh;
  }

}

export default Sun;