// MUDA PARA O TEU NÚMERO
const numero = "2449XXXXXXXX";

const carrinho =
JSON.parse(localStorage.getItem("carrinho")) || [];

const lista = document.getElementById("listaProdutos");

let total = 0;

carrinho.forEach(produto=>{

total += produto.preco * produto.quantidade;

lista.innerHTML += `
<div class="item">
<span>${produto.nome} x${produto.quantidade}</span>
<span>${produto.preco*produto.quantidade} Kz</span>
</div>
`;

});

document.getElementById("total").innerHTML =
total.toLocaleString()+" Kz";

function enviarWhats(){

const nome =
document.getElementById("nome").value;

const telefone =
document.getElementById("telefone").value;

const morada =
document.getElementById("morada").value;

const obs =
document.getElementById("obs").value;

let mensagem =
`🛍 *NOVO PEDIDO - JAVEN*%0A%0A`;

mensagem += `👤 Nome: ${nome}%0A`;
mensagem += `📞 Telefone: ${telefone}%0A`;
mensagem += `📍 Morada: ${morada}%0A%0A`;

mensagem += `🛒 *Produtos*%0A`;

carrinho.forEach(produto=>{

mensagem += `• ${produto.nome}%0A`;
mensagem += `Qtd: ${produto.quantidade}%0A`;
mensagem += `Preço: ${produto.preco} Kz%0A%0A`;

});

mensagem += `💰 Total: ${total.toLocaleString()} Kz%0A%0A`;

mensagem += `📝 Observações:%0A${obs}`;

window.open(
`https://wa.me/${numero}?text=${mensagem}`,
"_blank"
);

}







carrinho



let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || [];

function addCarrinho(nome,preco){

const existe =
carrinho.find(item=>item.nome===nome);

if(existe){

existe.quantidade++;

}else{

carrinho.push({

nome:nome,

preco:preco,

quantidade:1

});

}

localStorage.setItem("carrinho",
JSON.stringify(carrinho));

}