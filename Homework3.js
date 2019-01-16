// JavaScript source code

//1.

//var num = 0;
//var flag = true;

//while (num <= 100) {
//    for (var i = 2; i < num; i++) {
//        if (num % i == 0) {
//            flag = false;
//            break;
//        }
//    }
//    if (flag) {
//        console.log("\n" + num);
//    }
//    num++;
//    flag = true;
//}

for (var i = 2, j = 2; i <= 100; i++ , j = 2) {
    while (i % j != 0) {
        j++
    }
    if (i == j) {
        console.log("\n" + i);
    }
}

//2-3

// а. выбор массива
// массив одномерный, но там три столбца))) [имя товара, количество, цена]
var cart = ["Товар1", 2, 100, "Товар2", 5, 200, "Товар3", 4, 300];
cart.push("Товар4", 1, 400);

// для доступа вычисляется индекс по формуле index = i*n+j, где i - строка, j - столбец, n - общее количество столбцов.
console.log(
	"Имя товара \t Количество \t Цена "
	);
for (var i = 0; i < cart.length / 3; i++){
	console.log(
	cart[i*3] + " \t " + cart[i*3+1]+ " \t\t " + cart[i*3+2]
	);
}

// б. подсчёт стоимости товаров 

res = countBasketPrice(cart);
console.log(
	"\t\t\tИтого: \t" + res
	);

function countBasketPrice(_cart) {
    var total = 0;

    for (var i = 0; i < _cart.length / 3; i++) {
        total += _cart[1+3*i] * _cart[2+3*i];
    }

	return total;
}