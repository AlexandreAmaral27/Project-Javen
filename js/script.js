
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

let taxaEntrega = 0;
let entregaAtiva = false;

function atualizarEntrega(){

    const select = document.getElementById("localEntrega");
    const valorTexto = document.getElementById("valorEntrega");

    if(!select) return;

    taxaEntrega = Number(select.value);

    const opcaoSelecionada =
        select.options[select.selectedIndex].text;

    // Outra localização
    if(opcaoSelecionada.includes("Outra localização")){

        taxaEntrega = 0;

        valorTexto.innerHTML =
            "🚚 Entrega: <strong>Preço a consultar</strong>";

        entregaAtiva = false;

    }else{

        entregaAtiva = taxaEntrega > 0;

        valorTexto.innerHTML =
            "🚚 Entrega: <strong>" +
            taxaEntrega.toLocaleString("pt-PT") +
            " Kz</strong>";
    }

    mostrarCarrinho();
}

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




let totalFinal = total + taxaEntrega;

document.getElementById("total").innerHTML =
totalFinal.toLocaleString('pt-PT');



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

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("\u{1F6D2} O carrinho está vazio!");

        return;
    }

    let totalProdutos = 0;
    let quantidadeTotal = 0;

    let mensagem =
`\u{1F6CD}\uFE0F *JAVEN STORE*
━━━━━━━━━━━━━━━━━━━━

\u{1F4CB} *NOVA ENCOMENDA*

\u{1F4E6} *PRODUTOS*
`;

    carrinho.forEach((produto, index) => {

        const subtotal =
            produto.preco * produto.quantidade;

        totalProdutos += subtotal;
        quantidadeTotal += produto.quantidade;

        mensagem += `
${index + 1}. *${produto.nome}*
   \u{1F522} Quantidade: ${produto.quantidade}
   \u{1F4B0} Preço: ${produto.preco.toLocaleString("pt-PT")} Kz
   \u{1F4B5} Subtotal: ${subtotal.toLocaleString("pt-PT")} Kz
`;
    });

    let totalFinal = totalProdutos;

    mensagem += `
━━━━━━━━━━━━━━━━━━━━
\u{1F69A} *ENTREGA*
`;

    const select =
        document.getElementById("localEntrega");

    if (select) {

        const opcaoSelecionada =
            select.options[select.selectedIndex].text;

        if (taxaEntrega > 0) {

            const local =
                opcaoSelecionada
                    .split("—")[0]
                    .trim();

            mensagem +=
`\u{1F4CD} Local: ${local}
\u{1F4B8} Taxa de entrega: ${taxaEntrega.toLocaleString("pt-PT")} Kz
`;

            totalFinal += taxaEntrega;

        } else if (
            opcaoSelecionada.includes("Outra localização")
        ) {

            mensagem +=
`\u{1F4CD} Local: Outra localização
\u{1F4B8} Taxa de entrega: Preço a consultar
`;

        } else {

            mensagem +=
`\u{1F3EA} Método: Levantamento na Loja
`;
        }
    }

    mensagem += `
━━━━━━━━━━━━━━━━━━━━
\u{1F4CA} *RESUMO DA ENCOMENDA*

\u{1F4E6} Produtos: ${quantidadeTotal}
\u{1F4B0} Produtos: ${totalProdutos.toLocaleString("pt-PT")} Kz
`;

    if (taxaEntrega > 0) {

        mensagem +=
`\u{1F69A} Entrega: ${taxaEntrega.toLocaleString("pt-PT")} Kz
`;
    }

    mensagem +=
`
━━━━━━━━━━━━━━━━━━━━
\u{1F4B3} *TOTAL: ${totalFinal.toLocaleString("pt-PT")} Kz*
━━━━━━━━━━━━━━━━━━━━

\u{23F3} *Status:* \u{1F7E1} Aguardando confirmação

\u{1F64F} Obrigado por escolher a *JAVEN STORE*!
`;

    const numero = "244976173835";

    const mensagemCodificada =
        encodeURIComponent(mensagem);

    window.open(
        `https://wa.me/${numero}?text=${mensagemCodificada}`,
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


    
    const filtro = document.getElementById("filtroCategoria");

filtro.addEventListener("change", () => {

    const categoria = filtro.value;
    const cards = document.querySelectorAll(".produtos .card");

    cards.forEach(card => {

        if(
            categoria === "todos" ||
            card.dataset.categoria === categoria
        ){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});