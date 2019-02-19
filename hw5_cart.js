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

var view = {

    content: document.getElementById("cart"),

    makeDiv: function(_el,_classname,_text){

        var div = document.createElement(_el);
        if(_classname){

            for(var i=0; i<_classname.length; ++i){
                div.classList.add(_classname[i]);
            }
        }
        if(_text){

            div.textContent = _text;
        }
        return div;
    },

    makeTitle: function(){

        var d = this.makeDiv("div",["item"]);
        var titles = ["Наименование","Количество","Цена","Всего"];
        var classes = ["name","quantity","price","sum"];
        for(var j=0; j<titles.length;++j){

            var id = this.makeDiv("div",["column",classes[j]]);
            var h = this.makeDiv("h3",null,titles[j]);
            id.appendChild(h);
            d.appendChild(id);

        }
        this.content.appendChild(d);
    },

    render: function(_cart){

        if(_cart){

            var classes = ["name","quantity","price","sum"];
            this.makeTitle();
            for(var i=0 ; i<_cart.length; ++i){

                var d = this.makeDiv("div",["item"]);
                var id = this.makeDiv("div",["column",classes[0]]);
                var h = this.makeDiv("h3",null,_cart[i].product.name);
                //var h = this.makeDiv("h3",null,_cart[i].product.name);
                id.appendChild(h);
                d.appendChild(id);

                var id = this.makeDiv("div",["column",classes[1]]);
                var p = this.makeDiv("p",null,_cart[i].quantity);
                id.appendChild(p);
                d.appendChild(id);

                var id = this.makeDiv("div",["column",classes[2]]);
                var p = this.makeDiv("p",null,_cart[i].product.price);
                id.appendChild(p);
                d.appendChild(id);

                var id = this.makeDiv("div",["column",classes[3]]);
                var p = this.makeDiv("p",null,_cart[i].sum());
                id.appendChild(p);
                d.appendChild(id);

                this.content.appendChild(d);
            }

            var d = this.makeDiv("div",["item"]);
            var id = this.makeDiv("div",["column",classes[3]]);
            var h3 = this.makeDiv("h3",null,"Итого: "+_cart.reduce((total, item) => total + item.sum(), 0));
            id.appendChild(h3);
            d.appendChild(id);

            this.content.appendChild(d);

        }else{

            var d = this.makeDiv("div",["item"]);
            d.textContent = "Корзина пуста"
            this.content.appendChild(d);
        }
    }

};

//var view = new cartUI();

view.render(cart);

/* var vcnt = document.getElementById('cart');
var div = document.createElement('div');
var h3 = document.createElement('h3');
h3.textContent= "Корзина пуста";
div.appendChild(h3);
vcnt.appendChild(div); 

function makeDiv(_el,_classname){
  
    var div = document.createElement('_el');
    if(_classname && _classname instanceof Array){
    
      for(var el in _classname){
        div.classList.add(el);
      }
    }
    return div;
  } */
  