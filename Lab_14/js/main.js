var a = document.getElementById('anchor');
var str;				
for (var prop in a) {
    str += prop + ": " + a[prop] + "<br>";
}
document.writeln("Свойства и значения <a> c id=\"anchor\"");
document.write(str);