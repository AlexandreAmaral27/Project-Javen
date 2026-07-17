let total = 0;

function addCarrinho(){

total++;

document.getElementById("contador").innerHTML = total;

}

const btn = document.getElementById("menu-btn");

const nav = document.querySelector("nav");

btn.onclick = ()=>{

if(nav.style.display=="block"){

nav.style.display="none";

}else{

nav.style.display="block";

}

}

document.getElementById("buscar").addEventListener("keyup",function(){

let texto=this.value.toUpperCase();

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let nome=card.querySelector("h3").innerHTML.toUpperCase();

card.style.display=nome.indexOf(texto)>-1?"block":"none";

});

});