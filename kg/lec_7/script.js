'use strict';

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var x = [], y = [];
var len = 0;

function put_pixel(x, y) {
    ctx.fillStyle = "black";
    ctx.fillRect(x - 3, y - 3, 6, 6);
}

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width) - 19,
        y: y - bbox.top * (canvas.height / bbox.height) - 13
    };
}

canvas.onmousedown = function(e) {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    x[len] = loc.x;
    y[len++] = loc.y;
    put_pixel(loc.x, loc.y);
}

function clear_window() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    x = [];
    y = [];
    len = 0;
}

function vec_mult(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1;
}

function get_len(x1, y1, x2, y2) {
    return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
}

function convex_hull() {
    var min_ind = 0;
    for (var i = 1; i < x.length; i++) {
        if (x[i] < x[min_ind] || x[i] == x[min_ind] && y[i] < y[min_ind]) min_ind = i;
    }
    if (min_ind != 0) {
        x[min_ind] += x[0];
        x[0] = x[min_ind] - x[0];
        x[min_ind] -= x[0];
        y[min_ind] += y[0];
        y[0] = y[min_ind] - y[0];
        y[min_ind] -= y[0];
    }
    for (var i = 1; i < x.length - 1; i++) {
        for (var j  = i + 1; j < x.length; j++) {
            var mul = vec_mult(x[i] - x[0], y[i] - y[0], x[j] - x[0], y[j] - y[0]);
            if (mul < 0 || mul == 0 && get_len(x[0], y[0], x[i], y[i]) > get_len(x[0], y[0], x[j], y[j])) {
                x[i] += x[j];
                x[j] = x[i] - x[j];
                x[i] -= x[j];
                y[i] += y[j];
                y[j] = y[i] - y[j];
                y[i] -= y[j];
            } 
        }
    }
    var st_x = [x[0], x[1]], st_y = [y[0], y[1]];
    for (var i = 2; i < x.length; i++) {
        var len2 = st_x.length;
        while(len2 >= 2 && vec_mult(st_x[len2 - 1] - st_x[len2 - 2], st_y[len2 - 1] - st_y[len2 - 2], x[i] - st_x[len2 - 1], y[i] - st_y[len2 - 1]) < 0) {
            st_x.pop();
            st_y.pop();
            len2 = st_x.length;
        }
        st_x.push(x[i]);
        st_y.push(y[i]);
    }
    ctx.moveTo(st_x[0], st_y[0]);
    ctx.beginPath();
    for (var i = 1; i < st_x.length; i++) ctx.lineTo(st_x[i], st_y[i]);
    ctx.lineTo(st_x[0], st_y[0]);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.stroke();
}