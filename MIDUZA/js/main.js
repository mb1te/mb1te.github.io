function displayMenu(active){
	var list = document.createElement("ul");
	list.setAttribute("class", "navigation__ul df");
	var listTitles = ["Главная", "Услуги", "Галерея", "Прайслист", "О нас"];
	var listLinks = ["Index.html", "Lists.html", "Images.html", "Tables.html", "Text.html"];
	for (i in listTitles) {
		var li = document.createElement("li");
		li.setAttribute("class", "navigation__item");
		var a = document.createElement("a");
		if (i == active)
			a.setAttribute("class", "navigation__anchor navigation__anchor-active");
		else
			a.setAttribute("class", "navigation__anchor");
		a.setAttribute("href", listLinks[i]);
		a.innerHTML = listTitles[i];
		li.appendChild(a);
		list.appendChild(li);
		
	}					
	var parent = document.querySelector(".navigation");
	parent.appendChild(list);
}
