'use strict';

var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

var ox = canvas.width / 2
var oy = canvas.height / 2
var scale = 10
var rotate = 0
var shift_x = 0
var shift_y = 0

function draw_numbers() {
    //OX
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
        ctx.font = '12px Segoe UI';
    for (var x = 0; x < canvas.width; x += 50) {
        var x_number = x * 0.1;
        ctx.strokeText((x_number / (scale * 0.1)), canvas.width / 2 + 10 + x + shift_x, canvas.height / 2 - 5 + shift_y);
        ctx.strokeText((-x_number / (scale * 0.1)), canvas.width / 2 + 10 - x + shift_x, canvas.height / 2 - 5 + shift_y);
    }
 		//OY
    for (var y = 0; y < canvas.height; y += 50) {
        var y_number = y * 0.1;
        ctx.strokeText((-y_number / (scale * 0.1)), canvas.width / 2 + 10 + shift_x, canvas.height / 2 - 5 + y + shift_y);
        ctx.strokeText((y_number / (scale * 0.1)), canvas.width / 2 + 10 + shift_x, canvas.height / 2 - 5 - y + shift_y);
    }
}

function draw_lines() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    //OX
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2 + shift_y);
    ctx.lineTo(canvas.width, canvas.height / 2 + shift_y);
    ctx.closePath();
    ctx.stroke();
    //OY
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + shift_x, 0);
    ctx.lineTo(canvas.width / 2 + shift_x, canvas.height);
    ctx.closePath();
    ctx.stroke();
}

function draw_ver(x, y) {
    ctx.beginPath();
    ctx.moveTo(x + shift_x, y);
    ctx.lineTo(x + 3 + shift_x, y);
    ctx.closePath();
    ctx.stroke();
}
 

function draw_hor(x, y) {
    ctx.beginPath()
    ctx.moveTo(x, y + shift_y)
    ctx.lineTo(x, y + 3 + shift_y)
    ctx.closePath()
    ctx.stroke()
}
 
//grid full
function draw_grid() {
    ctx.strokeStyle = "#6B90D4"
    for (var x = 0; x < canvas.width - shift_x; x += 50) {
        for (var y = canvas.height; y > 0; y -= 10) {
            draw_hor(x, y);
        }
    }
    for (var y = 0; y < canvas.height - shift_y; y += 50) {
        for (var x = canvas.width; x > 0; x -= 10) {
            draw_ver(x, y);
        }
    }
}

function draw_plot() {
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    for (var t = 0; t <= 2 * Math.PI; t += 0.01) {
        var x = ox + 2 * Math.cos(t) + Math.cos(2 * t);
        var y = oy + 2 * Math.sin(t) - Math.sin(2 * t);
        ctx.lineTo(5*x, 5*y);
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();    
}

draw_grid();
draw_numbers();
draw_lines();
draw_plot();