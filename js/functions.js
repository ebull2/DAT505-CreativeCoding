

var parent = document.scripts[ document.scripts.length - 1 ].parentNode;
parent.displacement = function ( x, y, z, t, target ) {
  if ( x * x + y * y + z * z < 0.01 ) {
    return target.set( 0, 0, 0 );
  } else {
    var r = Math.sqrt( x * x + y * y + z * z );
    var theta = Math.acos( z / r );
    var phi = Math.atan2( y, x );
    return target.set( 3 * Math.cos( phi ) * Math.sin( theta ) * Math.sin( r - t ) / r, 3 * Math.sin( phi ) * Math.sin( theta ) * Math.sin( r - t ) / r, 3 * Math.cos( theta ) * Math.sin( r - t ) / r );
  }
};
parent.lattice = false;
