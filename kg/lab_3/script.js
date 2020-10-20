'use strict';

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var ox = canvas.width / 2;
var oy = canvas.height / 2;

var used = [];
function clear_used() {
    for (var i = 0; i < canvas.width; i++) {
        used[i] = [];
        for (var j = 0; j < canvas.height; j++) used[i][j] = 0;
    }   
}

function get_pixel(x, y) {
    return ctx.getImageData(x, y, 1, 1).data;
}

function put_pixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    used[parseInt(x)][parseInt(y)] = 1;
}

function clear() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_line(x1, y1, x2, y2, color) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    if (Math.abs(dx) > Math.abs(dy) && x2 < x1 || Math.abs(dx) <= Math.abs(dy) && y2 < y1) {
        x1 += x2;
        x2 = x1 - x2;
        x1 -= x2;
        y1 += y2;
        y2 = y1 - y2;
        y1 -= y2;
        dx = x2 - x1;
        dy = y2 - y1;
    }
    var change = 1;
    put_pixel(x1, y1, color);
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dy < 0) {
            change = -1;
            dy *= -1;
        }
        var d_i = dy * 2 - dx;
        var y = y1;
        for (var x = x1 + 1; x <= x2; x++) {
            if (d_i > 0) {
                y += change;
                d_i += 2 * (dy - dx);
            }
            else d_i += 2 * dy;
            put_pixel(x, y, color);
        }
    }
    else {
        if (dx < 0) {
            change = -1;
            dx *= -1;
        }
        var d_i = dx * 2 - dy;
        var x = x1;
        for (var y = y1 + 1; y <= y2; y++) {
            if (d_i > 0) {
                x += change;
                d_i += 2 * (dx - dy);
            }
            else d_i += 2 * dx;
            put_pixel(x, y, color);
        }
    }
}

function draw_ellipse(cx, cy, a, b, color) {
    var cur_x = 0;
    var cur_y = b;
    var a2 = a * a;
    var b2 = b * b;
    var delta = 4 * b2 * (cur_x + 1) * (cur_x + 1) + a2 * (2 * cur_y - 1) * (2 * cur_y - 1) - 4 * a2 * b2;
    while (a * a * (2 * cur_y - 1) > 2 * b * b * (cur_x + 1)) {
        put_pixel(cx + cur_x, cy + cur_y, color);
        put_pixel(cx - cur_x, cy + cur_y, color);
        put_pixel(cx + cur_x, cy - cur_y, color);
        put_pixel(cx - cur_x, cy - cur_y, color);
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
        put_pixel(cx + cur_x, cy + cur_y, color);
        put_pixel(cx - cur_x, cy + cur_y, color);
        put_pixel(cx + cur_x, cy - cur_y, color);
        put_pixel(cx - cur_x, cy - cur_y, color);
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

function draw_circle(cx, cy, r, color) {
    draw_ellipse(cx, cy, r, r, color);
}

function draw_polygon(x_coord, y_coord, border_color, fill_color) {
    clear_used();
    var len = x_coord.length;
    for (var i = 1; i < len; i++) draw_line(x_coord[i - 1], y_coord[i - 1], x_coord[i], y_coord[i], border_color);
    draw_line(x_coord[len - 1], y_coord[len - 1], x_coord[0], y_coord[0], border_color);
    if (fill_color == -1) return;
    var x_min = x_coord[0], x_max = x_coord[0], y_min = y_coord[0], y_max = y_coord[0];
    for (var i = 1; i < len; i++) {
        x_min = Math.min(x_min, x_coord[i]);
        x_max = Math.max(x_max, x_coord[i]);
        y_min = Math.min(y_min, y_coord[i]);
        y_max = Math.max(y_max, y_coord[i]);
    }
    for (var y = y_min; y <= y_max; y++) {
        var chk = false;
        for (var x = x_min; x <= x_max; x++) {
            if (used[x][y] == 1) chk = !chk;
            if (chk) used[x][y] = 1;
        }
        for (var x = x_min; x <= x_max; x++) {
            if (used[x][y]) put_pixel(x, y, fill_color);
        }
    }
}

function get_coefs(i, x, y, a, b) {
    a[3] = (-x[i - 1] + 3 * x[i] - 3 * x[i + 1] + x[i + 2]) / 6
    a[2] = (x[i - 1] - 2 * x[i] + x[i + 1]) / 2
    a[1] = (-x[i - 1] + x[i + 1]) / 2
    a[0] = (x[i - 1] + 4 * x[i] + x[i + 1]) / 6

    b[3] = (-y[i - 1] + 3 * y[i] - 3 * y[i + 1] + y[i + 2]) / 6
    b[2] = (y[i - 1] - 2 * y[i] + y[i + 1]) / 2
    b[1] = (-y[i - 1] + y[i + 1]) / 2
    b[0] = (y[i - 1] + 4 * y[i] + y[i + 1]) / 6
}

function draw_spline(x_coord, y_coord, color) {
    var len = x_coord.length;
    x_coord[len] = x_coord[len - 1];
    y_coord[len] = y_coord[len - 1];
    var num = 0;
    num = 100;
    var last_x = x_coord[0], last_y = y_coord[0];
    for (var i = 1; i < x_coord.length - 2; i++) {
        var a = [];
        var b = [];
        get_coefs(i, x_coord, y_coord, a, b);
        for (var j = 0; j < num; j++) {
            var t = j / num;
            var px = ((a[3] * t + a[2]) * t + a[1]) * t + a[0];
            var py = ((b[3] * t + b[2]) * t + b[1]) * t + b[0];
            draw_line(last_x, last_y, px, py, color);
            last_x = px;
            last_y = py;
        }
    }
}

function start() {
    var x = [111, 103,  93,  88,  87,  87,  90, 102, 103, 106, 112, 118, 136, 154, 169, 185,
        203, 218, 233, 247, 266, 287, 329, 370, 399, 419, 434, 451, 470, 484, 498, 510,
        523, 536, 547, 559, 572, 582, 592, 604, 621, 639, 656, 667, 681, 692, 702, 707,
        710, 712, 715, 713, 711, 705, 698, 687, 673, 622, 300, 200, 111, 103,  93]
    var y = [404, 396, 388, 377, 368, 359, 354, 342, 331, 317, 302, 285, 262, 235, 218, 206,
        193, 183, 177, 170, 164, 158, 155, 154, 156, 159, 162, 168, 174, 180, 187, 195,
        205, 215, 225, 239, 257, 258, 257, 260, 262, 267, 273, 279, 288, 300, 314, 329, 
        345, 360, 372, 382, 388, 393, 399, 400, 400, 400, 400, 400, 400, 396, 388]

    draw_spline(x, y, "black");
    draw_circle(233, 420, 70, "black");
    draw_circle(600, 420, 70, "black");
    draw_line(167, 400, 300, 400, "white");
    draw_line(534, 400, 667, 400, "white");
    draw_polygon([180, 260, 260], [250, 250, 180], "black", -1);
    draw_polygon([270, 450, 450, 270], [250, 250, 180, 180], "black", -1);
    draw_polygon([470, 550, 470], [250, 250, 185], "black", -1);
    draw_line(400, 270, 400, 400, "black");
    draw_line(200, 270, 600, 270, "black");
    draw_line(200, 270, 200, 360, "black");
    draw_line(600, 270, 600, 350, "black");
    draw_polygon([213, 253, 253, 213], [400, 400, 440, 440], "black", "black");
    draw_polygon([580, 620, 620, 580], [400, 400, 440, 440], "black", "black");
}

clear_used();
start();