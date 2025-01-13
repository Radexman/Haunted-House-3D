import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Timer } from 'three/examples/jsm/misc/Timer.js';
import { Sky } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';

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

// Floor textures
const floorAlphaTexture = textureLoader.load('./floor/alpha.webp');

const floorColorTexture = textureLoader.load('./floor/color.webp');
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.repeat.set(5, 5);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

const floorARMTexture = textureLoader.load('./floor/arm.webp');
floorARMTexture.repeat.set(5, 5);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

const floorDisplacementTexture = textureLoader.load('./floor/displacement.webp');
floorDisplacementTexture.repeat.set(5, 5);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

const floorNormalTexture = textureLoader.load('./floor/normal.webp');
floorNormalTexture.repeat.set(5, 5);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

// Walls textures
const wallsColorTexture = textureLoader.load('./walls/color.webp');
wallsColorTexture.colorSpace = THREE.SRGBColorSpace;

const wallsARMTexture = textureLoader.load('./walls/arm.webp');

const wallsNormalTexture = textureLoader.load('./walls/normal.webp');

// Roof textures
const roofColorTexture = textureLoader.load('./roof/color.webp');
roofColorTexture.colorSpace = THREE.SRGBColorSpace;

const roofARMTexture = textureLoader.load('./roof/arm.webp');

const roofNormalTexture = textureLoader.load('./roof/normal.webp');

roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

// Bush textures
const bushColorTexture = textureLoader.load('./bush/color.webp');
bushColorTexture.colorSpace = THREE.SRGBColorSpace;

const bushARMTexture = textureLoader.load('./bush/arm.webp');

const bushNormalTexture = textureLoader.load('./bush/normal.webp');

// Grave textures
const graveColorTexture = textureLoader.load('./grave/color.webp');
graveColorTexture.colorSpace = THREE.SRGBColorSpace;

const graveARMTexture = textureLoader.load('./grave/arm.webp');

const graveNormalTexture = textureLoader.load('./grave/normal.webp');

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

// Door textures
const doorColorTexture = textureLoader.load('./door/color.webp');
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load('./door/alpha.webp');
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.webp');
const doorHeightTexture = textureLoader.load('./door/height.webp');
const doorNormalTexture = textureLoader.load('./door/normal.webp');
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp');
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp');

// Door textures

// Floor
const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(20, 20, 100, 100),
	new THREE.MeshStandardMaterial({
		alphaMap: floorAlphaTexture,
		transparent: true,
		map: floorColorTexture,
		aoMap: floorARMTexture,
		roughnessMap: floorARMTexture,
		metalnessMap: floorARMTexture,
		normalMap: floorNormalTexture,
		displacementMap: floorDisplacementTexture,
		displacementScale: 0.15,
		displacementBias: -0.13,
	})
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const floorFolder = gui.addFolder('Floor');
floorFolder.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Floor Displacement Scale');
floorFolder.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Floor Displacement Bias');

// House container
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
	new THREE.BoxGeometry(4, 2.5, 4),
	new THREE.MeshStandardMaterial({
		map: wallsColorTexture,
		aoMap: wallsARMTexture,
		roughnessMap: wallsARMTexture,
		metalnessMap: wallsARMTexture,
		normalMap: wallsNormalTexture,
	})
);
walls.position.y = 1.25;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
	new THREE.ConeGeometry(3.3, 1.3, 4),
	new THREE.MeshStandardMaterial({
		map: roofColorTexture,
		aoMap: roofARMTexture,
		roughnessMap: roofARMTexture,
		metalnessMap: roofARMTexture,
		normalMap: roofNormalTexture,
	})
);
roof.position.y = 2.5 + 1.3 / 2;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const door = new THREE.Mesh(
	new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
	new THREE.MeshStandardMaterial({
		map: doorColorTexture,
		transparent: true,
		alphaMap: doorAlphaTexture,
		aoMap: doorAmbientOcclusionTexture,
		displacementMap: doorHeightTexture,
		displacementScale: 0.15,
		displacementBias: -0.04,
		normalMap: doorNormalTexture,
		metalnessMap: doorMetalnessTexture,
		roughness: doorRoughnessTexture,
	})
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
	color: '#ccffcc',
	map: bushColorTexture,
	aoMap: bushARMTexture,
	roughnessMap: bushARMTexture,
	metalnessMap: bushARMTexture,
	normalMap: bushNormalTexture,
});

const bushOne = new THREE.Mesh(bushGeometry, bushMaterial);
bushOne.position.set(0.8, 0.2, 2.2);
bushOne.scale.set(0.5, 0.5, 0.5);
bushOne.rotation.x = -0.75;

const bushTwo = new THREE.Mesh(bushGeometry, bushMaterial);
bushTwo.position.set(1.4, 0.1, 2.15);
bushTwo.scale.set(0.25, 0.25, 0.25);
bushTwo.rotation.x = -0.75;

const bushThree = new THREE.Mesh(bushGeometry, bushMaterial);
bushThree.position.set(-0.8, 0.1, 2.2);
bushThree.scale.set(0.4, 0.4, 0.4);
bushThree.rotation.x = -0.75;

const bushFour = new THREE.Mesh(bushGeometry, bushMaterial);
bushFour.position.set(-1, 0.05, 2.6);
bushFour.scale.set(0.15, 0.15, 0.15);
bushFour.rotation.x = -0.75;

house.add(bushOne, bushTwo, bushThree, bushFour);

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.1);
const graveMaterial = new THREE.MeshStandardMaterial({
	map: graveColorTexture,
	aoMap: graveARMTexture,
	roughnessMap: graveARMTexture,
	metalnessMap: graveARMTexture,
	normalMap: graveNormalTexture,
});

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
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 5);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

// Ghosts
const ghostOne = new THREE.PointLight('#8800ff', 6);
const ghostTwo = new THREE.PointLight('#ff0088', 6);
const ghostThree = new THREE.PointLight('#ff0000', 6);
scene.add(ghostOne, ghostTwo, ghostThree);

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

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and recieve
directionalLight.castShadow = true;
ghostOne.castShadow = true;
ghostTwo.castShadow = true;
ghostThree.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

for (const grave of graves.children) {
	grave.castShadow = true;
	grave.receiveShadow = true;
}

// Mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghostOne.shadow.mapSize.width = 256;
ghostOne.shadow.mapSize.height = 256;
ghostOne.shadow.camera.far = 10;

ghostTwo.shadow.mapSize.width = 256;
ghostTwo.shadow.mapSize.height = 256;
ghostTwo.shadow.camera.far = 10;

ghostThree.shadow.mapSize.width = 256;
ghostThree.shadow.mapSize.height = 256;
ghostThree.shadow.camera.far = 10;

// Sky
const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);

// Fog
scene.fog = new THREE.FogExp2('#02343f', 0.1);

sky.material.uniforms['turbidity'].value = 10;
sky.material.uniforms['rayleigh'].value = 3;
sky.material.uniforms['mieCoefficient'].value = 0.1;
sky.material.uniforms['mieDirectionalG'].value = 0.95;
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95);

// Animate
const timer = new Timer();

const tick = () => {
	// Timer
	timer.update();
	const elapsedTime = timer.getElapsed();

	// Ghosts animation
	const ghostOneAngle = elapsedTime * 0.5;
	ghostOne.position.x = Math.cos(ghostOneAngle) * 4;
	ghostOne.position.z = Math.sin(ghostOneAngle) * 4;
	ghostOne.position.y = Math.sin(ghostOneAngle) * Math.sin(ghostOneAngle * 2.34) * Math.sin(ghostOneAngle * 3.45);

	const ghostTwoAngle = -elapsedTime * 0.38;
	ghostTwo.position.x = Math.cos(ghostTwoAngle) * 5;
	ghostTwo.position.z = Math.sin(ghostTwoAngle) * 5;
	ghostTwo.position.y = Math.sin(ghostTwoAngle) * Math.sin(ghostTwoAngle * 2.34) * Math.sin(ghostTwoAngle * 3.45);

	const ghostThreeAngle = elapsedTime * 0.3;
	ghostThree.position.x = Math.cos(ghostThreeAngle) * 6;
	ghostThree.position.z = Math.sin(ghostThreeAngle) * 6;
	ghostThree.position.y =
		Math.sin(ghostThreeAngle) * Math.sin(ghostThreeAngle * 2.34) * Math.sin(ghostThreeAngle * 3.45);

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
