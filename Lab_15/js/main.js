var a = document.getElementById("anchor");
var b = document.querySelector("button");
var a_fake = {
	text: "На Google",
	href: "https://www.google.com"
};
b.addEventListener("click", function() {
	console.log("click!");
	var temp = a.innerHTML;
	a.innerHTML = a_fake.text;
	a_fake.text = temp;
	temp = a.href;
	a.href = a_fake.href;
	a_fake.href = temp;
});