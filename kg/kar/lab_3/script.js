var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

function put_pixel(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
}

function drawCircle(x, y, radius, color){
    var x0 = 0, y0 = radius, gap = 0, delta = (2 - 2 * radius);
    while (y0 >= 0) {
        put_puxel(x + x0, y - y0, color);
        put_pixel(x - x0, y - y0, color);
        put_puxel(x - x0, y + y0, color);
        put_puxel(x + x0, y + y0, color);
        gap = 2 * (delta + y0) - 1;
        if (delta < 0 && gap <= 0) {
            x0++;
            delta += 2 * x0 + 1;
            continue;
        }
        if (delta > 0 && gap > 0) {
            y0--;
            delta -= 2 * y0 + 1;
            continue;
        }
        x0++;
        delta += 2 * (x0 - y0);
        y0--;
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
                y = y + step;
                d = d + d1
            }
            else {
                d = d + d2;
            }
            put_pixel(x, y, color);
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

function draw_polyg(x_coord, y_coord, border_color, fill_color) {
    var used = [];
    for (var i = 0; i < canvas.width; i++) {
        used[i] = [];
        for (var j = 0; j < canvas.height; j++) used[i][j] = 0;
    }
    var len = x_coord.length;
    for (var i = 1; i < len; i++) draw_line(x_coord[i - 1], y_coord[i - 1], x_coord[i], y_coord[i], border_color);
    draw_line(x_coord[len - 1], y_coord[len - 1], x_coord[0], y_coord[0], border_color);
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
            used[x + 1][y] = used[x][y] ^ used[x][y];
        }
    }
}

function draw_spline(x_coord, y_coord, color) {
    var len = x_coord.length;
    x_coord[len] = x_coord[len - 1];
    y_coord[len] = y_coord[len - 1];
    var num = 0;
    num = 100;
    var last_x = x_coord[0], last_y = y_coord[0];
    for (var i = 1; i < x_coord.length - 2; i++) {
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
            draw_line(last_x, last_y, px, py, color)
            last_x = px
            last_y = py
        }
    }
}

function main() {
    // тут надо рисовать
}