$(document).ready(() => {
  var scene, camera, renderer, threejs;
  var gui = null;

  var WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

  var mesh, color = 0xffffff;

  var de2ra = (degree) => { return degree * (Math.PI / 180); };


  const handleWindowResize = () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }


  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderScene();
  }

  const renderScene = () => {
    renderer.render(scene, camera);
  }

  const init = () => {
    threejs = document.getElementById('threejs');
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xb6b6b6, 1);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = false;

    threejs.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(0, 6, 60);
    camera.lookAt(scene.position);
    scene.add(camera);

    var geometry = new THREE.TorusKnotGeometry( 10, 3, 64, 20, 15, 10 );
    var material = new THREE.MeshLambertMaterial({
      color: color,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.rotation.y = de2ra(-40);
    mesh.scale.set(1, 1, 1);
    mesh.doubleSided = true;
    scene.add(mesh);

    var object3d = new THREE.DirectionalLight('white', 0.15);
    object3d.position.set(6, 3, 9);
    object3d.name = 'light1';
    scene.add(object3d);

    object3d = new THREE.DirectionalLight('white', 0.35);
    object3d.position.set(-6, -3, 0);
    object3d.name = 'light2';
    scene.add(object3d);

    object3d = new THREE.DirectionalLight('white', 1);
    object3d.position.set(9, 9, 6);
    object3d.name = 'light3';
    scene.add(object3d);

    object3d = new THREE.DirectionalLight('white', 1);
    object3d.position.set(-9, 9, -6);
    object3d.name = 'light4';
    scene.add(object3d);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    window.addEventListener('resize', handleWindowResize, false);

    var controller = new function () {
      this.boxColor = color;
    }();

    var gui = new dat.GUI();

    gui.addColor(controller, 'boxColor', color).onChange(() => {
      mesh.material.color.setHex(dec2hex(controller.boxColor));
    });
  }

  init();
  animate();

  const dec2hex = (i) => {
    var result = "0x000000";
    if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
    else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
    else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
    else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
    else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
    else if (i >= 1048575) { result = '0x' + i.toString(16); }
    if (result.length == 8) { return result; }

  }
});