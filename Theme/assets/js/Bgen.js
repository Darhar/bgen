
window.BGen = function(context){
	var bgen = this;
	var width = context.canvas.width;
	var height = context.canvas.height;
	var xCentre;
	var yCentre;
	var radius;
	var particlesMax=5000;

	Math.seed = 58;

	//High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
	if (window.devicePixelRatio) {
		context.canvas.style.width = width + "px";
		context.canvas.style.height = height + "px";
		context.canvas.height = height * window.devicePixelRatio;
		context.canvas.width = width * window.devicePixelRatio;
		context.scale(window.devicePixelRatio, window.devicePixelRatio);
	}

	this.Doughnut = function(data,options){
		return new Doughnut(data,context);
	};

	var clear = function(c){
		c.clearRect(0, 0, width, height);
	};

	var Doughnut = function(data,ctx){

		function drawParticles(colParams){
				var backgroundCol=colParams.backColour;
				var compositeOp = colParams.compOpr;
				var hueDelta=colParams.hueDelta;
				var satDelta=colParams.satDelta;
				var lumDelta=colParams.lumDelta;
				var opacityFactor=colParams.opacFactor;
				var imageWidth=colParams.imageWidth;
				var imageHeight=colParams.imageHeight;
				var particlesNo=colParams.particlesNo;
				var radiusMax=colParams.radiusMax;
				var radiusMin=colParams.radiusMin;
				var lifeMax=colParams.lifeMax;
				var lifeMin=colParams.lifeMin;
				var gradientOp=colParams.gradientOpr;
				var shapeType=colParams.shapeType;
				var emitterXMin=colParams.emitterXMin;
				var emitterXMax=colParams.emitterXMax;
				var emitterYMin=colParams.emitterYMin;
				var emitterYMax=colParams.emitterYMax;
				var emType=colParams.emitter;
				var fadeDirection=colParams.fadeDirection;
				var locseed=colParams.locseed;
				if(particlesNo>particlesMax) particlesNo=particlesMax;
				Math.seed =locseed;
				xCentre=(emitterXMin+emitterXMax)/2;
				yCentre=(emitterYMin+emitterYMax)/2;
				xradius=xCentre-emitterXMin;
				yradius=yCentre-emitterYMin;

				var particles = [];

				var newHsl1=(colParams.colour1===""? rgbToHsl(hexToRgb("#44ff88")) : rgbToHsl(hexToRgb(colParams.colour1)));
				var newHsl2=(colParams.colour2===""? rgbToHsl(hexToRgb("#ff4488")) : rgbToHsl(hexToRgb(colParams.colour2)));
				ctx.clearRect(0,0,imageWidth,imageHeight);

				//create  generation
				for (var i = 0; i < particlesNo; i++)
				{
						particles.push(new particle(
								newHsl1,
								newHsl2,
								hueDelta,
								satDelta,
								lumDelta,
								imageWidth,
								imageHeight,
								radiusMin,
								radiusMax,
								lifeMax,
								lifeMin,
								emitterXMin,
								emitterXMax,
								emitterYMin,
								emitterYMax,
								emType
						));
				};

				ctx.globalCompositeOperation = "source-over";
				ctx.fillStyle = backgroundCol;
				//Had to remove 1 from the canvas dimensions for the background to colour
				ctx.fillRect(0, 0, imageWidth-1, imageHeight-1);
				ctx.globalCompositeOperation = compositeOp;
				ctx.save();

				for (var i = 0; i < particles.length; i++)
				{
						var p = particles[i];
						var gradient;
						var opacity = p.life/lifeMax *opacityFactor;
						ctx.beginPath();

						switch(gradientOp){
								case "None":
										ctx.fillStyle = "hsla(" + p.h + ", " + p.s + "%, " + p.l + "%, " + opacity + ")";
										break;
								case "Radial":
										gradient = ctx.createRadialGradient(
												p.location.x,
												p.location.y,
												0,
												p.location.x,
												p.location.y,
												p.radius
										);
										gradient=setGradient(gradient,p,opacity);
										ctx.fillStyle=gradient ;
										break;
								case "Linear":
										switch(fadeDirection){
												case "Top":
														gradient=ctx.createLinearGradient(
																p.location.x,
																p.location.y,
																p.location.x,
																p.location.y+p.life
														);
														break;
												case "Bottom":
														gradient=ctx.createLinearGradient(
																p.location.x,
																p.location.y+p.life,
																p.location.x,
																p.location.y
														);
														break;
												case "Left":
														gradient=ctx.createLinearGradient(
																p.location.x+p.life,
																p.location.y,
																p.location.x,
																p.location.y
														);
														break;
												case "Right":
														gradient=ctx.createLinearGradient(
																p.location.x,
																p.location.y,
																p.location.x+p.life,
																p.location.y
														);
														break;
										}
										gradient=setGradient(gradient,p,opacity);
										ctx.fillStyle=gradient ;
										break;
						}

						switch(shapeType){
								case "Circle":
										ctx.arc(
												p.location.x,
												p.location.y,
												p.radius,
												0,
												Math.PI*2,
												false
										);
										break;
								case "Bar-horizontal":
										ctx.fillRect(
												p.location.x,
												p.location.y,
												p.life,
												p.radius
										);
										break;
								case "Bar-vertical":
										ctx.fillRect(
												p.location.x,
												p.location.y,
												p.radius,
												p.life
										);
										break;
						}

						//ctx.fillRect(p.location.x, p.location.y,p.radius, p.radius );
						ctx.fill();
						ctx.closePath();
				}
		};
		drawParticles(data);
	}

	function particle(
			hslArr1,
			hslArr2,
			hueDelta,
			satDelta,
			lumDelta,
			imageWidth,
			imageHeight,
			radiusMin,
			radiusMax,
			lifeMax,
			lifeMin,
			emitterXMin,
			emitterXMax,
			emitterYMin,
			emitterYMax,
			emType
	)
	{


			this.location = setLocation(
					emitterXMin,
					emitterXMax,
					emitterYMin,
					emitterYMax,
					emType
			);
			this.radius = radiusMin + parseInt(Math.seededRandom()*radiusMax);
			this.life = lifeMin + Math.abs(Math.seededRandom()*(lifeMax-lifeMin));

			//difference of the two colours h,s,l and a random
			this.h = getColDif(hslArr1.hue,hslArr2.hue,hueDelta )*360;
			this.s = getColDif(hslArr1.sat,hslArr2.sat,satDelta)*100;
			this.l = getColDif(hslArr1.lum,hslArr2.lum,lumDelta)*100;
	};

	function setLocation(horiMin,horiMax,vertMin,vertMax,emType){
			switch(emType){
					case "Area":
							return {
										 x:  Math.round( horiMin+(Math.seededRandom()*(horiMax-horiMin))),
										 y:  Math.round( vertMin+(Math.seededRandom()*(vertMax-vertMin)))
								 };
							break;
					case "Circular":
							var pt_angle = Math.seededRandom() * 2 * Math.PI;
							xr=Math.abs(Math.seededRandom()*xradius);
							yr=Math.abs(Math.seededRandom()*yradius);
							return {
										 x:  Math.round( xCentre + xr * Math.cos(pt_angle)),
										 y:  Math.round( yCentre + yr * Math.sin(pt_angle))
								 };
							break;
			}
	};

	function getColDif(value_a,value_b,value_delta){
			return Math.abs(value_a-(randomVector(value_delta)*(value_a-value_b)));
	};

	function setGradient(gradient,p,opacity){
			gradient.addColorStop(0  , "hsla(" + p.h + ", " + p.s + "%, " + p.l + "%, " + opacity + ")");
			gradient.addColorStop(0.33, "hsla(" + p.h + ", " + p.s + "%, " + p.l + "%, " + opacity/2 + ")");
			gradient.addColorStop(0.66, "hsla(" + p.h + ", " + p.s + "%, " + p.l + "%, " + opacity/6 + ")");
			gradient.addColorStop(1  , "hsla(" + p.h + ", " + p.s + "%, " + p.l + "%, 0)");
			return gradient;
	};

	function rgbToHsl(rgbCol){

	    r=rgbCol.r /255, g=rgbCol.g /255, b=rgbCol.b /255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;
	    if(max == min){
	        h = s = 0; // achromatic
	    }else{
	        var d = max - min;
	        s = l < 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max){
	            case r: h = (g - b) / d + (g > b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }
	    if(h<0) h=1+h;
	    return {hue:h,sat:s,lum:l};
	};

	function hexToRgb(hex) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	};

	Math.seededRandom = function(max, min) {
	    max = max || 1;
	    min = min || 0;
	    Math.seed = (Math.seed * 9301 + 49297) % 233280;
	    var rnd = Math.seed / 233280.0;
	    return min + rnd * (max - min);
	};

	function randomVector(degr){
	    return Math.seededRandom()*degr*2-(degr);
	};

}
