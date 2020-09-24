canvas = document.querySelector("canvas")
ctx = canvas.getContext("2d")


start_x = 30, start_y = 400

mx = [30, 60, 130, 170, 300, 340, 440, 440]
my = [350, 325, 320, 270, 270, 320, 325, 400]

lcx = 130, lcy = 400
rcx = 350, rcy = 400

wfx = [172, 225, 225]
wfy = [277, 277, 325]
start_wfx = 137, start_wfy = 325

wsx = [235, 296, 334]
wsy = [277, 277, 325]
start_wsx = 235, start_wsy = 325

shift = 0, dx = -3

function draw() {

    update()
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 1000, 500)

    ctx.beginPath();
    ctx.fillStyle = "black"
    ctx.moveTo(start_x + shift, start_y)
    for (i = 0; i < mx.length; i++) {
        ctx.lineTo(mx[i] + shift, my[i])
    }
    ctx.fill();

    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.arc(lcx + shift, lcy, 35, 0, 2 * Math.PI)
    ctx.arc(rcx + shift, rcy, 35, 0, 2 * Math.PI)
    ctx.fill()

    lcx = 130, lcy = 400
    rcx = 350, rcy = 400
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.arc(lcx + shift, lcy, 27, 0, 2 * Math.PI)
    ctx.arc(rcx + shift, rcy, 27, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.moveTo(start_wfx + shift, start_wfy)
    for (i = 0; i < wfx.length; i++) {
        ctx.lineTo(wfx[i] + shift, wfy[i])
    }
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.moveTo(start_wsx + shift, start_wsy)
    for (i = 0; i < wsx.length; i++) {
        ctx.lineTo(wsx[i] + shift, wsy[i])
    }
    ctx.fill()
    requestAnimationFrame(draw)
}

function start() {
    reflect()
    requestAnimationFrame(draw)
}

function update() {
    if (start_x + shift <= canvas.width && start_x + shift >= 0) shift += dx
}

function reflect() {
    len_x = 410
    for (i = 0; i < mx.length; i++) {
        mx[i] = len_x - mx[i]
    }
    for (i = 0; i < wfx.length; i++) {
        wfx[i] = len_x - wfx[i]
        wsx[i] = len_x - wsx[i]
    }
    start_x = len_x - start_x
    lcx = len_x - lcx
    rxc = len_x - rcx
    start_wfx = len_x - start_wfx
    start_wsx = len_x - start_wsx
    dx *= -1
}
start()