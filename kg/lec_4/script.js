'use strict';

var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")


var x_coord = [111, 103,  93,  88,  87,  87,  90, 102, 103, 106, 112, 118, 136, 154, 169, 185,
               203, 218, 233, 247, 266, 287, 329, 370, 399, 419, 434, 451, 470, 484, 498, 510,
               523, 536, 547, 559, 572, 582, 592, 604, 621, 639, 656, 667, 681, 692, 702, 707,
               710, 712, 715, 713, 711, 705, 698, 687, 673, 622, 300, 200, 111, 103,  93]
var y_coord = [404, 396, 388, 377, 368, 359, 354, 342, 331, 317, 302, 285, 262, 235, 218, 206,
               193, 183, 177, 170, 164, 158, 155, 154, 156, 159, 162, 168, 174, 180, 187, 195,
               205, 215, 225, 239, 257, 258, 257, 260, 262, 267, 273, 279, 288, 300, 314, 329, 
               345, 360, 372, 382, 388, 393, 399, 400, 400, 400, 400, 400, 400, 396, 388]

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

function draw_spline() {
    ctx.beginPath()
    ctx.moveTo(x_coord[0], y_coord[0])
    var len = x_coord.length
    x_coord[len] = x_coord[len - 1]
    y_coord[len] = y_coord[len - 1]
    var num = 0
    // for(var i = 2; i < 2 * len; i += 2) {
    //     var dx = x_coord[i / 2 + 1] - x_coord[i / 2]
    //     var dy = y_coord[i / 2 + 1] - y_coord[i / 2]
    //     num += Math.sqrt(dx * dx + dy * dy);
    //     //console.log(num)
    // }
    // console.log(num)
    num = 100
    for (var i = 1; i < x_coord.length - 2; i++) {
        var a = []
        var b = []
        get_coefs(i, x_coord, y_coord, a, b)
        for (var j = 0; j < num; j++) {
            var t = j / num
            var px = ((a[3] * t + a[2]) * t + a[1]) * t + a[0]
            var py = ((b[3] * t + b[2]) * t + b[1]) * t + b[0]
            ctx.lineTo(px, py)
        }
    }
    ctx.stroke()
}

draw_spline()

ctx.beginPath()
ctx.fillStyle = "white"
ctx.strokeStyle = "black"
ctx.arc(233, 400, 70, 0, 2 * Math.PI)
ctx.arc(583, 400, 70, 0, 2 * Math.PI)
ctx.fill()

ctx.beginPath()
ctx.arc(233, 400, 70, Math.PI, 2 * Math.PI)
ctx.arc(583, 400, 70, Math.PI, 2 * Math.PI)
ctx.stroke()

ctx.beginPath()
ctx.arc(233, 400, 50, 0, 2 * Math.PI)
ctx.stroke()

ctx.beginPath()
ctx.arc(583, 400, 50, 0, 2 * Math.PI)
ctx.stroke()
