ctx = document.querySelector("canvas").getContext("2d")

var w = 1000
var h = 700
var O_x = w / 2
var O_y = h / 2
var scale = 50
var rotate = 0
var x_shift = 0
var y_shift = 0

function draw_labels() {
    ctx.strokeStyle = "black"
    ctx.font = '12px Segoe UI';
    ctx.lineWidth = 1
    for (var x = 0; x < w; x += 50) {
        labelX = x * 0.1;
        if (x != 0) ctx.strokeText((labelX / (scale * 0.1)), w / 2 + 10 + x + x_shift, h / 2 - 5 + y_shift);
        if (x != 0) ctx.strokeText((-labelX / (scale * 0.1)), w / 2 + 10 - x + x_shift, h / 2 - 5 + y_shift);
    }
 
    for (var y = 0; y < h; y += 50) {
        labelY = y * 0.1;
        if (y != 0) ctx.strokeText((-labelY / (scale * 0.1)), w / 2 + 10 + x_shift, h / 2 - 5 + y + y_shift);
        ctx.strokeText((labelY / (scale * 0.1)), w / 2 + 10 + x_shift, h / 2 - 5 - y + y_shift);
    }
}

function axis() {
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(0, h / 2 + y_shift);
    ctx.lineTo(w, h / 2 + y_shift);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w / 2 + x_shift, 0);
    ctx.lineTo(w     / 2 + x_shift, h);
    ctx.closePath();
    ctx.stroke();
}
 
//grid X
function gridOX(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(x + x_shift, y);
    ctx.lineTo(x + 1 + x_shift, y + 1);
    ctx.closePath();
    ctx.stroke();
}
 
//grid Y
function gridOY(y, x) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(y, x + y_shift);
    ctx.lineTo(y + 1, x + 1 + transferY);
    ctx.closePath();
    ctx.stroke();
}

function gridFull() {
    
    for (var x = w / 2; x < w - x_shift; x += 50)
        for (var y = 0; y < h; y -= 5)
            gridOX(x, y);
    
    for (var x = w / 2; x < canvas.width - transferX; x += 50)
        for (var y = canvas.height / 2; y < canvas.height; y += 5)
        gridOX(x, y);
    
    for (var x = canvas.width / 2; x > 0 - transferX; x -= 50)
        for (var y = canvas.height / 2; y > 0; y -= 5)
        gridOX(x, y);
    
    for (var x = canvas.width / 2; x > 0 - transferX; x -= 50)
        for (var y = canvas.height / 2; y < canvas.height; y += 5)
        gridOX(x, y);
 
    //OX
    // right-top
    for (var x = canvas.height / 2; x < canvas.height - transferY; x += 50)
        for (var y = canvas.width / 2; y > 0; y -= 5)
            gridOY(y, x, transferX, transferY);
    // right-bottom
    for (var x = canvas.height / 2; x < canvas.height - transferY; x += 50)
        for (var y = canvas.width / 2; y < canvas.width; y += 5)
            gridOY(y, x, transferX, transferY);
    // left-top
    for (var x = canvas.height / 2; x > 0 - transferY; x -= 50)
        for (var y = canvas.width / 2; y > 0; y -= 5)
            gridOY(y, x, transferX, transferY);
    // left-bottom
    for (var x = canvas.height / 2; x > 0 - transferY; x -= 50)
        for (var y = canvas.width / 2; y < canvas.width; y += 5)
            gridOY(y, x, transferX, transferY);
}

draw_labels()
axis()  
gridFull()