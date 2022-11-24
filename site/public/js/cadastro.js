var inimigo_anterior = 0;
var lista_inimigos = []
var lista_escolha = []
function selecao_inimigo() {
    lista_inimigos = [humano, corredor, perseguidor, estalador, verme]
    lista_escolha = ["humano", "corredor", "perseguidor", "estalador", "verme"]
    
    if (inimigo_anterior >= 0) {
        lista_inimigos[inimigo_anterior].style.display = "none"
    }

    for (
       var contador = 0;
       contador < 5;
       contador++
    ) {

        if (inimigos.value == lista_escolha[contador]) {
            lista_inimigos[contador].style.display = "block"
            inimigo_anterior = contador;
        }

    }
}

function cadastrar() {
    aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome.value;
    var emailVar = email.value;
    var senhaVar = senha.value;
    var confirmar_senhaVar = confirmar_senha.value 
    var inimigosVar = inimigos.value

       if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmar_senhaVar == "" || inimigosVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            inimigosServer: inimigosVar
            
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            cardErro.style.display = "block";

            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")
            
            limparFormulario();
            finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}