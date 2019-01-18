// JavaScript source code

var list = new List(new Array(1, 2, 3, 4, 5));//new List(1);
list.push(2);
list.push(3);
list.print();

function List(input){

    this.length = 0;
    var visio = this;

    var node = function(v){
        this.value = null;
        this.next = null;
        if (v) this.value = v;
    }
    
    var head = null;

    //if (input instanceof Array) {
    //    for (var el in input) {
    //        visio.push(el);
    //    }
    //} else if(input) {
    //    head = new node(input);
    //}
        
    

    this.push = function(v) {

        if (!head) {
            head = new node(v);
        } else {
            p = head.next;
            n = head;
            while (p) {
                n = p;
                p = p.next;
            }
            n.next = new node(v);
        }
    };
    this.print = function () {
        if (head) {
            var p = head.next;
            var n = head;
            while (p) {
                console.log(n.value);
                n = p;
                p = p.next;
            }
            console.log(n.value);
        }
    }

    if (input instanceof Array) {
        for(var el in input) {
            visio.push(input[el]);
        }
    } else if (input) {
        head = new node(input);
    }
}