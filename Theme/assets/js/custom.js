$(function() {
    //Show bgen
    var showBgen = function($canvas) {
        var value = $canvas.attr('data-bgen-value');
        value = value ? parseInt(value) : 250;
        var color = $canvas.attr('data-bgen-color') || '#ff4488';
        var colorOff = $canvas.attr('data-bgen-color-off') || "#4488ff";
        var width = $canvas.attr('data-bgen-width') || $canvas.attr('width') || 630;
        var height = $canvas.attr('data-bgen-height') || $canvas.attr('height') || 630;
        var compOpr = $canvas.attr('data-bgen-compopr') || 'lighten';
        var backColour= $canvas.attr('data-bgen-backcolour') || '#000000';
        var hueDelta= $canvas.attr('data-bgen-huedelta');
        hueDelta=hueDelta ? parseFloat(hueDelta):0.5;
        var satDelta= $canvas.attr('data-bgen-satdelta');
        satDelta=satDelta ? parseFloat(satDelta):0.5;
        var lumDelta= $canvas.attr('data-bgen-lumdelta');
        lumDelta=lumDelta ? parseFloat(lumDelta):0.5;
        var opacFactor= $canvas.attr('data-bgen-opacfactor');
        opacFactor=opacFactor ? parseFloat(opacFactor):0.5;
        var radiusMax= $canvas.attr('data-bgen-radiusmax');
        radiusMax = radiusMax ? parseInt(radiusMax) : 90;
        var radiusMin= $canvas.attr('data-bgen-radiusmin');
        radiusMin = radiusMin ? parseInt(radiusMin) : 1;
        var gradientOpr= $canvas.attr('data-bgen-gradientopr') || 'Linear';
        var shapeType= $canvas.attr('data-bgen-shapetype') || 'Bar-vertical';
        var lifeMax= $canvas.attr('data-bgen-lifemax');
        lifeMax = lifeMax ? parseInt(lifeMax) : 2;
        var lifeMin= $canvas.attr('data-bgen-lifemin');
        lifeMin = lifeMin ? parseInt(lifeMin) : 100;
        var fadeDirection= $canvas.attr('data-bgen-fadedirection') ||'Top';
        var emitterXMin= $canvas.attr('data-bgen-emitterxmin');
        emitterXMin = emitterXMin ? parseInt(emitterXMin) : 0;
        var emitterXMax= $canvas.attr('data-bgen-emitterxmax');
        emitterXMax = emitterXMax ? parseInt(emitterXMax) : width;
        var emitterYMin= $canvas.attr('data-bgen-emitterymin');
        emitterYMin = emitterYMin ? parseInt(emitterYMin) : 0;
        var emitterYMax= $canvas.attr('data-bgen-emitterymax');
        emitterYMax = emitterYMax ? parseInt(emitterYMax) : height;
        var emitter= $canvas.attr('data-bgen-emitter') || 'Area';
        var imageWidth= $canvas.attr('data-bgen-imagewidth') ||  width;
        var imageHeight= $canvas.attr('data-bgen-imageheight') || height;
        var locseed= $canvas.attr('data-bgen-locseed');
        locseed = locseed ? parseInt(locseed) : 1;
        /*
*/

        $canvas.attr('width', width).attr('height', height).attr('data-bgen-width', width).attr('data-bgen-height', height);

        var doughnutData =
          {
              particlesNo: value,
              colour1: color,
              colour2 : colorOff,
              compOpr: compOpr,
              backColour: backColour,
        			hueDelta: hueDelta,
        			satDelta:satDelta,
        			lumDelta: lumDelta,
        			opacFactor: opacFactor,
        			imageWidth: imageWidth,
        			imageHeight: imageHeight,
        			radiusMax: radiusMax,
        			radiusMin: radiusMin,
        			gradientOpr: gradientOpr,
        			shapeType: shapeType,
        			fadeDirection: fadeDirection,
        			lifeMax: lifeMax,
        			lifeMin: lifeMin,
        			emitterXMin: emitterXMin,
        			emitterXMax: emitterXMax,
              emitterYMin: emitterYMin,
        			emitterYMax: emitterYMax,
        			emitter:emitter,
              locseed:locseed

/**/

          };
        var bg = new BGen($canvas.get(0).getContext("2d")).Doughnut(doughnutData);
        //$canvas.attr('data-bgen-shown', 'true'); //the bgen is shown
    }

    $('canvas.bgen').each(function(i, c) {
        var $canvas = $(c);
        showBgen($canvas);
    })

    //Setup event handlers for bgens so that we can call update by triggering events at design time
    $(window).on('bgen-added', function() {
        $('canvas.bgen').off('bgen-update').on('bgen-update', function(event) {
            var $canvas = $(event.delegateTarget);
            showBgen($canvas);
        });
    }).trigger('bgen-added');
});
