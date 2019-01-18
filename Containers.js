// JavaScript source code



function List(input){

    this.length = 0;

    var node = function(v){
        var value = null;
        var next = null;
        if (v) value = v;
    }
    
    var head = null;

    if (input instanceof Array) {

    } else if(input) {
        head = new node(input);
    }
        
    

    this.push = function(v) {
        if (!head) {
            head = new node(v);
        } else {
            p = head.next;
            while (p) {

            }
        }
    };
}