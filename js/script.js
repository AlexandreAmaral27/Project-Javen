
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

        alert(
            String.fromCodePoint(0x1F6D2) +
            " O carrinho está vazio!"
        );

        return;
    }


    /* =====================
       EMOJIS
       Gerados pelo JavaScript
       para evitar problemas de codificação
    ===================== */

    const emoji = {

        loja: String.fromCodePoint(0x1F6CD, 0xFE0F),

        lista: String.fromCodePoint(0x1F4CB),

        caixa: String.fromCodePoint(0x1F4E6),

        numero: String.fromCodePoint(0x1F522),

        dinheiro: String.fromCodePoint(0x1F4B0),

        dinheiro2: String.fromCodePoint(0x1F4B5),

        entrega: String.fromCodePoint(0x1F69A),

        local: String.fromCodePoint(0x1F4CD),

        pagamento: String.fromCodePoint(0x1F4B8),

        lojaFisica: String.fromCodePoint(0x1F3EA),

        grafico: String.fromCodePoint(0x1F4CA),

        cartao: String.fromCodePoint(0x1F4B3),

        espera: String.fromCodePoint(0x23F3),

        status: String.fromCodePoint(0x1F7E1),

        obrigado: String.fromCodePoint(0x1F64F)

    };


    let totalProdutos = 0;

    let quantidadeTotal = 0;


    /* =====================
       CABEÇALHO
    ===================== */

    let mensagem =
`${emoji.loja} *JAVEN STORE*
━━━━━━━━━━━━━━━━━━━━

${emoji.lista} *NOVA ENCOMENDA*

${emoji.caixa} *PRODUTOS*
`;


    /* =====================
       PRODUTOS
    ===================== */

    carrinho.forEach((produto, index) => {

        const subtotal =
            produto.preco * produto.quantidade;


        totalProdutos += subtotal;

        quantidadeTotal += produto.quantidade;


        mensagem += `
${index + 1}. *${produto.nome}*
   ${emoji.numero} Quantidade: ${produto.quantidade}
   ${emoji.dinheiro} Preço: ${produto.preco.toLocaleString("pt-PT")} Kz
   ${emoji.dinheiro2} Subtotal: ${subtotal.toLocaleString("pt-PT")} Kz
`;

    });


    let totalFinal = totalProdutos;


    /* =====================
       ENTREGA
    ===================== */

    mensagem += `
━━━━━━━━━━━━━━━━━━━━
${emoji.entrega} *ENTREGA*
`;


    const select =
        document.getElementById("localEntrega");


    if (select) {

        const opcaoSelecionada =
            select.options[select.selectedIndex].text;


        /* ENTREGA COM PREÇO */

        if (taxaEntrega > 0) {

            const local =
                opcaoSelecionada
                    .split("—")[0]
                    .trim();


            mensagem +=
`${emoji.local} Local: ${local}
${emoji.pagamento} Taxa de entrega: ${taxaEntrega.toLocaleString("pt-PT")} Kz
`;


            totalFinal += taxaEntrega;

        }


        /* OUTRA LOCALIZAÇÃO */

        else if (
            opcaoSelecionada.includes("Outra localização")
        ) {

            mensagem +=
`${emoji.local} Local: Outra localização
${emoji.pagamento} Taxa de entrega: Preço a consultar
`;

        }


        /* LEVANTAMENTO */

        else {

            mensagem +=
`${emoji.lojaFisica} Método: Levantamento na Loja
`;

        }

    }


    /* =====================
       RESUMO
    ===================== */

    mensagem += `
━━━━━━━━━━━━━━━━━━━━
${emoji.grafico} *RESUMO DA ENCOMENDA*

${emoji.caixa} Produtos: ${quantidadeTotal}
${emoji.dinheiro} Produtos: ${totalProdutos.toLocaleString("pt-PT")} Kz
`;


    if (taxaEntrega > 0) {

        mensagem +=
`${emoji.entrega} Entrega: ${taxaEntrega.toLocaleString("pt-PT")} Kz
`;

    }


    /* =====================
       TOTAL
    ===================== */

    mensagem +=
`
━━━━━━━━━━━━━━━━━━━━
${emoji.cartao} *TOTAL: ${totalFinal.toLocaleString("pt-PT")} Kz*
━━━━━━━━━━━━━━━━━━━━

${emoji.espera} *Status:* ${emoji.status} Aguardando confirmação

${emoji.obrigado} Obrigado por escolher a *JAVEN STORE*!
`;


    /* =====================
       WHATSAPP
    ===================== */

    const numero = "244976173835";


    const mensagemCodificada =
        encodeURIComponent(mensagem);


    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        mensagemCodificada;


    window.open(url, "_blank");

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