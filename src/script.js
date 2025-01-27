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

// Window textures
const windowColorTexture = textureLoader.load('./window/Wood_Window_001/Wood_Window_001_basecolor.webp');
windowColorTexture.colorSpace = THREE.SRGBColorSpace;
const windowAmbientOcclustionTexture = textureLoader.load(
	'./window/Wood_Window_001/Wood_Window_001_ambientOcclusion.webp'
);
const windowHeightTexture = textureLoader.load('./window/Wood_Window_001/Wood_Window_001_height.png');
const windowNormalTexture = textureLoader.load('./window/Wood_Window_001/Wood_Window_001_normal.webp');
const windowRoughnessTexture = textureLoader.load('./window/Wood_Window_001/Wood_Window_001_roughness.webp');
const windowMetalnessTexture = textureLoader.load('./window/Wood_Window_001/Wood_Window_001_metallic.webp');

// Plank textures
const plankColorTexture = textureLoader.load('./plank/worn_planks_diff_1k.webp');
plankColorTexture.colorSpace = THREE.SRGBColorSpace;
const plankARMTexture = textureLoader.load('./plank/worn_planks_arm_1k.webp');
const plankNormalTexture = textureLoader.load('./plank/worn_planks_nor_gl_1k.webp');

// Floor
const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(25, 25, 100, 100),
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

// Tower
const tower = new THREE.Group();
tower.position.z = -7;
tower.position.x = -4;
scene.add(tower);

const towerWalls = new THREE.Mesh(
	new THREE.BoxGeometry(3, 6, 3),
	new THREE.MeshStandardMaterial({
		map: wallsColorTexture,
		aoMap: wallsARMTexture,
		roughnessMap: wallsARMTexture,
		metalnessMap: wallsARMTexture,
		normalMap: wallsNormalTexture,
	})
);
towerWalls.position.y = 6 / 2;
tower.add(towerWalls);

// Tower roof
const towerRoof = new THREE.Mesh(
	new THREE.ConeGeometry(2.5, 1.3, 4),
	new THREE.MeshStandardMaterial({
		map: roofColorTexture,
		aoMap: roofARMTexture,
		roughnessMap: roofARMTexture,
		metalnessMap: roofARMTexture,
		normalMap: roofNormalTexture,
	})
);
towerRoof.position.y = 6 + (1.3 * 3) / 2;
towerRoof.rotation.y = Math.PI * 0.25;
tower.add(towerRoof);

// Tower plank
const towerPlankGeometry = new THREE.BoxGeometry(0.15, 1.3, 0.15);
const towerPlankMaterial = new THREE.MeshStandardMaterial({
	map: plankColorTexture,
	aoMap: plankARMTexture,
	roughnessMap: plankARMTexture,
	metalnessMap: plankARMTexture,
	normalMap: plankNormalTexture,
});

// Tower stairs
const towerStairs = new THREE.Group();
towerStairs.position.z = -5.5;
towerStairs.position.x = -4;
scene.add(towerStairs);

const stairsGeometry = new THREE.BoxGeometry(1.6, 0.2, 2.4);
const stairsMaterial = new THREE.MeshStandardMaterial({
	map: graveColorTexture,
	aoMap: graveARMTexture,
	roughnessMap: graveARMTexture,
	metalnessMap: graveARMTexture,
	normalMap: graveNormalTexture,
});
const stepOne = new THREE.Mesh(stairsGeometry, stairsMaterial);

const stepTwo = new THREE.Mesh(stairsGeometry, stairsMaterial);
stepTwo.position.y = 0.2;
stepTwo.scale.z = 2 / 3;

const stepThree = new THREE.Mesh(stairsGeometry, stairsMaterial);
stepThree.position.y = 0.4;
stepThree.scale.z = 1 / 3;
towerStairs.add(stepOne, stepTwo, stepThree);

// Tower door
const towerDoor = new THREE.Mesh(
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
		roughnessMap: doorRoughnessTexture,
	})
);
towerDoor.position.z = 1.5 + 0.0001;
towerDoor.position.y = 2.2 / 2 + 0.4;
tower.add(towerDoor);

// Tower window
const towerWindowGeometry = new THREE.PlaneGeometry(0.5, 0.5, 10, 10);
const towerWindowMaterial = new THREE.MeshStandardMaterial({
	map: windowColorTexture,
	aoMap: windowAmbientOcclustionTexture,
	displacementMap: windowHeightTexture,
	displacementScale: 0.02,
	displacementBias: 0.04,
	normalMap: windowNormalTexture,
	roughnessMap: windowRoughnessTexture,
	metalnessMap: windowMetalnessTexture,
});

// Window one
const towerWindowOne = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowOne.position.y = 2.2 + 1.3;
towerWindowOne.position.z = 1.5 + 0.0001;

// Window two
const towerWindowTwo = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowTwo.position.y = 2.2 + 2.6;
towerWindowTwo.position.z = 1.5 + 0.0001;

// Window three
const towerWindowThree = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowThree.rotation.y = Math.PI * 0.5;
towerWindowThree.position.x = 1.5 + 0.0001;
towerWindowThree.position.y = 2.2;

// Window four
const towerWindowFour = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowFour.rotation.y = Math.PI * 0.5;
towerWindowFour.position.x = 1.5 + 0.0001;
towerWindowFour.position.y = 2.2 + 1.3;

// Window five
const towerWindowFive = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowFive.rotation.y = Math.PI * 0.5;
towerWindowFive.position.x = 1.5 + 0.0001;
towerWindowFive.position.y = 2.2 + 2.6;

// Window six
const towerWindowSix = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowSix.rotation.y = Math.PI * -0.5;
towerWindowSix.position.x = -1.5 - 0.0001;
towerWindowSix.position.y = 2.2;

// Window seven
const towerWindowSeven = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowSeven.rotation.y = Math.PI * -0.5;
towerWindowSeven.position.x = -1.5 - 0.0001;
towerWindowSeven.position.y = 2.2 + 1.3;

// Window eight
const towerWindowEight = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowEight.rotation.y = Math.PI * -0.5;
towerWindowEight.position.x = -1.5 - 0.0001;
towerWindowEight.position.y = 2.2 + 2.6;

// Window Nine
const towerWindowNine = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowNine.rotation.y = Math.PI;
towerWindowNine.position.z = -1.5 - 0.0001;
towerWindowNine.position.y = 2.2;

// Window Ten
const towerWindowTen = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowTen.rotation.y = Math.PI;
towerWindowTen.position.z = -1.5 - 0.0001;
towerWindowTen.position.y = 2.2 + 1.3;

// Window Eleven
const towerWindowEleven = new THREE.Mesh(towerWindowGeometry, towerWindowMaterial);
towerWindowEleven.rotation.y = Math.PI;
towerWindowEleven.position.z = -1.5 - 0.0001;
towerWindowEleven.position.y = 2.2 + 2.6;

tower.add(
	towerWindowOne,
	towerWindowTwo,
	towerWindowThree,
	towerWindowFour,
	towerWindowFive,
	towerWindowSix,
	towerWindowSeven,
	towerWindowEight,
	towerWindowNine,
	towerWindowTen,
	towerWindowEleven
);

// Function to create a tree with variations
function createTree(x, y, z, pineHeight, pineRadius, stumpHeight, stumpRadius) {
	const pineGeometry = new THREE.ConeGeometry(pineRadius, pineHeight, 24);
	const pineMaterial = new THREE.MeshStandardMaterial({
		map: bushColorTexture,
		aoMap: bushARMTexture,
		roughnessMap: bushARMTexture,
		metalnessMap: bushARMTexture,
		normalMap: bushNormalTexture,
	});

	const pine = new THREE.Mesh(pineGeometry, pineMaterial);
	pine.castShadow = true;
	pine.receiveShadow = true;

	const stumpGeometry = new THREE.CylinderGeometry(stumpRadius, stumpRadius, stumpHeight, 32);
	const stumpMaterial = new THREE.MeshStandardMaterial({
		map: plankColorTexture,
		aoMap: plankARMTexture,
		roughnessMap: plankARMTexture,
		metalnessMap: plankARMTexture,
		normalMap: plankNormalTexture,
	});

	const stump = new THREE.Mesh(stumpGeometry, stumpMaterial);
	stump.position.y = -stumpHeight / 2;
	stump.castShadow = true;
	stump.receiveShadow = true;

	const tree = new THREE.Group();
	tree.position.set(x, y, z);
	tree.add(pine, stump);

	return tree;
}

// Creating five different trees with slight variations
const treeOne = createTree(-6.8, 2.5, -6.5, 3, 0.8, 3, 0.1);
const treeTwo = createTree(0.75, 2.5, -4.75, 3.2, 0.9, 3, 0.12);
const treeThree = createTree(-12, 2.5, -5, 2.8, 0.7, 3, 0.1);
const treeFour = createTree(-9, 2.5, -5, 3.5, 1, 3, 0.15);
const treeFive = createTree(8, 2.5, -5, 3.1, 0.85, 3, 0.12);
const treeSix = createTree(6, 2.5, 1, 3.1, 0.85, 3, 0.12);
const treeSeven = createTree(5, 2.5, -9, 3.1, 0.85, 3, 0.12);

// Add all trees to the scene
scene.add(treeOne, treeTwo, treeThree, treeFour, treeFive, treeSix, treeSeven);

// Plank one
const towerPlankOne = new THREE.Mesh(towerPlankGeometry, towerPlankMaterial);
towerPlankOne.position.y = 6 + 1.3 / 2;
towerPlankOne.position.x = 1.5 - 0.15 / 2;
towerPlankOne.position.z = 1.5 - 0.15 / 2;
tower.add(towerPlankOne);

// Tower lamp
const towerLamp = new THREE.PointLight('#ff7d46', 6);
tower.add(towerLamp);
towerLamp.position.z = 1.8;
towerLamp.position.y = 2.2 + 0.45;

// Plank two
const towerPlankTwo = new THREE.Mesh(towerPlankGeometry, towerPlankMaterial);
towerPlankTwo.position.y = 6 + 1.3 / 2;
towerPlankTwo.position.x = -1.5 + 0.15 / 2;
towerPlankTwo.position.z = 1.5 - 0.15 / 2;
tower.add(towerPlankTwo);

// Plank three
const towerPlankThree = new THREE.Mesh(towerPlankGeometry, towerPlankMaterial);
towerPlankThree.position.y = 6 + 1.3 / 2;
towerPlankThree.position.x = 1.5 - 0.15 / 2;
towerPlankThree.position.z = -1.5 + 0.15 / 2;
tower.add(towerPlankThree);

// Plank four
const towerPlankFour = new THREE.Mesh(towerPlankGeometry, towerPlankMaterial);
towerPlankFour.position.y = 6 + 1.3 / 2;
towerPlankFour.position.x = -1.5 + 0.15 / 2;
towerPlankFour.position.z = -1.5 + 0.15 / 2;
tower.add(towerPlankFour);

// Znicz
const points = [];
for (let i = 0; i < 10; i++) {
	points.push(new THREE.Vector2(Math.sin(i * 0.2) * 0.5 + 0.5, (i - 5) * 0.1));
}
const geometry = new THREE.LatheGeometry(points);
const material = new THREE.MeshStandardMaterial({
	side: THREE.DoubleSide,
	map: graveColorTexture,
	aoMap: graveARMTexture,
	roughnessMap: graveARMTexture,
	metalnessMap: graveARMTexture,
	normalMap: graveNormalTexture,
});
const lathe = new THREE.Mesh(geometry, material);
lathe.position.y = 6;
tower.add(lathe);

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
		roughnessMap: doorRoughnessTexture,
	})
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Window
const windowElementGeometry = new THREE.PlaneGeometry(1.2, 1.2, 10, 10);
const windowElementMaterial = new THREE.MeshStandardMaterial({
	map: windowColorTexture,
	aoMap: windowAmbientOcclustionTexture,
	displacementMap: windowHeightTexture,
	displacementScale: 0.02,
	displacementBias: 0.04,
	normalMap: windowNormalTexture,
	roughnessMap: windowRoughnessTexture,
	metalnessMap: windowMetalnessTexture,
});

// Window one
const windowElementOne = new THREE.Mesh(windowElementGeometry, windowElementMaterial);
windowElementOne.rotation.y = Math.PI * 0.5;
windowElementOne.position.x = 2 + 0.0001;
windowElementOne.position.y = 2.5 / 2;

// Window two
const windowElementTwo = new THREE.Mesh(windowElementGeometry, windowElementMaterial);
windowElementTwo.rotation.y = Math.PI * -0.5;
windowElementTwo.position.x = -2 - 0.0001;
windowElementTwo.position.y = 2.5 / 2;

// Window three
const windowElementThree = new THREE.Mesh(windowElementGeometry, windowElementMaterial);
windowElementThree.rotation.y = Math.PI;
windowElementThree.position.z = -2 - 0.0001;
windowElementThree.position.y = 2.5 / 2;
windowElementThree.scale.x = 2;

house.add(windowElementOne, windowElementTwo, windowElementThree);

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
const doorLight = new THREE.PointLight('#ff7d46', 6);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

const zniczLight = new THREE.PointLight('#ff7d46', 30);
zniczLight.position.y = 6.6;
tower.add(zniczLight);

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
camera.position.set(-5.5, 1.5, 10);
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
zniczLight.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;
towerWalls.castShadow = true;
towerWalls.receiveShadow = true;
lathe.receiveShadow = true;
lathe.castShadow = true;

// Mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

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

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
