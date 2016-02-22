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

    var glowGeometry = new THREE.SphereGeometry(30.6, 30, 30);
    var glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffce00,
      transparent: true,
      opacity: 0.2
    });

    this.sunMesh.add(new THREE.Mesh(glowGeometry, glowMaterial));

    this.group = new THREE.Group();
    this.vertices = [];
    this.offset = [];

    for (var i = 0; i < 300; i++) {
      var geometry = new THREE.Geometry();

      var vertex = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
      vertex.normalize();
      vertex.multiplyScalar(30);

      geometry.vertices.push(vertex);

      var vertex2 = vertex.clone();
      vertex2.multiplyScalar(Math.random() * 0.25 + 1);

      geometry.vertices.push(vertex2);
      this.vertices.push(vertex2.clone());
      this.offset.push(Math.random() * 2 * Math.PI );

      var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: utils.randomColorBetween('orange', 'orangered'),
        opacity: Math.random()
      }));

      this.group.add(line);
    }

    this.counter = 0;
    this.speed = 3;
  }

  get mesh() {
    return this.sunMesh;
  }

  get rays() {
    return this.group
  }

  update(delta) {
    this.counter += delta * this.speed;

    for(var i = 0; i < this.group.children.length; i++) {
      var child = this.group.children[i];
      var scale = (Math.cos(this.counter + this.offset[i]) + 1) / 2;
      var startVector = child.geometry.vertices[0];
      var scaledVector = this.vertices[i].clone().sub(startVector).multiplyScalar(scale);
      child.geometry.vertices[1] = scaledVector.add(startVector);
      child.geometry.verticesNeedUpdate = true;
    }
  }

}

export default Sun;