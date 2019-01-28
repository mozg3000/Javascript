// JavaScript source code


// 1. 
//  математическое решение

//function devisionBlender(number) {

//    var o = new Object();

//    for (var d = 10, j = 1, r = number; r >= d/10; j++ , r -= r % d, d *= 10) {
//        o["10^" + j] = (r % d) / (d / 10);
//    }

//    return o;
//}

// читерское решение, через строки

function devisionBlender(number) {

    var o = new Object();
    var str = String(number);

    for (var i = 0, j = str.length; i < str.length; i++, j--) {
        o["10^" + j] = str[i];
    }

    return o;
}

console.log(devisionBlender(9512357));


// 2


//var cart = new Array(
//    {
//        "quantity": 2,
//        "product": {
//            "name": "Product1",
//            "price": 100
//        },
//        sum: function () {
//            return this.quantity * this.product.price;
//        }
//    },
//    {
//        "quantity": 6,
//        "product": {
//            "name": "Product2",
//            "price": 200
//        },
//        sum: function () {
//            return this.quantity * this.product.price;
//        }
//    },
//    {
//        "quantity": 5,
//        "product": {
//            "name": "Product3",
//            "price": 300
//        },
//        sum: function () {
//            return this.quantity * this.product.price;
//        }
//    },
//    {
//        "quantity": 1,
//        "product": {
//            "name": "Product4",
//            "price": 400
//        },
//        sum: function () {
//            return this.quantity * this.product.price;
//        }
//    }
//)

//var total_price = cart.reduce((total, item) => total + item.sum(), 0);

//console.log("Total price: " + total_price);


function Product(name, price) {

    var o = Object.create(null);
    o.name = name;
    o.price = price;

    return o;
}

function Item(name, price, quantity) {

    var item_template = {

        sum: function () {
            return this.quantity * this.product.price;
        }
    };

    var item = Object.create(item_template);

    item.product = Product(name, price);
    item.quantity = quantity;

    return item;
}

var cart = new Array(
    Item("Product1", 1234, 2),
    Item("Product2", 2347, 6),
    Item("Product3", 3478, 3),
    Item("Product4", 41234, 1),
    Item("Product5", 5678, 5),
    Item("Product6", 6483, 2)
);

var total_price = cart.reduce((total, item) => total + item.sum(item.quantity), 0);
console.log("Total price: " + total_price);
