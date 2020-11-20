function project(pt, k = 500) {
	return {'x': k * pt.x / pt.z, 'y': k * pt.y / pt.z, 'z': 0};
}

function f(x, y) {
	return {'x': x, 'y': Math.sin(x * x + y * y) / (x * x + y * y), 'z': y}
}

function move(pt, x = 0, y = -2, z = 9) {
	return {'x': pt.x + x, 'y': pt.y + y, 'z': pt.z + z};
}

function scale(pt, k) {
	return {'x': k * pt.x, 'y': k * pt.y};
}

function rotate(pt, angle = 0.7) {
	return {'x': pt.x * Math.cos(angle) + pt.z * Math.sin(angle), 
			'z': -pt.x * Math.sin(angle) + pt.z * Math.cos(angle),
			'y': pt.y}
}

var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth / 2;
canvas.height = 600;
var ctx = canvas.getContext("2d")
ctx.translate(canvas.width / 2, canvas.height / 2)
ctx.scale(1, -1)
ctx.fillStyle = "white"
ctx.strokeStyle = "red"

var len = 0.2;
var maxv = 4;

function draw(x, y) {
	ctx.beginPath();
	var pt1 = project(move(rotate(f(x, y))));
	var pt2 = project(move(rotate(f(x + len, y))));
	var pt3 = project(move(rotate(f(x + len, y + len))));
	var pt4 = project(move(rotate(f(x, y + len))));
	ctx.moveTo(pt1.x, pt1.y);
	ctx.lineTo(pt2.x, pt2.y);
	ctx.lineTo(pt3.x, pt3.y);
	ctx.lineTo(pt4.x, pt4.y);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}

for (var y = maxv; y >= -maxv; y -= len) {
	for (var x = maxv; x >= -maxv; x -= len) {
		draw(x, y);
	}
}


