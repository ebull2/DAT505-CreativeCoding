

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
  renderer.setClearColor(0x404040, 0.2);
  document.getElementById('canvas').appendChild(renderer.domElement);
  //----------------------------------------------------------------------------

  // Create an empty scene
  scene = new THREE.Scene();

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
  camera.position.z = 150;
  scene.add(camera);

  // Create the lights
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight( 0xffffff, 0.2);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight( 0x8200C9, 1.5);
  lights[2].position.set(-0.40, -1, 0.2);
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

function geometry(){
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
        'Assets/character-7.obj',
        function (object) {
          octoMain.add(object);
        }
      )
    }
  )

  // var geometryOcto = new THREE.IcosahedronGeometry(4, 4);
  //
  // // Create the materials
  // var octoMaterial = new THREE.MeshPhongMaterial({
  //   color: 0xffffff, wireframe: true,
  //
  // });
  //
  // //Add materials to the mesh - octoMesh, skeletonMesh
  // var octoMesh = new THREE.Mesh(geometryOcto, octoMaterial);
  // octoMesh.scale.x = octoMesh.scale.y = octoMesh.scale.z = 10;
  // octoMain.add(octoMesh);
}

// Render Loop
function animate(){
  requestAnimationFrame(animate);


  octoMain.rotation.y -= 0.0030;

  // Render the scene
  renderer.clear();
  renderer.render(scene, camera);
}
//
//
//
// if ( WEBGL.isWebGLAvailable() === false ) {
//       document.body.appendChild( WEBGL.getWebGLErrorMessage() );
//     }
//     var scenes = [], views, t, canvas, renderer;
//     window.onload = init;
//     function init() {
//       var balls = 20;
//       var size = .25;
//       var colors = [
//         'rgb(0,127,255)', 'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,255,255)',
//         'rgb(255,0,255)', 'rgb(255,0,127)', 'rgb(255,255,0)', 'rgb(0,255,127)'
//       ];
//       canvas = document.getElementById( 'c' );
//       renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
//       renderer.setPixelRatio( window.devicePixelRatio );
//       views = document.querySelectorAll( '.view' );
//       for ( var n = 0; n < views.length; n ++ ) {
//         var scene = new THREE.Scene();
//         scene.background = new THREE.Color( 0xffffff );
//         var geometry0 = new THREE.BufferGeometry();
//         var geometry1 = new THREE.BufferGeometry();
//         var vertices = [];
//         if ( views[ n ].lattice ) {
//           var range = balls / 2;
//           for ( var i = - range; i <= range; i ++ ) {
//             for ( var j = - range; j <= range; j ++ ) {
//               for ( var k = - range; k <= range; k ++ ) {
//                 vertices.push( i, j, k );
//               }
//             }
//           }
//         } else {
//           for ( var m = 0; m < Math.pow( balls, 3 ); m ++ ) {
//             var i = balls * Math.random() - balls / 2;
//             var j = balls * Math.random() - balls / 2;
//             var k = balls * Math.random() - balls / 2;
//             vertices.push( i, j, k );
//           }
//         }
//         geometry0.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
//         geometry1.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices.slice(), 3 ) );
//         var index = Math.floor( colors.length * Math.random() );
//         var canvas2 = document.createElement( 'canvas' );
//         canvas2.width = 128;
//         canvas2.height = 128;
//         var context = canvas2.getContext( '2d' );
//         context.arc( 64, 64, 64, 0, 2 * Math.PI );
//         context.fillStyle = colors[ index ];
//         context.fill();
//         var texture = new THREE.CanvasTexture( canvas2 );
//         var material = new THREE.PointsMaterial( { size: size, map: texture, transparent: true, alphaTest: 0.1 } );
//         scene.add( new THREE.Points( geometry0, material ) );
//         scene.userData.view = views[ n ];
//         scene.userData.geometry1 = geometry1;
//         var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 100 );
//         camera.position.set( 0, 0, 1.2 * balls );
//         scene.userData.camera = camera;
//         var controls = new THREE.OrbitControls( camera, views[ n ] );
//         scene.userData.controls = controls;
//         scenes.push( scene );
//       }
//       t = 0;
//       animate();
//     }
//     function updateSize() {
//       var width = canvas.clientWidth;
//       var height = canvas.clientHeight;
//       if ( canvas.width !== width || canvas.height != height ) {
//         renderer.setSize( width, height, false );
//       }
//     }
//     function animate() {
//       render();
//       requestAnimationFrame( animate );
//     }
//     function render() {
//       updateSize();
//       //renderer.setClearColor( 0xffffff );
//       renderer.setScissorTest( false );
//       renderer.clear();
//       //renderer.setClearColor( 0x000000 );
//       renderer.setScissorTest( true );
//       scenes.forEach( function ( scene ) {
//         var rect = scene.userData.view.getBoundingClientRect();
//         // check if it's offscreen. If so skip it
//         if ( rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
//            rect.right < 0 || rect.left > renderer.domElement.clientWidth ) {
//           return; // it's off screen
//         }
//         //set the viewport
//         var width = rect.right - rect.left;
//         var height = rect.bottom - rect.top;
//         var left = rect.left;
//         var top = rect.top;
//
//
//         renderer.setViewport( left, top, width, height );
//         renderer.setScissor( left, top, width, height );
//         renderer.render( scene, scene.userData.camera );
//         var points = scene.children[ 0 ];
//         var position = points.geometry.attributes.position;
//         var point = new THREE.Vector3();
//         var offset = new THREE.Vector3();
//         for ( var i = 0; i < position.count; i ++ ) {
//           point.fromBufferAttribute( scene.userData.geometry1.attributes.position, i );
//           scene.userData.view.displacement( point.x, point.y, point.z, t / 5, offset );
//           position.setXYZ( i, point.x + offset.x, point.y + offset.y, point.z + offset.z );
//         }
//         position.needsUpdate = true;
//       } );
//       t ++;
//     }
