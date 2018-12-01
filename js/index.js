//Global variables
var renderer, scene, camera, composer, octoMain, skeleton, particle;
var bar01, bar02;

//Execute the main functions when the page loads
window.onload = function() {
  init();
  geometry();
  animate();
}

function init(){
  //Configure renderer settings-------------------------------------------------
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClear = false;
  renderer.setClearColor(0x404040, 0.60);
  document.getElementById('canvas').appendChild(renderer.domElement);
  //----------------------------------------------------------------------------

  // Create an empty scene
  scene = new THREE.Scene();

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
  camera.position.z = 200;
  scene.add(camera);

  // Create the lights
  var ambientLight = new THREE.AmbientLight(0x999999, 0.5);
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight( 0xffffff, 0.5);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight( 0x11E8BB, 0.5);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight( 0x8200C9, 0.5);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add( lights[1] );
  scene.add( lights[2] );

  window.addEventListener('resize', onWindowResize, false);
}

//Keep everything appearing properly on screen when window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //maintain aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight);
}


//  import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'
// //
// let scene = new THREE.Scene()
// //
//  let mtlLoader = new MTLLoader();
// //
// let objLoader = new OBJLoader();
// //
//  mtlLoader.load('./test.mtl', (materials) => {
//   materials.preload()
//   objLoader.setMaterials(materials)
//    objLoader.load('./test.obj', (object) => {
//     scene.add(object)
//  })


function geometry(){
  //Create the geometric objects
  octoMain = new THREE.Object3D();

  scene.add(octoMain);

  var mtlLoader = new THREE.MTLLoader()
  mtlLoader.load(
    'Assets/redcharacter.mtl',
    function (material) {
      var objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(material)
      objLoader.load(
        'Assets/redcharacter.obj',
        function (object) {
          octoMain.add(object);


        }
      )
    }
  )

  // var geometryOcto = new THREE.IcosahedronGeometry(7, 1);
  //
  //Create the materials
  // var octoMaterial = new THREE.MeshPhongMaterial({
  //   color: 0xffffff,
  //   shading: THREE.FlatShading
  // });
  //
  // //Add materials to the mesh - octoMesh, skeletonMesh
  // var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
  // octoMesh.scale.x = octoMesh.scale.y = octoMesh.scale.z = 16;
  // octoMain.add(octoMesh);
}



// Render Loop
function animate(){
  requestAnimationFrame(animate);


  octoMain.rotation.y -= 0.020;

  // Render the scene
  renderer.clear();
  renderer.render(scene, camera);
}
