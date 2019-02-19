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
Конструктор html-разметки
 */
function makeCell(_name, _classnames, _text, _children){
   return {
        name: _name,
        classnames: _classnames,
        text:_text,
        children:_children
    };
}
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
    },
    /*
    Изменение количества
     */
    changeQuantity: function(_item2change, _new_quantity){

        var productIndex = this.cart.findIndex((x)=>x.product.name==_item2change);
        this.cart[productIndex].quantity = _new_quantity;
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
    Создание строчки в корзине
    _nodes = {
        name: String(),
        classnames: Array(String()),
        text: String()
        children: Array(_nodes)
    }
    */
    makeItem: function(_nodes, _parent){

        var cell;
        _nodes.forEach(node =>
        {

            if(node){
                cell = this.makeDiv(node.name, node.classnames, node.text);

                if(node.children){
                    this.makeItem(node.children, cell);
                }
            }
            _parent.appendChild(cell);
        });
        //return id;
    },

    /*
    Отрисовка корзины
    */
    render: function (_cart) {

        this.clear();
        if (_cart && _cart.length > 0) {

            this.makeTitle();
            /*
            * Построение корзины построчно (Item)
            */
            _cart.forEach(good =>
                {
                    var item = this.makeDiv("div", ["item"]);
                    this.makeItem([
                        makeCell("div", ["column", "name"],     "", [makeCell("h3",     ["product_name"], good.product.name, null)]),
                        makeCell("div", ["column", "quantity"], "", [makeCell("input",  ["product_quantity"], good.quantity, null)]),
                        makeCell("div", ["column", "price"],    "", [makeCell("p",      null, good.product.price, null)]),
                        makeCell("div", ["column", "sum"],      "", [makeCell("p",      null, good.sum(), null)]),
                        makeCell("div", ["column", "sum"],      "", [makeCell("input",  ["delete_cart_item"], "", null)]),
                    ], item);

                    var delete_btn = item.getElementsByClassName("delete_cart_item")[0];
                    delete_btn.setAttribute("type","button");
                    delete_btn.setAttribute("value","Удалить");

                    var input_quantity = item.getElementsByClassName("product_quantity")[0];
                    input_quantity.setAttribute("type","number");
                    input_quantity.setAttribute("value", good.quantity);
                    input_quantity.addEventListener("change", inputQuantityChange);
                    item.addEventListener("click", deleteProductHandler);

                    this.content.appendChild(item);
                }
            );
            /*
            * Последняя строчка - "Итого"
            */
            var item = this.makeDiv("div", ["item"]);
            this.makeItem([
                makeCell("div", ["column", "sum"], "", [makeCell("h3", null, "Итого: " + _cart.reduce((total, item) => total + item.sum(), 0), null)])
            ], item);

            this.content.appendChild(item);

        } else {

            var item = this.makeDiv("div", ["item"]);
            item.textContent = "Корзина пуста";
            this.content.appendChild(item);
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

    /*
    Добавлени товара в корзину
     */
    addProduct: function (e) {

        model.add(e.target.id - 1);
        view.render(model.cart);
    },
    /*
    Удаление определённого товара из корзины
     */
    deleteProduct: function (e) {

        if(e.target.className == "delete_cart_item"){

            var item2Delete = e.currentTarget.getElementsByClassName("product_name")[0].textContent;
            e.currentTarget.innerHTML="";
            model.delete(item2Delete);
            view.render(model.cart);
        }
        e.preventDefault();
    },
    /*
    Изменение количества определённого товара в корзине
    */
    inputQuantityChange: function(e){

        var new_quantity = e.target.value;
        var item2change = e.target.parentNode.parentNode.getElementsByClassName("product_name")[0].textContent;
        e.stopPropagation();
        model.changeQuantity(item2change, new_quantity);
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
Срабатывает при изменении количества
 */
function inputQuantityChange(e) {

    controller.inputQuantityChange(e);
}

/*
Runtime код
*/
view.render(model.cart);

var wrapper = document.getElementById("wrapper");
var product_template = document.getElementById("product_template");

/*
Отрисовка каталога товаров
 */
for (var i = 0; i < cart.length; ++i) {

    var new_product = product_template.cloneNode(true);
    new_product.classList.add("line");
    new_product.setAttribute("id", "prod" + i);
    new_product.children[0].setAttribute("src", "img/img" + (i + 1) + ".jpg");
    new_product.children[1].setAttribute("id",  i+1);
    new_product.children[1].setAttribute("value", cart[i].product.name);

    wrapper.appendChild(new_product);
}

var p = document.body.getElementsByClassName("line");
Array.from(p).forEach(x => x.addEventListener("click", addProductHandler));
/*
Работа с аккардеоном
 */
var cart_header = document.body.getElementsByClassName("cart_wrapper")[0];
cart_header.addEventListener("click", toggleDiv);
var cart2delivery = document.body.getElementsByClassName("delivery_wrapper")[0];
cart2delivery.addEventListener("click", toggleDiv);

/*
Обработчик аккардеона
 */
function toggleDiv(e){
    /*
    выбор родительского контейнера
     */
    switch(e.currentTarget.classList[0]){

        case "cart_wrapper": {

            /*
            выбор внутреннего элемента
             */
            if(e.target.tagName == "H3" && e.target.parentNode.className == "cart_wrapper"){

                document.getElementById("cart").classList.toggle("none");
                e.currentTarget.getElementsByClassName("cart2delivery")[0].classList.toggle("none");

            }else if(e.target.tagName == "INPUT" && e.target.type == "button" && e.target.parentNode.className == "cart_wrapper"){

                document.getElementById("cart").classList.toggle("none");
                e.currentTarget.getElementsByClassName("cart2delivery")[0].classList.toggle("none");
                document.getElementById("delivery").classList.toggle("none");
                document.getElementsByClassName("delivary2comments")[0].classList.toggle("none");
            }
            break;
        }
        case "delivery_wrapper": {

            if(e.target.tagName == "H3"){

                document.getElementById("delivery").classList.toggle("none");
                e.currentTarget.getElementsByClassName("delivary2comments")[0].classList.toggle("none");

            }else if(e.target.tagName == "INPUT" && e.target.type == "button"){

                document.getElementById("delivery").classList.toggle("none");
                e.currentTarget.getElementsByClassName("delivary2comments")[0].classList.toggle("none");
                document.getElementById("order").classList.toggle("none");
                document.getElementsByClassName("cart_order")[0].classList.toggle("none");
            }
            break;
        }
    }
}
