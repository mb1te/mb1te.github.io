'use strict';

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var x = [], y = [];
var old_x = [], old_y = [];
var tr_x = [], tr_y = [];
var len = 0;
var len_tr = 0;
var is_drawn = false;

function put_pixel(x, y) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 6, 6);
}

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width) - 19,
        y: y - bbox.top * (canvas.height / bbox.height) - 13
    };
}

canvas.onmousedown = function(e) {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    loc.x = parseInt(loc.x);
    loc.y = parseInt(loc.y);
    if (is_drawn) {
        for (var i = 1; i < len_tr; i++) {
            var AB = {x: tr_x[i] - tr_x[i - 1], y: tr_y[i] - tr_y[i - 1]};
            var BC = {x: tr_x[i + 1] - tr_x[i], y: tr_y[i + 1] - tr_y[i]};
            var CA = {x: tr_x[i - 1] - tr_x[i + 1], y: tr_y[i - 1] - tr_y[i + 1]};
            var PA = {x: tr_x[i - 1] - loc.x, y: tr_y[i - 1] - loc.y};
            var PB = {x: tr_x[i] - loc.x, y: tr_y[i] - loc.y};
            var PC = {x: tr_x[i + 1] - loc.x, y: tr_y[i + 1] - loc.y};
            var PAB = vec_mult(PA, AB);
            var PBC = vec_mult(PB, BC);
            var PCA = vec_mult(PC, CA);
            if (PAB * PBC > 0 && PAB * PCA > 0 && PBC * PCA > 0) {
                alert("Точка принадлежит многоугольнику");
                return;
            }
        }
        alert("Точка не принадлежит многоугольнику");
    }
    else {
        x[len] = loc.x;
        y[len++] = loc.y;
        put_pixel(loc.x, loc.y);
    }
}

function clear_window() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    x = [];
    y = [];
    tr_x = [];
    tr_y = [];
    len_tr = 0;
    len = 0;
    is_drawn = false;
}

function draw_line(i, j) {
    ctx.beginPath();
    ctx.moveTo(x[i], y[i]);
    ctx.lineTo(x[j], y[j]);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function vec_mult(a, b) {
    return a.x * b.y - b.x * a.y;
}

function in_triangle(p, a, b, c) {
    var AB = {x: x[b] - x[a], y: y[b] - y[a]};
    var BC = {x: x[c] - x[b], y: y[c] - y[b]};
    var CA = {x: x[a] - x[c], y: y[a] - y[c]};
    var PA = {x: x[a] - x[p], y: y[a] - y[p]};
    var PB = {x: x[b] - x[p], y: y[b] - y[p]};
    var PC = {x: x[c] - x[p], y: y[c] - y[p]};
    var PAB = vec_mult(PA, AB);
    var PBC = vec_mult(PB, BC);
    var PCA = vec_mult(PC, CA);
    return PAB * PBC > 0 && PAB * PCA > 0 && PBC * PCA > 0;
}

function triangulate() {
    while (len > 3) {
        for (var i = 1; i < len - 1; i++) {
            var AB = {x: x[i] - x[i - 1], y: y[i] - y[i - 1]};
            var AC = {x: x[i + 1] - x[i - 1], y: y[i + 1] - y[i - 1]};
            if (vec_mult(AC, AB) >= 0) continue;
            var chk = true;
            for (var j = 0; j < len; j++) {
                if (in_triangle(j, i - 1, i, i + 1)) {
                    chk = false;
                }
            }
            if (chk) {
                draw_line(i - 1, i + 1);
                tr_x[len_tr] = x[i - 1];
                tr_y[len_tr] = y[i - 1];
                len_tr++;
                tr_x[len_tr] = x[i];
                tr_y[len_tr] = y[i];
                len_tr++;
                tr_x[len_tr] = x[i + 1];
                tr_y[len_tr] = y[i + 1];
                len_tr++;
                for (var j = i + 1; j < len; j++) {
                    x[j - 1] = x[j];
                    y[j - 1] = y[j];
                }
                len--;
                break;
            }
        }
    }
    i = 1;
    tr_x[len_tr] = x[i - 1];
    tr_y[len_tr] = y[i - 1];
    len_tr++;
    tr_x[len_tr] = x[i];
    tr_y[len_tr] = y[i];
    len_tr++;
    tr_x[len_tr] = x[i + 1];
    tr_y[len_tr] = y[i + 1];
    len_tr++;
}

function draw_polygon() {
    for (var i = 0; i < len; i++) {
        old_x[i] = x[i];
        old_y[i] = y[i];
    }
    ctx.beginPath();
    for (var i = 1; i < x.length; i++) ctx.lineTo(x[i], y[i]);
    ctx.lineTo(x[0], y[0]);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.stroke();
    triangulate();
    alert("Нажмите на нужное место, чтобы проверить принадлежность точки");
    is_drawn = true;
}
