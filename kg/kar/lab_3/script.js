var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")
var used = []

for (var i = 0; i < canvas.width; i++) {
    used[i] = [];
    for (var j = 0; j < canvas.height; j++) used[i][j] = 0;
}

function put_pixel(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
    x = parseInt(x)
    y = parseInt(y)
    used[x][y] = 1
}

function draw_circle(x, y, radius, color){
    var x0 = 0, y0 = radius, gap = 0, delta = (2 - 2 * radius)
    while (y0 >= 0) {
        put_pixel(x + x0, y - y0, color)
        put_pixel(x - x0, y - y0, color)
        put_pixel(x - x0, y + y0, color)
        put_pixel(x + x0, y + y0, color)
        gap = 2 * (delta + y0) - 1
        if (delta < 0 && gap <= 0) {
            x0++
            delta += 2 * x0 + 1
            continue
        }
        if (delta > 0 && gap > 0) {
            y0--
            delta -= 2 * y0 + 1
            continue
        }
        x0++
        delta += 2 * (x0 - y0)
        y0--
    }
}

function brezenhem_line(x1, y1, x2, y2, color) {
    var dx = x2 - x1
    var dy = y2 - y1
    if ((Math.abs(dx) > Math.abs(dy) && x2 < x1) || (Math.abs(dx) <= Math.abs(dy) && y2 < y1)) {
        var t = x1
        x1 = x2
        x2 = t
        t = y1
        y1 = y2
        y2 = t
        dx = x2 - x1
        dy = y2 - y1
    }
    var step = 1
    put_pixel(x1, y1, color)
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dy < 0) {
            step = -1
            dy *= -1
        }
        var d = dy * 2 - dx
        var d1 = 2 * (dy - dx)
        var d2 = 2 * dy
        var y = y1
        for (var x = x1 + 1; x <= x2; x++) {
            if (d > 0) {
                y = y + step
                d = d + d1
            }
            else {
                d = d + d2
            }
            put_pixel(x, y, color)
        }
    }
    else {
        if (dx < 0) {
            step = -1;
            dx = -dx;
        }
        var d = dx * 2 - dy;
        var d1 = 2 * (dx - dy)
        var d2 = 2 * dx
        var x = x1
        for (var y = y1 + 1; y <= y2; y++) {
            if (d > 0) {
                x = x + step;
                d = d + d1
            }
            else {
                d = d + d2;
            }
            put_pixel(x, y, color);
        }
    }
}

function draw_polyg(x, y, bc, fc) {
    for (var i = 0; i < canvas.width; i++) {
        used[i] = [];
        for (var j = 0; j < canvas.height; j++) used[i][j] = 0;
    }
    var len = x.length;
    for (var i = 1; i < len; i++) brezenhem_line(x[i - 1], y[i - 1], x[i], y[i], bc);
    brezenhem_line(x[len - 1], y[len - 1], x[0], y[0], bc);
    var x_min = x[0], x_max = x[0], y_min = y[0], y_max = y[0];
    for (var i = 1; i < len; i++) {
        x_min = Math.min(x_min, x[i]);
        x_max = Math.max(x_max, x[i]);
        y_min = Math.min(y_min, y[i]);
        y_max = Math.max(y_max, y[i]);
    }
    for (var y = y_min; y <= y_max; y++) {
        var chk = false;
        for (var x = x_min; x <= x_max; x++) {
            if (used[x][y] == 1) chk = !chk;
            if (chk) used[x][y] = 1;
        }
        for (var x = x_min; x <= x_max; x++) {
            if (used[x][y]) put_pixel(x, y, fc);
        }
    }
}

function draw_spline(x, y, color) {
    var len = x.length;
    x[len] = x[len - 1];
    y[len] = y[len - 1];
    var num = 0;
    num = 100;
    var prev_x = x[0], prev_y = y[0];
    for (var i = 1; i < x.length - 2; i++) {
        var a = [], b = [];
        a[3] = (-x[i - 1] + 3 * x[i] - 3 * x[i + 1] + x[i + 2]) / 6
        a[2] = (x[i - 1] - 2 * x[i] + x[i + 1]) / 2
        a[1] = (-x[i - 1] + x[i + 1]) / 2
        a[0] = (x[i - 1] + 4 * x[i] + x[i + 1]) / 6
        b[3] = (-y[i - 1] + 3 * y[i] - 3 * y[i + 1] + y[i + 2]) / 6
        b[2] = (y[i - 1] - 2 * y[i] + y[i + 1]) / 2
        b[1] = (-y[i - 1] + y[i + 1]) / 2
        b[0] = (y[i - 1] + 4 * y[i] + y[i + 1]) / 6
        for (var j = 0; j < num; j++) {
            var t = j / num
            var px = ((a[3] * t + a[2]) * t + a[1]) * t + a[0]
            var py = ((b[3] * t + b[2]) * t + b[1]) * t + b[0]
            brezenhem_line(prev_x, prev_y, px, py, color)
            prev_x = px
            prev_y = py
        }
    }
}

function main() {
    var x = [330, 312, 309, 346, 389, 436, 498, 546, 579, 596, 594, 549, 487, 414, 381, 363, 388, 377, 341, 327]
    var y = [324, 296, 253, 199, 175, 167, 174, 201, 249, 310, 361, 428, 454, 443, 420, 377, 347, 320, 303, 324]
    draw_spline(x, y, "red")
    draw_polyg([331, 331, 370, 370],[283, 243, 243, 283], "black", "red")
    draw_polyg([371, 371, 407, 407],[237, 200, 200, 237], "black", "blue")
    draw_polyg([439, 439, 474, 474],[232, 196, 196, 232], "black", "green")
    draw_polyg([500, 500, 540, 540],[257, 220, 220, 257], "black", "yellow")
    draw_polyg([530, 530, 570, 570],[303, 343, 343, 303], "black", "orange")
    draw_circle(440, 380, 50, "black")
}
main()