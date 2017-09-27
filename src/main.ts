import * as THREE from 'three';
import { Setup } from './setup';
declare function require(x: string): any;
(window as any).THREE = THREE;
require('../node_modules/three/examples/js/controls/PointerLockControls');

window.addEventListener('DOMContentLoaded', () => {

  let setup = new Setup();
  const renderer = setup.getRenderer();
  const scene = setup.getScene();
  const camera = setup.getCamera();

  document.getElementById('render-area').appendChild(renderer.domElement);


  const group = new THREE.Group();
  var objects = [];
  scene.add( group );
  {
    const geometry = new THREE.BoxGeometry(1000,0,1000);
    const material = new THREE.MeshPhongMaterial({color: 0x00ff00});
    const zimen      = new THREE.Mesh(geometry, material);
    zimen.position.set(0,0,0);
    scene.add(zimen);
    objects.push(zimen);
  }

  {
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshPhongMaterial({color: 0xffff00});
    const hako      = new THREE.Mesh(geometry, material);
    hako.position.set(0,0.5,0);
    scene.add(hako);
    objects.push(hako);
  }
  const controls = new (window as any).THREE.PointerLockControls(camera);
  scene.add( controls.getObject() );

  raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
  const tick = (): void => {
    raycaster.ray.origin.copy( controls.getObject().position );
    raycaster.ray.origin.y -= 10;

    let intersections = raycaster.intersectObjects( objects );
    let isOnObject = intersections.length > 0;

    var time = performance.now();
    var delta = ( time - prevTime ) / 1000;
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    if ( moveForward ) velocity.z -= 400.0 * delta;
    if ( moveBackward ) velocity.z += 400.0 * delta;
    if ( moveLeft ) velocity.x -= 400.0 * delta;
    if ( moveRight ) velocity.x += 400.0 * delta;

    if ( isOnObject === true ) {
		    velocity.y = Math.max( 0, velocity.y );
		}

    controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    prevTime = time;
  };

  tick();
  document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

  document.getElementById("start").addEventListener( 'click', (event)=>{
    controls.enabled = true;
    const element:Element = document.body;
    element.requestPointerLock = element.requestPointerLock;
		element.requestPointerLock();
    document.getElementById("start").style.cssText = "display:none"
    document.getElementById('render-area').style.cssText = "display:block";
	}, false );

});

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var raycaster;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var onKeyDown = function ( event ) {
  switch ( event.keyCode ) {
    case 38: // up
    case 87: // w
    moveForward = true;
    break;
    case 37: // left
    case 65: // a
    moveLeft = true; break;
    case 40: // down
    case 83: // s
    moveBackward = true;
    break;
    case 39: // right
    case 68: // d
    moveRight = true;
    break;

  }
};
var onKeyUp = function ( event ) {
  switch( event.keyCode ) {
    case 38: // up
    case 87: // w
    moveForward = false;
    break;
    case 37: // left
    case 65: // a
    moveLeft = false;
    break;
    case 40: // down
    case 83: // s
    moveBackward = false;
    break;
    case 39: // right
    case 68: // d
    moveRight = false;
    break;
  }
};
