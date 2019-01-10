


if ( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
  }

  var scenes = [], views, t, canvas, octoMain, renderer;

  //Execute the main functions when the page loads
  window.onload = function() {
    init();
    animate();
    character();
  }

  function init() {
    var balls = 20;
    var size = .50;
    var colors = [
      'rgb(0,127,255)', 'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,255,255)',
      'rgb(255,0,255)', 'rgb(255,0,127)', 'rgb(255,255,0)', 'rgb(0,255,127)'
    ];


    canvas = document.getElementById( 'c' );
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    views = document.querySelectorAll( '.view' );
    for ( var n = 0; n < views.length; n ++ ) {
      var scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );
      var geometry0 = new THREE.BufferGeometry();
      var geometry1 = new THREE.BufferGeometry();
      var vertices = [];
      if ( views[ n ].lattice ) {
        var range = balls / 2;
        for ( var i = - range; i <= range; i ++ ) {
          for ( var j = - range; j <= range; j ++ ) {
            for ( var k = - range; k <= range; k ++ ) {
              vertices.push( i, j, k );
            }
          }
        }
      } else {
        for ( var m = 0; m < Math.pow( balls, 3 ); m ++ ) {
          var i = balls * Math.random() - balls / 2;
          var j = balls * Math.random() - balls / 2;
          var k = balls * Math.random() - balls / 2;
          vertices.push( i, j, k );
        }
      }

      geometry0.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 4 ) );
      geometry1.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices.slice(), 2) );
      var index = Math.floor( colors.length * Math.random() );
      var canvas2 = document.createElement( 'canvas' );
      canvas2.width = 200;
      canvas2.height = 200;
      var context = canvas2.getContext( '2d' );
      context.arc( 60, 64, 64, 2, 4 * Math.PI );
      context.fillStyle = colors[ index ];
      context.fill();
      var texture = new THREE.CanvasTexture( canvas2 );
      var material = new THREE.PointsMaterial( { size: size, map: texture, transparent: true, alphaTest: 0.2 } );
      scene.add( new THREE.Points( geometry0, material ) );
      scene.userData.view = views[ n ];
      scene.userData.geometry1 = geometry1;
      var camera = new THREE.PerspectiveCamera( 60, 1, 0.4, 60 );
      camera.position.set( 4, 0, 1.2 * balls );
      scene.userData.camera = camera;
      var controls = new THREE.OrbitControls( camera, views[ n ] );
      scene.userData.controls = controls;

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


      function character(){
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
                scene.add(object);
              }
            )
          }
        )
      }

      scenes.push( scene );
    }
    t = 0;
    animate();
  }

  function updateSize() {
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if ( canvas.width !== width || canvas.height != height ) {
      renderer.setSize( width, height, false );
    }
  }


  function animate() {
    render();
    requestAnimationFrame( animate );

  }

  function render() {
    updateSize();
    renderer.setClearColor( 0xffffff );
    renderer.setScissorTest( false );
    renderer.clear();
    renderer.setClearColor( 0x000000 );
    renderer.setScissorTest( true );
    scenes.forEach( function ( scene ) {
      var rect = scene.userData.view.getBoundingClientRect();
      // // check if it's offscreen. If so skip it
      // if ( rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
      //    rect.right < 0 || rect.left > renderer.domElement.clientWidth ) {
      //   return; // it's off screen
      // }
      //set the viewport
      var width = rect.right - rect.left;
      var height = rect.bottom - rect.top;
      var left = rect.left;
      var top = rect.top;


      renderer.setViewport( left, top, width, height );
      renderer.setScissor( left, top, width, height );
      renderer.render( scene, scene.userData.camera );
      var points = scene.children[ 0 ];
      var position = points.geometry.attributes.position;
      var point = new THREE.Vector3();
      var offset = new THREE.Vector3();
      for ( var i = 0; i < position.count; i ++ ) {
        point.fromBufferAttribute( scene.userData.geometry1.attributes.position, i );
        scene.userData.view.displacement( point.x, point.y, point.z, t / 5, offset );
        position.setXYZ( i, point.x + offset.x, point.y + offset.y, point.z + offset.z );
      }
      position.needsUpdate = true;
    } );
    t ++;
  }
