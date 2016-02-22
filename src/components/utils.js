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
  },

  randomColorBetween: function(a, b) {
    var from = new THREE.Color(a);
    var to = new THREE.Color(b);
    return from.lerp(to, Math.random());
  }

};

export default utils;