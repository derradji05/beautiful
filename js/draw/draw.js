function drawBackground( ctx, topx, topy, bottomx, bottomy, topColor, bottomColor, width, height, top, left ) {
    var grad = ctx.createLinearGradient( topx + left, topy + top, bottomx + left, bottomy + top );
    grad.addColorStop( 0, topColor );
    grad.addColorStop( 1, bottomColor );

    ctx.beginPath()
    ctx.fillStyle = grad;
    ctx.fillRect( left, top, width, height );
}
function drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height ) {
    dataPointsSets.reverse();
    for ( var i = 0; i < dataPointsSets.length; ++i ) {
        var grad = ctx.createLinearGradient( 0, 0, 0, height + top );
        var color = dataPointsSets[ i ].color;
        grad.addColorStop( 0, 'rgb(' + color.join( ',' ) + ')' );
        var light = lightColor( color );
        grad.addColorStop( 1, 'rgb(' + light.join( ',' ) + ')' );

        var dataPoints = dataPointsSets[ i ].data;

        for ( var j = i + 1; j < dataPointsSets.length; ++j ) {
            var lowerDataPoints = dataPointsSets[ j ].data;
            for ( var key in lowerDataPoints ) {
                dataPoints[ key ].y += lowerDataPoints[ key ].y;
            }

        }

        draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, grad );
    }
}

isPoint = false;
function draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, color ) {
    var g = new Graph( minx, maxx, miny, maxy, left, top, width, height );

    ctx.beginPath();

    ctx.moveTo( g.transformX( minx ), g.transformY( miny ) );

    var x = dataPoints[ 0 ].x,
        y = dataPoints[ 0 ].y;

    x = g.transformX( x );
    y = g.transformY( y );

    ctx.lineTo( x, y );
    for ( var key in dataPoints ) {
        var dataPoint = dataPoints[ key ];
        var x = dataPoint.x,
            y = dataPoint.y;

        x = g.transformX( x );
        y = g.transformY( y );
        ctx.lineTo( x, y );
    }
    ctx.lineTo( g.transformX( maxx ), g.transformY( miny ) );
    isPoint = function( x, y ) {
        return ctx.isPointInPath( x, y );
    };
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}
