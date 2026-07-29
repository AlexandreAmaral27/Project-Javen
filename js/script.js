
    /* ======== ANIMAÇÃO CONTACTO ======== */

const contactCards = document.querySelectorAll(".rede, .item");

const contactObserver = new IntersectionObserver((entries)=>{

    entries.forEach((entry,index)=>{

        if(entry.isIntersecting){

            setTimeout(()=>{

                entry.target.style.opacity="1";
                entry.target.style.transform="translateY(0)";

            },index*120);

        }

    });

},{threshold:.2});

contactCards.forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(40px)";
    card.style.transition=".6s ease";

    contactObserver.observe(card);

});

/* =====================
MENU MOBILE
===================== */

const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");


menuBtn.onclick = ()=>{

    nav.classList.toggle("active");

};




/* =====================
CARRINHO
===================== */


let carrinho = [];



function addCarrinho(nome, preco){


    let produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );


    if(produtoExistente){

        produtoExistente.quantidade++;

    }else{

        carrinho.push({

            nome:nome,

            preco:preco,

            quantidade:1

        });

    }


    // Atualiza carrinho sem abrir automaticamente
    mostrarCarrinho();



    // Animação no ícone do carrinho
    const cart = document.querySelector(".cart");


    cart.animate(

    [

        {
            transform:"scale(1)"
        },

        {
            transform:"scale(1.3)"
        },

        {
            transform:"scale(1)"
        }

    ],

    {

        duration:400

    }

    );

}






function mostrarCarrinho(){


let lista = document.getElementById("listaCarrinho");


lista.innerHTML = "";


let total = 0;

let quantidadeTotal = 0;



if(carrinho.length === 0){


lista.innerHTML = `

<p>
Seu carrinho está vazio.
</p>

`;

}



carrinho.forEach((produto,index)=>{


let subtotal = produto.preco * produto.quantidade;


total += subtotal;


quantidadeTotal += produto.quantidade;



lista.innerHTML += `


<div class="produto-carrinho">


<div>


<h4>
${produto.nome}
</h4>


<p>
Quantidade: ${produto.quantidade}
</p>


<span>
${subtotal.toLocaleString('pt-PT')} Kz
</span>


</div>



<i 

class="fas fa-trash remover"

onclick="removerProduto(${index})">

</i>


</div>


`;


});





document.getElementById("total").innerHTML =

total.toLocaleString('pt-PT');




document.getElementById("contador").innerHTML =

quantidadeTotal;



}







function removerProduto(index){


carrinho.splice(index,1);


mostrarCarrinho();


}







function abrirCarrinho(){


document.getElementById("carrinho")

.classList.add("active");



document.getElementById("fundo")

.classList.add("active");


}







function fecharCarrinho(){


document.getElementById("carrinho")

.classList.remove("active");



document.getElementById("fundo")

.classList.remove("active");


}








/* =====================
FINALIZAR WHATSAPP
===================== */


function finalizarCompra(){



if(carrinho.length === 0){


alert("O carrinho está vazio!");

return;


}



let mensagem = 

"🛒 *NOVA ENCOMENDA JAVEN STORE*%0A%0A";



let total = 0;



carrinho.forEach(produto=>{


let subtotal = produto.preco * produto.quantidade;



total += subtotal;




mensagem +=

`📦 Produto: ${produto.nome}%0A`+

`🔢 Quantidade: ${produto.quantidade}%0A`+

`💰 Preço: ${produto.preco.toLocaleString('pt-PT')} Kz%0A`+

`💵 Subtotal: ${subtotal.toLocaleString('pt-PT')} Kz%0A%0A`;



});




mensagem +=

"================%0A"+

`💰 TOTAL: ${total.toLocaleString('pt-PT')} Kz`;





let numero = "244976173835";



window.open(

"https://wa.me/"+numero+"?text="+mensagem,

"_blank"

);



}








/* =====================
PESQUISA PRODUTOS
===================== */


const pesquisa = document.getElementById("buscar");



pesquisa.addEventListener("keyup",()=>{


let texto = pesquisa.value.toLowerCase();



const produtos = document.querySelectorAll(".card");



produtos.forEach(card=>{


let nome = card.querySelector("h3");



if(nome){


nome = nome.innerText.toLowerCase();



if(nome.includes(texto)){


card.style.display="block";


}

else{


card.style.display="none";


}


}


});


});








/* =====================
ANIMAÇÃO SCROLL
===================== */


const elementos = document.querySelectorAll(

".card,.info,.item,.rede"

);



const observer = new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";


}


});


});





elementos.forEach(elemento=>{


elemento.style.opacity="0";


elemento.style.transform="translateY(50px)";


elemento.style.transition="0.8s";



observer.observe(elemento);


});








/* =====================
BOTÃO COMPRAR AGORA
===================== */


const comprar = document.querySelector(".hero button");



comprar.onclick = ()=>{


document.querySelector("#produtos")

.scrollIntoView({

behavior:"smooth"

});


};




