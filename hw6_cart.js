/*
Конструктор продукта
*/
function Product(name, price) {

    var o = Object.create(null);
    o.name = name;
    o.price = price;

    return o;
}
/*
Конструктор элемента корзины
*/
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

/*
каталог
*/
var cart = new Array(

    Item("Product1", 1234, 2),
    Item("Product2", 2347, 6),
    Item("Product8", 3478, 3),
    Item("Product4", 41234, 1),
    Item("Product45", 5678, 5),
    Item("Product6", 6483, 2),
    Item("Product7", 1234, 2),
    Item("Product34", 3478, 3),
    Item("Product53", 5678, 5),
    Item("Product69", 6483, 2)
);
/*
Работа с данными
*/
var model = {

    cart: Array(),

    /*
    Добавление в корзину
    */
    add: function (_item_index) {

        if (cart[_item_index].quantity) {

            var productIndex = this.cart.findIndex((x) => x.product.name == cart[_item_index].product.name);

            if (productIndex === -1) {

                this.cart.push(Item(cart[_item_index].product.name,cart[_item_index].product.price,1));
                cart[_item_index].quantity -= 1;
            } else {

                this.cart[productIndex].quantity += 1;
                cart[_item_index].quantity -= 1;
            }
        }else{

            alert("Товара не будет, товара нет!")
        }
    },
    /*
    Удаление из корзины
    */
    delete: function(_item2Delete){

        var productIndex = this.cart.findIndex((x)=>x.product.name==_item2Delete);

        if(productIndex !== -1){

            var index_c = cart.findIndex((x)=>x.product.name==_item2Delete);
            cart[index_c].quantity += this.cart[productIndex].quantity;
            this.cart.splice(productIndex, 1);
        }
    }
};
/*
Работа с графикой
*/
var view = {

    content: document.getElementById("cart"),
    /*
    Создание Html-элементов
    */
    makeDiv: function (_el, _classname, _text) {

        var div = document.createElement(_el);

        if (_classname) {

            for (var i = 0; i < _classname.length; ++i) {
                div.classList.add(_classname[i]);
            }
        }
        if (_text) {

            div.textContent = _text;
        }
        return div;
    },
    /*
    Отрисовка шапки корзины
    */
    makeTitle: function () {

        var d = this.makeDiv("div", ["item"]);
        var titles = ["Наименование", "Количество", "Цена", "Всего"];
        var classes = ["name", "quantity", "price", "sum"];

        for (var j = 0; j < titles.length; ++j) {

            var id = this.makeDiv("div", ["column", classes[j]]);
            var h = this.makeDiv("h3", null, titles[j]);
            id.appendChild(h);
            d.appendChild(id);

        }
        var id = this.makeDiv("div", ["column", classes[3]]);
        var h = this.makeDiv("h3", null, "Удалить");
        id.appendChild(h);
        d.appendChild(id);

        this.content.appendChild(d);
    },
    /*
    Отрисовка корзины
    */
    render: function (_cart) {

        this.clear();
        if (_cart && _cart.length > 0) {

            this.clear();
            var classes = ["name", "quantity", "price", "sum"];
            this.makeTitle();

            for (var i = 0; i < _cart.length; ++i) {

                var d = this.makeDiv("div", ["item"]);
                var id = this.makeDiv("div", ["column", classes[0]]);
                var h = this.makeDiv("h3", null, _cart[i].product.name);
                id.appendChild(h);
                d.appendChild(id);

                var id = this.makeDiv("div", ["column", classes[1]]);
                var p = this.makeDiv("p", null, _cart[i].quantity);
                id.appendChild(p);
                d.appendChild(id);

                var id = this.makeDiv("div", ["column", classes[2]]);
                var p = this.makeDiv("p", null, _cart[i].product.price);
                id.appendChild(p);
                d.appendChild(id);

                var id = this.makeDiv("div", ["column", classes[3]]);
                var p = this.makeDiv("p", null, _cart[i].sum());
                id.appendChild(p);
                d.appendChild(id);

                var id = this.makeDiv("div", ["column", classes[3]]);
                var input = this.makeDiv("input", null, "Удалить");
                input.setAttribute("type","button");
                input.setAttribute("value","Удалить");
                input.addEventListener("click",deleteProductHandler);
                id.appendChild(input);
                d.appendChild(id);

                this.content.appendChild(d);
            }

            var d = this.makeDiv("div", ["item"]);
            var id = this.makeDiv("div", ["column", classes[3]]);
            var h3 = this.makeDiv("h3", null, "Итого: " + _cart.reduce((total, item) => total + item.sum(), 0));
            id.appendChild(h3);
            d.appendChild(id);

            this.content.appendChild(d);

        } else {

            var d = this.makeDiv("div", ["item"]);
            d.textContent = "Корзина пуста";
            this.content.appendChild(d);
        }
    },

    clear: function () {

        this.content.innerHTML = "";
    }
};
/*
Работа со взаимодействием
*/
var controller = {

    addProduct: function (e) {

        model.add(e.target.id - 1);
        view.render(model.cart);
    },
    deleteProduct: function (e) {

        var item2Delete = e.target.parentNode.parentNode.firstChild.firstChild.textContent;
        e.target.parentNode.parentNode.innerHTML="";
        model.delete(item2Delete);
        view.render(model.cart);
    }
};

/*
Обработчики
*/
function addProductHandler(e) {

    controller.addProduct(e);
}
function deleteProductHandler(e){

    controller.deleteProduct(e);
}
/*
Runtime код
*/
view.render(model.cart);

var wrapper = document.getElementById("wrapper");
var product_template = document.getElementById("product_template");

for (var i = 0; i < cart.length; ++i) {

    var new_product = product_template.cloneNode(true);
    new_product.classList.add("line");
    new_product.setAttribute("id", "prod" + i);
    new_product.children[0].setAttribute("src", "img/img" + (i + 1) + ".jpg");
    new_product.children[1].setAttribute("id", i+1);
    new_product.children[1].setAttribute("value", cart[i].product.name);

    wrapper.appendChild(new_product);
}
var p = document.body.getElementsByClassName("line");
Array.from(p).forEach(x => x.addEventListener("click", addProductHandler));


