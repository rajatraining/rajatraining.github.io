// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/MTLLoader.js";

//SCENE
const scene = new THREE.Scene();

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
  alpha: true
});
//renderer.setClearColor(0x343440);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 150;

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//LIGHTS
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 40, 25);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 70;
scene.add(spotLight);
const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(0, -40, -25);
spotLight2.castShadow = true;
spotLight2.shadow.mapSize.width = 1024;
spotLight2.shadow.mapSize.height = 1024;
spotLight2.shadow.camera.near = 500;
spotLight2.shadow.camera.far = 4000;
spotLight2.shadow.camera.fov = 70;
scene.add(spotLight2);

// OBJECT
const loader = new OBJLoader();
const mtlLoader = new MTLLoader();
let card;
mtlLoader.load("./card.mtl", (materials) => {
  materials.preload();
  loader.setMaterials(materials);
  loader.load("./card.obj", (object) => {
    card = object;
    card.rotateX(Math.PI / 2);
    card.scale.set(13, 13, 13);
    card.children[0].material = new THREE.MeshPhongMaterial({
      color: 0x343440,
    });
    scene.add(card);
  });
});

// LOAD MANAGER
// Load Manager
const manager = new THREE.LoadingManager();
manager.onStart = (url, itemsLoaded, itemsTotal) => {
  document.getElementById("loader").style.display = "flex";
};

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  document.getElementById(
    "progressLoading"
  ).innerText = `Loading Files ... ${itemsLoaded}/${itemsTotal}`;
};

manager.onLoad = () => {
  document.getElementById("loader").style.display = "none";
};

manager.onError = function (url) {
  alert("There was an error loading " + url);
};

function selectCardColor(e) {
  card.children[0].material = new THREE.MeshPhongMaterial({
    color: e.target.value,
  });
  document.getElementById("colorPicker").value = e.target.value;
}

function selectTextColor(e) {
  current.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  prevNum.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  prevExp.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  prevCvv.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  document.getElementById("textColorPicker").value = e.target.value;
}

function setRotation() {
  controls.autoRotate = !controls.autoRotate;
}

function toggleModal() {
  let cardInfoContainerRef =
    document.getElementsByClassName("cardInfoContainer")[0];
  let openModalBtnRef = document.getElementsByClassName("openModalBtn")[0];
  if (openModalBtnRef.style.display === "none") {
    cardInfoContainerRef.style.display = "none";
    openModalBtnRef.style.display = "flex";
  } else {
    cardInfoContainerRef.style.display = "flex";
    openModalBtnRef.style.display = "none";
  }
}
const floader = new THREE.FontLoader();
const imgLoader = new THREE.ImageLoader();

function setInitColor()
{
  document
  .getElementById("colorPicker").value= 0x0a0f08;

  const e = new Event("change");
  const element = document.getElementById("colorPicker");
  element.dispatchEvent(e);
}
setInitColor();




let current;
function createName(name = "CARDHOLDER NAME") {
  if (current) {
    scene.remove(current);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(name, {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(-30, -15, 1);
    current = mesh;
    scene.add(current);
  });
}
createName();


let bankName;
function createBankName(name = "") {
  if (bankName) {
    scene.remove(bankName);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(name, {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(10, 15, 1);
    bankName = mesh;
    scene.add(bankName);
  });
}
//createBankName();


let bankLogo;
function createBankLogo(name = "Synchrony") {
  if (bankLogo) {
    scene.remove(bankLogo);
  }

  // Create a texture loader so we can load our image file
var loader = new THREE.TextureLoader();

// Load an image file into a custom material
var material = new THREE.MeshLambertMaterial({
  map: loader.load('bank_logo.png')
});

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var geometry = new THREE.PlaneGeometry(30, 10);

// combine our image geometry and material into a mesh
var mesh = new THREE.Mesh(geometry, material);

// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(15,14,2);

// add the image to the scene
bankLogo = mesh;


scene.add(bankLogo);
 
}
createBankLogo();


let emvChip;
function createEmvChip(name = "Synchrony") {
  if (emvChip) {
    scene.remove(emvChip);
  }

  // Create a texture loader so we can load our image file
var loader = new THREE.TextureLoader();

// Load an image file into a custom material
var material = new THREE.MeshLambertMaterial({
  map: loader.load('emv.jpeg')
});

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var geometry = new THREE.PlaneGeometry(20, 10);

// combine our image geometry and material into a mesh
var mesh = new THREE.Mesh(geometry, material);

// set the position of the image mesh in the x,y,z dimensions
mesh.position.set(20,0,-2);
mesh.rotateY(Math.PI);
emvChip = mesh;
// add the image to the scene
scene.add(emvChip);
 
}
createEmvChip();





let bankLogoBack;
function createBankLogoBack(date = "Credit Card") {
  if (bankLogoBack) {
    scene.remove(bankLogoBack);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(date, {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(10, 15, -1);
    mesh.rotateY(Math.PI);
    bankLogoBack = mesh;
    scene.add(bankLogoBack);
  });
}
createBankLogoBack();


let prevNum;
function createNumber(number = "XXXX XXXX XXXX XXXX") {
  if (prevNum) {
    scene.remove(prevNum);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(number, {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(-30, -5, 1);
    prevNum = mesh;
    scene.add(prevNum);
  });
}
createNumber();

let prevExp;
function createDate(date = "XX/XX") {
  if (prevExp) {
    scene.remove(prevExp);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(date, {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(15, -15, 1);
    prevExp = mesh;
    scene.add(prevExp);
  });
}createDate();

let prevCvv;
function createCvv(date = "xxx") {
  if (prevCvv) {
    scene.remove(prevCvv);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(date, {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(-15, 0, -1);
    mesh.rotateY(Math.PI);
    prevCvv = mesh;
    scene.add(prevCvv);
  });
}createCvv();

let creditLimit;
function createLimit(date = "$000") {
  if (creditLimit) {
    scene.remove(creditLimit);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(date, {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(-15, -15, -1);
    mesh.rotateY(Math.PI);
    creditLimit = mesh;
    scene.add(creditLimit);
  });
}createLimit();



//RENDER LOOP
requestAnimationFrame(render);
function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

// Event Listeners
document.getElementById("name").addEventListener("change", (e) => {
  // Change Card Name Model
  createName(e.target.value);
});

document.getElementById("number").addEventListener("change", (e) => {
  // Change Card number Model
  //createNumber(e.target.value);
});

document.getElementById("expiration").addEventListener("change", (e) => {
  // Change Card Expiration Model
 // createDate(e.target.value);
});

document.getElementById("cvv").addEventListener("change", (e) => {
  // Change Card Expiration Model
  //createCvv(Math.floor(Math.random() * 1000));
});



document
  .getElementById("colorPicker")
  .addEventListener("change", selectCardColor);

document
  .getElementById("textColorPicker")
  .addEventListener("change", selectTextColor);

document.getElementById("rotateCard").addEventListener("change", setRotation);

document.getElementById("confirm").addEventListener("click", confirmAction );

function confirmAction(){
  alert("Your Application is approved ..! ")
  toggleModal();
  createCvv("232");
  createDate("09/25");
  createNumber("1234 5678 9012 3456");
  createLimit("$5000");
}


document
  .getElementsByClassName("openModalBtn")[0]
  .addEventListener("click", toggleModal);
