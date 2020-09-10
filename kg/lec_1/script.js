canvas = document.getElementById('canvas');
c = canvas.getContext('2d');
c.fillRect(0, 0, window.innerWidth, window.innerHeight)

c.beginPath()

c.moveTo(388,618);
c.quadraticCurveTo(100,570,5,175);
c.quadraticCurveTo(370,295,388,618);

c.moveTo(450, 620)
c.quadraticCurveTo(265,315,455,5);
c.quadraticCurveTo(640,315,450,620);

c.moveTo(515,618);
c.quadraticCurveTo(803,570,898,175);
c.quadraticCurveTo(533,295,515,618);

c.fillStyle = "white"
c.fill();

c.fillStyle = "black"
for (i = 0; i < 3; i++) {
    let x = 50, y = 375 + 70 * i
    c.fillRect(x,y,800,35)
}

c.fillStyle = "white"
for (i = 0; i < 2; i++) {
    let x = 150 + 65 * i, y = 410 + 70 * i
    c.fillRect(x,y,600 - 100 * i, 35)
}