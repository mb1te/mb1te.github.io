'use strict';

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var ox = canvas.width / 2;
var oy = canvas.height / 2;

function put_pixel(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 2, 2);
}

function clear() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_ellipse(cx, cy, a, b) {
    var cur_x = 0;
    var cur_y = b;
    var a2 = a * a;
    var b2 = b * b;
    var delta = 4 * b2 * (cur_x + 1) * (cur_x + 1) + a2 * (2 * cur_y - 1) * (2 * cur_y - 1) - 4 * a2 * b2;
    while (a * a * (2 * cur_y - 1) > 2 * b * b * (cur_x + 1)) {
        put_pixel(cx + cur_x, cy + cur_y);
        put_pixel(cx - cur_x, cy + cur_y);
        put_pixel(cx + cur_x, cy - cur_y);
        put_pixel(cx - cur_x, cy - cur_y);
        if (delta > 0) {
            cur_x++;
            delta = delta - 8 * a2 * (cur_y - 1) + 4 * b2 * (2 * cur_x + 3);
            cur_y--;
        }
        else {
            cur_x++;
            delta = delta + 4 * b2 * (2 * cur_x + 3);
        }
    }
    delta = b2 * (2 * cur_x + 1) * (2 * cur_x + 1) + 4 * a2 * (cur_y + 1) * (cur_y + 1) - 4 * a2 * b2;
    while (cur_y != -1) {
        put_pixel(cx + cur_x, cy + cur_y);
        put_pixel(cx - cur_x, cy + cur_y);
        put_pixel(cx + cur_x, cy - cur_y);
        put_pixel(cx - cur_x, cy - cur_y);
        if (delta > 0) {
            cur_y--;
            delta = delta - 8 * b2 * (cur_x + 1) + 4 * a2 * (2 * cur_y + 3);
            cur_x++;
        }
        else {
            cur_y--;
            delta = delta + 4 * a2 * (2 * cur_y + 3);
        }
    } 
}

function start() {
    var cx = +document.getElementById('cx').value;
    var cy = +document.getElementById('cy').value;
    var a = +document.getElementById('a').value;
    var b = +document.getElementById('b').value;
    clear();
    draw_ellipse(ox + cx, oy + cy, a, b);
}

start();