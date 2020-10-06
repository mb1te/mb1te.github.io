'use strict';

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var ox = canvas.width / 2;
var oy = canvas.height / 2;
var scale = 1;
var rotate = 0;
var shift_x = 0;
var shift_y = 0;

function draw_lines() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.closePath();
    ctx.stroke();
}

function draw_ver(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 3, y);
    ctx.closePath();
    ctx.stroke();
}
 
function draw_grid() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#6B90D4"
    for (var x = 0; x < canvas.width; x += 50) {
        for (var y = canvas.height; y > 0; y -= 10) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x, y + 3)
            ctx.closePath()
            ctx.stroke()
        }
    }
    for (var y = 0; y < canvas.height; y += 50) {
        for (var x = canvas.width; x > 0; x -= 10) {
            draw_ver(x, y);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 3, y);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function put_pixel(x, y) {
    ctx.fillStyle = "red"
    ctx.fillRect(x, y, 3, 3);
}

function draw_plot() {
    for (var t = 0; t <= 2 * Math.PI; t += 0.001) {
        var x = (2 * Math.cos(t) + Math.cos(2 * t)) * scale;
        var y = (2 * Math.sin(t) - Math.sin(2 * t)) * scale;
        var new_x = x * Math.cos(rotate) - y * Math.sin(rotate) + ox;
        var new_y = x * Math.sin(rotate) + y * Math.cos(rotate) + oy;
        var dx = 1 * shift_x;
        var dy = 1 * shift_y;
        put_pixel(new_x + dx, new_y + dy);
        //console.log(new_x + shift_x);
    } 
    //console.log(shift_x, shift_y);
}
function start() {
    scale = document.getElementById('scale').value / 50;
    shift_x = document.getElementById('x-shift').value;
    shift_y = document.getElementById('y-shift').value;
    rotate = document.getElementById('rotate').value / 50;
    draw_grid();
    draw_lines();
    draw_plot();
}

start()
