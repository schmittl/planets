import THREE from 'three';
import utils from '../utils';
import Ray from './ray'
import sunMap from './texture_sun.jpg';

class Sun {
  constructor() {
    var sphereGeometry = new THREE.SphereGeometry(30, 30, 30);

    var sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffce00,
      map: utils.loadTexture(sunMap)
    });

    this.mesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    this.mesh.name = 'sun';

    var glowGeometry = new THREE.SphereGeometry(30.6, 30, 30);
    var glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffce00,
      transparent: true,
      opacity: 0.2
    });

    this.mesh.add(new THREE.Mesh(glowGeometry, glowMaterial));

    this.group = new THREE.Group();
    this.rays = [];

    for (var i = 0; i < 300; i++) {
      var ray = new Ray();
      this.rays.push(ray);
      this.group.add(ray.line);
    }
  }

  update(delta) {
    for (var i = 0; i < this.rays.length; i++) {
      this.rays[i].update(delta);
    }
  }

}

export default Sun;