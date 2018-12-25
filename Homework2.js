// JavaScript source code

// 1.
var a = 1, b = 1, c, d;

c = ++a;  // c = 2, Оператор инкремента увеличивает значение переменной на 1;
//alert(c);
window.console.log("c = ++a; - "+c);

d = b++; // d = 2, оператор инкремента увеличивает значение переменной на 1;
//alert(d);
window.console.log("d = b++; - "+d);

c = (2 + ++a);  // c = 5, Префиксный оператор инкремента инкремента возвращает значение переменной +1; 
//alert(c);
window.console.log("c = (2 + ++a); - "+c);

d = (2 + b++); // d = 4, Постфиксный оператор инкремента возвращает значение переменной до его применения;
//alert(d);
window.console.log("d = (2 + b++); - "+d);

//alert(a); // a = 3, К значению переменной два раза добавлено по 1;
//alert(b);   // b = 3, К значению переменной два раза добавлено по 1;
window.console.log("a - " + a);
window.console.log("b - " + b);

// 2.

a = 2;
var x = 1 + (a *= 2); // x=1+2*2=5;
window.console.log(" x = 1 + (a *= 2); - " + x);

// 3.

a = Math.random() * 10 > 5 ? Math.random() * 10 : -Math.random() * 10;
b = Math.random() * 10 > 5 ? Math.random() * 10 : -Math.random() * 10;

var res = randomMath(a, b);

window.console.log("RandomMath\n");
window.console.log("a: " + a);
window.console.log("b: " + b);
window.console.log("res : " + res);

function randomMath(x, y) {

    //if(x < 0 && y < 0) {

    //    return x*y;
    //}
    //else if(x>=0 && y>=0) {
    //    return x - y;
    //}

    //return x + y;

    return x < 0 && y < 0 ? x * y : x >= 0 && y >= 0 ? x - y : x + y;
}

// 4.

a = Math.round(Math.random() * 15);
window.console.log("switchPrint\n");
window.console.log("a: " + a);
switchPrint(a);

function switchPrint(n) {
    window.console.log("Ряд от " + n + "до 15\n");

    switch (n) {
        case 0: window.console.log(0);
        case 1: window.console.log(1);
        case 2: window.console.log(2);
        case 3: window.console.log(3);
        case 4: window.console.log(4);
        case 5: window.console.log(5);
        case 6: window.console.log(6);
        case 7: window.console.log(7);
        case 8: window.console.log(8);
        case 9: window.console.log(9);
        case 10: window.console.log(10);
        case 11: window.console.log(11);
        case 12: window.console.log(12);
        case 13: window.console.log(13);
        case 14: window.console.log(14);
        case 15: window.console.log(15);
    }
}

// 5.

function plus(x, y) {

    return x + y;
}

function minus(x, y) {

    return x - y;
}

function multiply(x, y) {

    return x * y;
}

function divide(x, y) {

    return x / y;
}

// 6.


function mathOperation(x, y, operation) {

    var res;

    switch (operation) {

        case plus: res = plus(x, y); break;
        case minus: res = minus(x, y); break;
        case multiply: res = multiply(x, y); break;
        case divide: res = divide(x, y); break;
        default: res = plus(x, y);
    }

    return res;
}

// 7.

null == 0 // false, 0 - это тип number, а  null - это тип object (null) и к друг другу не приводятся;

// 8.

function power(val, pow) {

    var pval = 1;
    if (pow > 0) {
        var pval = power(val, pow - 1);
    }
    else if (pow == 0) return 1;
    else return NaN;
    pval *= val;  
    //window.console.log("res: " + pval);

    return pval;
}
