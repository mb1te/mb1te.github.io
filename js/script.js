function menuCreator(){
	var menuDiv = document.getElementsByClassName("menu")[0];
	var ulTag = document.createElement("ul");
	var menuItems = ["Главная", "Текст", "Списки", "Таблица", "Изображения"];
	var links = ["index.html", "text.html", "lists.html", "table.html", "images.html"];
	for (var i = 0; i < 5; i++) {
		var currentLi = document.createElement("li");
		currentLi.innerHTML = "<a href='" + links[i] + "'>" + menuItems[i] + "</a>";
		currentLi.setAttribute("style", "left: " + (350 + 50*i) + "px;");
		ulTag.appendChild(currentLi);
	}
	menuDiv.appendChild(ulTag);
}