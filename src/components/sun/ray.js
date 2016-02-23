import THREE from 'three';
import utils from '../utils';

class Ray {
  constructor() {
    this.geometry = new THREE.Geometry();
    this.material = new THREE.LineBasicMaterial();

    this.initializeRay();

    this.line = new THREE.Line(this.geometry, this.material);
  }

  initializeRay() {
    this.counter = 0;

    var vertex = Ray.randomVector();
    vertex.normalize();
    vertex.multiplyScalar(30);

    this.geometry.vertices[0] = vertex;
    this.geometry.vertices[1] = vertex.clone();

    this.length = utils.randomNumberBetween(4, 11.25);
    this.speed  = utils.randomNumberBetween(1, 3.5);

    this.material.color = utils.randomColorBetween('orange', 'orangered');
    this.material.opacity = utils.randomNumberBetween(0.1, 1);
    this.material.needsUpdate = true;
  }

  update(delta) {
    this.counter += delta * this.speed;

    if(this.counter >= Math.PI * 2) {
      this.initializeRay();
    } else {
      var scale = (Math.sin(this.counter - Math.PI / 2) + 1) / 2;
      this.geometry.vertices[1].setLength(30 + this.length * scale);
    }

    this.geometry.verticesNeedUpdate = true;
  }

  static randomVector() {
    return new THREE.Vector3(utils.randomNumberBetween(-1, 1), utils.randomNumberBetween(-1, 1), utils.randomNumberBetween(-1, 1));
  }
}

export default Ray;