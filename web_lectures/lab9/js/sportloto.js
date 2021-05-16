function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

let generated = [];
for (i = 1; i <= 5; i++) {
    let x = getRandomIntInclusive(1, 36);
    while (generated.includes(x)) x = getRandomIntInclusive(1, 36);
    generated.push(x);
}

let selected = [];
let cnt = 0;

function onButtonClick(id) {
    if (selected.length == 5) {
        $('#modal').modal('show');
        return;
    }
    if (selected.includes(id)) {
        return;
    }
    let obj = document.getElementsByTagName("button")[id - 1];
    if (generated.includes(id)) {
        obj.classList.remove("btn-primary");
        obj.classList.add("btn-success");
        cnt++;
    }
    else {
        obj.classList.remove("btn-primary");
        obj.classList.add("btn-danger");
    }
    selected.push(id);
    if (selected.length == 5) {
        document.getElementsByClassName('modal-body')[0].innerText = "Угадано чисел: " + cnt.toString() + "!";
        $('#modal').modal('show');
        return;
    }
}

let body = document.body;

let container = document.createElement('div');
container.className = "container col-5 mt-5 text-center";

for (i = 1; i <= 6; i++) {
    let row = document.createElement('div');
    row.className = "row";
    for (j = 1; j <= 6; j++) {
        let col = document.createElement('div');
        col.style = "height: 70px; width: 102px;";
        let btn = document.createElement('button');
        btn.className = "btn btn-primary btn-lg btn-block custom";
        let number = (i - 1) * 6 + j;
        btn.innerText = number.toString();
        btn.onclick = () => onButtonClick(number);
        col.append(btn);
        row.append(col);
    }
    container.append(row);
}

modal = document.getElementById('modal');
body.insertBefore(container,body.querySelector('div'));
