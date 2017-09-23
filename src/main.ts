import * as THREE from 'three';

window.addEventListener('DOMContentLoaded', () => {

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  const gridHelper = new THREE.GridHelper( 10, 10 );
  scene.add( gridHelper );

  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  const camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 100000);
  camera.position.set(0, 1.7, -1.5);
  camera.lookAt(new THREE.Vector3(0,1.7,0));

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


  scene.add( new THREE.AmbientLight( 0xF0F0F0 ) );

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  const tick = (): void => {
    playerMove(camera);

    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    //camera.position.x += 0.01;
    //camera.lookAt(new THREE.Vector3(0,0,0));
  };

  window.addEventListener('keydown',keyEventListener);
  window.addEventListener('keyup',keyEventListener);

  tick();
});
var moveFlag:any = {
  "z":0,
  "x":0,
  "rY":0,
  "rXZ":0
};
var direction

function playerMove(camera:THREE.PerspectiveCamera){
  camera.position.z += moveFlag.z * 0.05 //* Math.cos(camera.rotation.y);
  camera.position.x += moveFlag.x * 0.05 //* Math.sin(camera.rotation.y);
  camera.rotateY(moveFlag.rY * 0.01);

  //camera.rotateX(moveFlag.rXZ * 0.01);
}

function keyEventListener(event:KeyboardEvent){
  console.log(event);
    switch(event.type){
      case 'keydown':
        switch(event.key){
          case "w":
            moveFlag.z = 1;
          break;
          case "s":
            moveFlag.z = -1;
          break;

          case "a":
            moveFlag.x = 1;
          break;
          case "d":
            moveFlag.x = -1;
          break;

          case "ArrowLeft":
            moveFlag.rY = 1;
          break;
          case "ArrowRight":
            moveFlag.rY = -1;
          break;

          case "ArrowUp":
            moveFlag.rXZ = 1;
          break;
          case "ArrowDown":
            moveFlag.rXZ = -1;
          break;
        }
      break;
      case 'keyup':
      switch(event.key){
        case "w":
        case "s":
          moveFlag.z = 0;
        break;

        case "a":
        case "d":
          moveFlag.x = 0;
        break;

        case "ArrowLeft":
        case "ArrowRight":
          moveFlag.rY = 0;
        break;

        case "ArrowUp":
        case "ArrowDown":
          moveFlag.rXZ = 0;
        break;
      }
      break;
    }
}
