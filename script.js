let nome;
let todasasmensagens;
enviarnome()
function enviarnome(){
    nome = {
        name: prompt("Qual o seu nome?")
    };
    let promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
    promisse.then(setInterval(manteronline, 5000));
    promisse.then(setInterval(renderizarmensagens, 3000))
    promisse.catch(tratarerro);
}

function tratarerro(erro){
    let tipo = erro.response.status
    if (tipo === 400){
        alert("Nome já utilizado")
        enviarnome()
    }
}

function manteronline(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
}

function renderizarmensagens(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promisse.then(escrevermensagens);
}
function escrevermensagens(mensagens){
    todasasmensagens = mensagens.data
    const localmensagens = document.querySelector(".mensagens")
    localmensagens.innerHTML = ""
    for (let i= 0; i < (todasasmensagens.length-1); i++) {
        let element = todasasmensagens[i];
        if (element.type === "message"){
            localmensagens.innerHTML += `<div class="caixa todos"> <p>(${element.time})</p> ${element.from} <h1>para</h1> Todos: <h1>${element.text}</h1> </div>`
        }
        if (element.type === "status"){
            localmensagens.innerHTML += `<div class="caixa entrou"> <p>(${element.time})</p> ${element.from} <h1>${element.text}</h1></div>`
        }
        
        atualizarmensagens()
    }
}
function atualizarmensagens(){
    const novobloco = document.querySelector(".mensagens")
    novobloco.scrollIntoView({block: "end"})
}
function enviarmensagem(){
    const textomensagem = document.querySelector(".escrito").value;
    const novamensagem = {
            from: `${nome.name}`,
            to: "Todos",
            text: `${textomensagem}`,
            type: "message",
    }
    let promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novamensagem)
    promessa.then(renderizarmensagens)
    promessa.catch(atualizarpagina)
}
console.log(enviarmensagem);

function atualizarpagina(erro){
    let tipo = erro.response.status
    if (tipo !== 400){
        window.location.reload()
    }
}