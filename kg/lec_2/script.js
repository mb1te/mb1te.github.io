var sun = {
    img: document.getElementById("sun"),
    x: 0,
    y: 0,
    angle: 180
}
var moon = {
    img: document.getElementById("moon"),
    x: 0,
    y: 0,
    angle: 0
}

var R = 400
var ctx = document.querySelector("canvas").getContext("2d")
start()

function start() {
    requestAnimationFrame(draw)
}

function draw() {
    update(sun)
    update(moon)
    if (sun.angle > 180) {
        ctx.fillStyle = '#8da5ff'
    }
    else {
        ctx.fillStyle = '#224b'
    }
    ctx.fillRect(0, 0, 1000, 500)
    ctx.drawImage(moon.img, moon.x, moon.y, 128, 128)
    ctx.drawImage(sun.img, sun.x, sun.y, 128, 128)
    requestAnimationFrame(draw)
}

function update(obj) {
    obj.angle = (obj.angle + 1) % 360
    obj.x = 450 + R * Math.cos(obj.angle * Math.PI / 180)
    obj.y = 500 + R * Math.sin(obj.angle * Math.PI / 180)
    //console.log(obj.angle, obj.x, obj.y)
}