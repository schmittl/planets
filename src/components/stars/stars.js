import THREE from 'three';
import utils from '../utils';
import stars from './galaxy_starfield.png';

class Stars {
  constructor() {
    var starGeometry  = new THREE.SphereGeometry(400, 32, 32);

    var starTexture = utils.loadTexture(stars);

    var starMaterial = new THREE.MeshBasicMaterial();
    starMaterial.map = starTexture;
    starMaterial.side = THREE.BackSide;

    this.starMesh = new THREE.Mesh(starGeometry, starMaterial);
  }

  get mesh() {
    return this.starMesh;
  }
}


export default Stars;