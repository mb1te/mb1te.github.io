var prime = Array(31);
//prime[i] = 0, если число простое и 1, если число составное
prime[0] = 1;
prime[1] = 1;
for (var i = 2; i < prime.length; prime[i++] = 0);
for (var i = 2; i * i < prime.length; i++)
{
	for (var j = i * i; j < prime.length; j += i)
		prime[j] = 1;
}

//вывод
var str = "2";
for (var i = 3; i < prime.length; i++)
{
	if (prime[i] == 0)
		str = str + " " + i;
}
alert(str);