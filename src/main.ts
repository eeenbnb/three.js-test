import * as THREE from 'three';

window.addEventListener('DOMContentLoaded', () => {

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  const camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 10000);
  camera.position.set(0, 0, 20);

  const group = new THREE.Group();
  scene.add( group );

  for(var i=0;i<1000;i++){
    const geometry = new THREE.BoxGeometry(10, 10, 0);
    const material = new THREE.MeshPhongMaterial({color: Math.random() * 0x808008 + 0x808080});
    const box      = new THREE.Mesh(geometry, material);
    box.position.x = Math.random() * 500 - 250;
		box.position.y = Math.random() * 500 - 250;
		box.position.z = Math.random() * 500 - 250;
    group.add(box);
  }

  scene.add( new THREE.AmbientLight( 0xF0F0F0 ) );

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  const tick = (): void => {
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
  };

  setInterval(()=>{
    camera.rotateX(0.001);
    camera.rotateY(0.001);

  },1);
  tick();
});
