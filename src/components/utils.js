import THREE from 'three';

var utils = {
  loadTexture: function (path) {
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load(path, function (image) {
      texture.image = image;
      texture.needsUpdate = true;
    });

    return texture;
  }
};

export default utils;