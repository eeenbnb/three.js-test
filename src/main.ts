import * as THREE from 'three';
declare function require(x: string): any;
require('three-first-person-controls')(THREE);

class Setup{
  renderer:THREE.WebGLRenderer;
  scene:THREE.Scene;
  camera:THREE.PerspectiveCamera;
  constructor(){
    //renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    //scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xf0f0f0 );
    this.scene.add( new THREE.GridHelper( 1000, 1000 ) );
    this.scene.add( new THREE.AxisHelper(20) );
    //camera
    this.camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 100000);
    this.camera.position.set(0, 1.7, -1.5);
    this.camera.lookAt(new THREE.Vector3(0,1.7,0));
    this.scene.add(this.camera);
    //light
    this.scene.add( new THREE.AmbientLight( 0xF0F0F0 ) );

  }
  getRenderer():THREE.WebGLRenderer{
    return this.renderer;
  }
  getScene():THREE.Scene{
    return this.scene;
  }
  getCamera():THREE.PerspectiveCamera{
    return this.camera;
  }
}

window.addEventListener('DOMContentLoaded', () => {

  let setup = new Setup();
  const renderer = setup.getRenderer();
  const scene = setup.getScene();
  const camera = setup.getCamera();

  document.body.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add( group );
  {
    const geometry = new THREE.BoxGeometry(1000,0,1000);
    const material = new THREE.MeshPhongMaterial({color: 0x00ff00});
    const zimen      = new THREE.Mesh(geometry, material);
    zimen.position.set(0,0,0);
    scene.add(zimen);
  }

  {
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshPhongMaterial({color: 0xffff00});
    const hako      = new THREE.Mesh(geometry, material);
    hako.position.set(0,0.5,0);
    scene.add(hako);
  }

  const controls = new THREE.FirstPersonControls(camera,renderer.domElement);
  controls.movementSpeed = 10;
  controls.lookSpeed = 0.1;
  controls.lon = -85;
  const clock = new THREE.Clock();

  const tick = (): void => {
    controls.update(clock.getDelta());
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
  };

  tick();
});
