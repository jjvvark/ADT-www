var canvas;
var context;
var img;

var canvasWidth;
var canvasHeight;

var mouseX, mouseY, imageWidth, imageHeight, imageX, imageY, imageW, imageH, oldImageX, oldImageY;

var dragging = false;

function drawThumb( src, x, y, w, h ) {

	canvas=document.getElementById("thumbCanvas");
	context = canvas.getContext("2d");
	context.canvas.width = 558;
	context.canvas.height = 475;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;

	img = new Image();
	img.onload = function() {

		imageWidth = img.width;
		imageHeight = img.height;

		console.log( x );

		if( x == undefined ) {

			setBestFit();

		} else {

			console.log("poepie!");

			imageX = x;
			imageY = y;
			imageW = w;
			imageH = h;

		}

		render();

	};

	canvas.onmousedown = function(e) {
		
		mouseX = e.clientX;
		mouseY = e.clientY;

		oldImageX = imageX;
		oldImageY = imageY;

		dragging = true;

	};

	window.onmouseup = function(e) {

		dragging = false;

	}

	window.onmousemove = function(e) {

		if( dragging ) {

			imageX = oldImageX + ( e.clientX - mouseX );
			imageY = oldImageY + ( e.clientY - mouseY );
			render();

		}

	}

	function setBestFit() {

		if( ( imageWidth / canvasWidth ) > ( imageHeight / canvasHeight ) ) {

			imageW = canvasWidth;
			imageH = parseInt( imageHeight * ( imageW / imageWidth ) );
			imageX = 0;
			imageY = ( canvasHeight - imageH ) / 2;

		} else {

			imageH = canvasHeight;
			imageW = parseInt( imageWidth * ( imageH / imageHeight ) );
			imageY = 0;
			imageX = ( canvasWidth - imageW ) / 2;

		}

	}

	img.src = src;

}



	function render() {

		context.clearRect(0, 0, canvasWidth, canvasHeight);

		if( imageX > 188 ) {
			imageX = 188;
		} else if ( imageX < ( 388 - imageW ) ) {
			imageX = ( 388 - imageW );
		}

		if( imageY > 151 ) {
			imageY = 151;
		} else if( imageY < ( 320 - imageH ) ) {
			imageY = 322 - imageH;
		}

		context.drawImage( img, imageX, imageY, imageW, imageH );

		context.beginPath();
		context.rect(188.5, 151.5, 200, 170);
		context.lineWidth = 1;
		context.strokeStyle = 'black';
		context.stroke();

		context.beginPath();
		context.rect(187.5, 150.5, 202, 172);
		context.lineWidth = 1;
		context.strokeStyle = 'white';
		context.stroke();

	}

	function zoomItOut() {

		var oldImageW = imageW;
		var oldImageH = imageH;

		imageW *= .9;
		imageH = parseInt( imageW * ( imageHeight / imageWidth ) );

		if( imageW < 200 ) {
			imageW = 200;
			imageH = parseInt( imageW * ( imageHeight / imageWidth ) );
		}

		if( imageH < 170 ) {
			imageH = 170;
			imageW = parseInt( imageH * ( imageWidth / imageHeight ) );
		}

		imageX -= ( imageW - oldImageW ) / 2;
		imageY -= ( imageH - oldImageH ) / 2;

		render();

	}

	function zoomItIn() {

		var oldImageW = imageW;
		var oldImageH = imageH;

		imageW *= 1.1;
		imageH = parseInt( imageW * ( imageHeight / imageWidth ) );

		imageX -= ( imageW - oldImageW ) / 2;
		imageY -= ( imageH - oldImageH ) / 2;

		render();

	}

	function getCoords() {
		return { x:parseInt(imageX), y:parseInt(imageY), w:parseInt(imageW), h:parseInt(imageH) };
	}
