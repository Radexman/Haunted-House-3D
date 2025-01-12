import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Timer } from 'three/examples/jsm/misc/Timer.js';
import GUI from 'lil-gui';
import { Zip } from 'three/examples/jsm/libs/fflate.module.js';

// Base

// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// House

// Textures
const textureLoader = new THREE.TextureLoader();

const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg');

// Floor
const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(20, 20),
	new THREE.MeshStandardMaterial({
		alphaMap: floorAlphaTexture,
		transparent: true,
	})
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// House container
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 4), new THREE.MeshStandardMaterial());
walls.position.y = 1.25;
house.add(walls);

// Roof
const roof = new THREE.Mesh(new THREE.ConeGeometry(3.3, 1.3, 4), new THREE.MeshStandardMaterial());
roof.position.y = 2.5 + 1.3 / 2;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const door = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), new THREE.MeshStandardMaterial());
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial();

const bushOne = new THREE.Mesh(bushGeometry, bushMaterial);
bushOne.position.set(0.8, 0.2, 2.2);
bushOne.scale.set(0.5, 0.5, 0.5);

const bushTwo = new THREE.Mesh(bushGeometry, bushMaterial);
bushTwo.position.set(1.4, 0.1, 2.15);
bushTwo.scale.set(0.25, 0.25, 0.25);

const bushThree = new THREE.Mesh(bushGeometry, bushMaterial);
bushThree.position.set(-0.8, 0.1, 2.2);
bushThree.scale.set(0.4, 0.4, 0.4);

const bushFour = new THREE.Mesh(bushGeometry, bushMaterial);
bushFour.position.set(-1, 0.05, 2.6);
bushFour.scale.set(0.15, 0.15, 0.15);

house.add(bushOne, bushTwo, bushThree, bushFour);

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.15);
const graveMaterial = new THREE.MeshStandardMaterial();

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
	// Coordinates
	const angle = Math.random() * Math.PI * 2;
	const radius = 3 + Math.random() * 4;
	const x = Math.sin(angle) * radius;
	const y = Math.random() * 0.4;
	const z = Math.cos(angle) * radius;

	// Mesh
	const grave = new THREE.Mesh(graveGeometry, graveMaterial);
	grave.position.set(x, y, z);
	grave.rotation.x = (Math.random() - 0.5) * 0.4;
	grave.rotation.y = (Math.random() - 0.5) * 0.4;
	grave.rotation.z = (Math.random() - 0.5) * 0.4;

	// Add graves to the group
	graves.add(grave);
}

// Lights

// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);

// Sizes
const sizes = {
	width: innerWidth,
	height: innerHeight,
};

// Resize
window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = innerWidth;
	sizes.height = innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(4, 2, 5);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

// Animate
const timer = new Timer();

const tick = () => {
	// Timer
	timer.update();
	const elapsedTime = timer.getElapsed();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
