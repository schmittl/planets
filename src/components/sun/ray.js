import THREE from 'three';
import utils from '../utils';

class Ray {
  constructor() {
    this.geometry = new THREE.Geometry();
    this.createRay();

    this.line = new THREE.Line(this.geometry, new THREE.LineBasicMaterial({
      color: utils.randomColorBetween('orange', 'orangered'),
      opacity: utils.randomNumberBetween(0.1, 1)
    }));
  }

  createRay() {
    this.counter = 0;

    var vertex = this.randomVector();
    vertex.multiplyScalar(30);
    this.geometry.vertices[0] = vertex;

    var vertex2 = vertex.clone();
    vertex2.multiplyScalar(utils.randomNumberBetween(1, 1.375));
    this.geometry.vertices[1] = vertex;

    this.direction = vertex2.clone().sub(vertex);
    this.speed = utils.randomNumberBetween(2, 3);
  }

  update(delta) {
    this.counter += delta * this.speed;

    if(this.counter >= Math.PI * 2) {
      this.createRay();
    } else {
      var scale = (Math.sin(this.counter - Math.PI / 2) + 1) / 2;
      this.geometry.vertices[1] = this.geometry.vertices[0].clone().addScaledVector(this.direction, scale);
    }

    this.geometry.verticesNeedUpdate = true;
  }

  randomVector() {
    var vertex = new THREE.Vector3(utils.randomNumberBetween(-1, 1), utils.randomNumberBetween(-1, 1), utils.randomNumberBetween(-1, 1));
    vertex.normalize();
    return vertex;
  }
}

export default Ray;