import * as THREE from 'three';

export class Setup{
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
