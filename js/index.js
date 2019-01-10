//Global variables
var renderer, scene, camera, composer, octoMain, skeleton; //main vairbales for construct.
var geometry, material, mesh; // variables for object
var bar01, bar02;
var databaseObject;
var gui; // this is to set up my dat gui.
var setValue;


var model0, model1, model2, model3, model4, model5, model6;

var data = document.getElementById('data');




// Execute the main functions when the page loads
window.onload = function() {
  window.addEventListener('resize', onWindowResize, false);


  init();
  //to run characters
  character1();
  character2();
  character3();
  character4();
  character5();
  character6();
  character7();
  //run scene
  animate();
  //vaue for dat gui.
  setValue();


}



function init(){
  //Configure renderer settings-------------------------------------------------

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio :2);
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClear = false;
  renderer.setClearColor(0xD8D8D8, 1.0); //Desired background colour
  document.getElementById('canvas').appendChild(renderer.domElement);
  //----------------------------------------------------------------------------



  // Create an empty scene
  scene = new THREE.Scene();
  currentScene = 0;

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 2, 2000 );
  camera.position.z = 100;
  camera.position.y = 40;
  scene.add(camera);

  // Create the lights
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
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

  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  scene.add( listener );

  // create a global audio source
  var sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'sounds/flute.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.5 );
    sound.play();
  });



  // this isthe set up for my dat gui.
  var sampleMaterial = function() {
    this.octoMain = "character";
  };


    material = new sampleMaterial();

    var gui = new dat.GUI();
    gui.add(material, 'octoMain',["shame", "fear", "desire", "neutrality", "acceptance", "love", "enlightenment"]).onChange(setValue);


  function setValue() {
    console.log(material);
    //data.octoMain.mtlLoader = material.mtlLoader;

    data.object.setPrototypeOf = object.material;

}

  window.addEventListener('resize', onWindowResize, false);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
};




  function character1(){
  //Create the geometric objects
  octoMain = new THREE.Object3D();

  scene.add(octoMain);

  var mtlLoader = new THREE.MTLLoader()
  mtlLoader.load(
    'Assets/character-1.mtl',

    function (material) {
      var objLoader = new THREE.OBJLoader()
      objLoader.setMaterials(material)
      objLoader.load(
        'Assets/character-1.obj',
        function (object) {
        octoMain.add(object);
        }
      )
    }
  )



  var geometryOcto = new THREE.IcosahedronGeometry(1, 2);

  // Create the materials
  var octoMaterial = new THREE.MeshPhongMaterial({
    color: 0xF51C19,
    shading: THREE.FlatShading,
    wireframe: true
  });

  //Add materials to the mesh - octoMesh, skeletonMesh
  var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
  octoMesh.scale.x = 10;
  octoMesh.scale.y = 10;
   octoMesh.scale.z = 10;
   octoMesh.position.x = 0;
   octoMesh.position.y = 35;
   octoMesh.position.z = 0;

  octoMain.add(octoMesh);
}


function character2(){
//Create the geometric objects
octoMain = new THREE.Object3D();

scene.add(octoMain);

var mtlLoader = new THREE.MTLLoader()
mtlLoader.load(
  'Assets/character-2.mtl',

  function (material) {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(material)
    objLoader.load(
      'Assets/character-1.obj',
      function (object) {
        octoMain.add(object);
      }
    )
  }
)


var geometryOcto = new THREE.IcosahedronGeometry(2, 2);

// Create the materials
var octoMaterial = new THREE.MeshPhongMaterial({
  color: 0xFFB200,
  shading: THREE.FlatShading,
  wireframe: true
});

//Add materials to the mesh - octoMesh, skeletonMesh
var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
octoMesh.scale.x = 10;
octoMesh.scale.y = 10;
 octoMesh.scale.z = 10;
 octoMesh.position.x = 0;
 octoMesh.position.y = 35;
 octoMesh.position.z = 0;

octoMain.add(octoMesh);
}

function character3(){
//Create the geometric objects
octoMain = new THREE.Object3D();

scene.add(octoMain);

var mtlLoader = new THREE.MTLLoader()
mtlLoader.load(
  'Assets/character-3.mtl',

  function (material) {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(material)
    objLoader.load(
      'Assets/character-1.obj',
      function (object) {
        octoMain.add(object);
      }
    )
  }
)


var geometryOcto = new THREE.IcosahedronGeometry(3, 2);

// Create the materials
var octoMaterial = new THREE.MeshPhongMaterial({
  color: 0xFFF700,
  shading: THREE.FlatShading,
  wireframe: true
});

//Add materials to the mesh - octoMesh, skeletonMesh
var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
octoMesh.scale.x = 10;
octoMesh.scale.y = 10;
 octoMesh.scale.z = 10;
 octoMesh.position.x = 0;
 octoMesh.position.y = 35;
 octoMesh.position.z = 0;

octoMain.add(octoMesh);
}



function character4(){
//Create the geometric objects
octoMain = new THREE.Object3D();

scene.add(octoMain);

var mtlLoader = new THREE.MTLLoader()
mtlLoader.load(
  'Assets/character-4.mtl',

  function (material) {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(material)
    objLoader.load(
      'Assets/character-1.obj',
      function (object) {
        octoMain.add(object);
      }
    )
  }
)


var geometryOcto = new THREE.IcosahedronGeometry(4, 2);

// Create the materials
var octoMaterial = new THREE.MeshPhongMaterial({
  color: 0xAAFF00,
  shading: THREE.FlatShading,
  wireframe: true
});

//Add materials to the mesh - octoMesh, skeletonMesh
var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
octoMesh.scale.x = 10;
octoMesh.scale.y = 10;
 octoMesh.scale.z = 10;
 octoMesh.position.x = 0;
 octoMesh.position.y = 35;
 octoMesh.position.z = 0;

octoMain.add(octoMesh);
}


function character5(){
//Create the geometric objects
octoMain = new THREE.Object3D();

scene.add(octoMain);

var mtlLoader = new THREE.MTLLoader()
mtlLoader.load(
  'Assets/character-5.mtl',

  function (material) {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(material)
    objLoader.load(
      'Assets/character-1.obj',
      function (object) {
        octoMain.add(object);
      }
    )
  }
)


var geometryOcto = new THREE.IcosahedronGeometry(5, 2);

// Create the materials
var octoMaterial = new THREE.MeshPhongMaterial({
  color: 0x00E0FF,
  shading: THREE.FlatShading,
  wireframe: true
});

//Add materials to the mesh - octoMesh, skeletonMesh
var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
octoMesh.scale.x = 10;
octoMesh.scale.y = 10;
 octoMesh.scale.z = 10;
 octoMesh.position.x = 0;
 octoMesh.position.y = 35;
 octoMesh.position.z = 0;

octoMain.add(octoMesh);
}


function character6(){
//Create the geometric objects
octoMain = new THREE.Object3D();

scene.add(octoMain);

var mtlLoader = new THREE.MTLLoader()
mtlLoader.load(
  'Assets/character-6.mtl',

  function (material) {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(material)
    objLoader.load(
      'Assets/character-1.obj',
      function (object) {
        octoMain.add(object);
      }
    )
  }
)


var geometryOcto = new THREE.IcosahedronGeometry(6, 2);

// Create the materials
var octoMaterial = new THREE.MeshPhongMaterial({
  color: 0x005DFF,
  shading: THREE.FlatShading,
  wireframe: true
});

//Add materials to the mesh - octoMesh, skeletonMesh
var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
octoMesh.scale.x = 10;
octoMesh.scale.y = 10;
 octoMesh.scale.z = 10;
 octoMesh.position.x = 0;
 octoMesh.position.y = 35;
 octoMesh.position.z = 0;

octoMain.add(octoMesh);
}


function character7(){
//Create the geometric objects
octoMain = new THREE.Object3D();

scene.add(octoMain);

var mtlLoader = new THREE.MTLLoader()
mtlLoader.load(
  'Assets/character-7.mtl',

  function (material) {
    var objLoader = new THREE.OBJLoader()
    objLoader.setMaterials(material)
    objLoader.load(
      'Assets/character-1.obj',
      function (object) {
        octoMain.add(object);
      }
    )
  }
)


var geometryOcto = new THREE.IcosahedronGeometry(7, 2);

// Create the materials
var octoMaterial = new THREE.MeshPhongMaterial({
  color: 0xAA00FF,
  shading: THREE.FlatShading,
  wireframe: true
});

//Add materials to the mesh - octoMesh, skeletonMesh
var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
octoMesh.scale.x = 10;
octoMesh.scale.y = 10;
 octoMesh.scale.z = 10;
 octoMesh.position.x = 0;
 octoMesh.position.y = 35;
 octoMesh.position.z = 0;

octoMain.add(octoMesh);

console.log(octoMain);

}






// Render Loop
function animate(){
  requestAnimationFrame(animate);

  octoMain.rotation.y -= 0.0040;


  // Render the scene
  renderer.clear();
  renderer.render(scene, camera);
};
