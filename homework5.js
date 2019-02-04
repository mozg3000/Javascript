var tag = {

    tag: document.getElementById("chess"),

    addField: function(_classname, _text, _rotate){

        var div = document.createElement('div');
        div.classList.add(_classname);
        if(_rotate === "rotate"){

            div.classList.add("rotate");
        }
        div.textContent=_text;

        this.tag.appendChild(div);

    },


    addTitleA: function(){

        var juk = 8;

        return function(){

            return juk--;
        }
    },

    addTitleB: function(){

        var i = 65;

        return function(){

            return  String.fromCharCode(i++);
        }
    }
};

var count_left      = tag.addTitleA();
var count_right     = tag.addTitleA();
var letters_bottom  = tag.addTitleB();
var letters_top     = tag.addTitleB();

for(var i=0;i<10;++i){



    for(var j=0; j<11; ++j){

        if(i>0 && i<9 && j>0 && j<9){

            tag.addField("field","");

        }else if(i===0 && (j>0 && j<9)){

            // var letters = addTitleB();
            tag.addField("title",letters_top(),"rotate");

        }else if(j===0 && (i>0 && i<9)){

            // var titleA_top = addTitleA();
            tag.addField("title",count_left());

        }else if(j===9 && (i>0 && i<9)){

            // var titleA_bottom = addTitleA();
            tag.addField("title",count_right(),"rotate");

        }else if(i===9 && (j>0 && j<9)){

            // var letters_bottom = addTitleB();
            tag.addField("title",letters_bottom());

        }else{
            tag.addField("title","");
        }
    }
}
