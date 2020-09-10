var monthes = ["января", "февраля", "марта", "апреля", "мая",
"июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
var d = new Date(2019, 0, 1);
while (d.getDay() != 0)
	d.setDate(d.getDate() + 1);
do
{
	document.write(d.getDate() + " " + monthes[d.getMonth()] + "<br>");
	var cur = d.getMonth();
	do
	{
		d.setDate(d.getDate() + 7);
	} while (d.getMonth() == cur);

} while (d.getMonth() != 0);