var inimigo_anterior = 0;

function selecao_inimigo() {
    var lista_inimigos = [humano, corredor, perseguidor, estalador, verme]
    var lista_escolha = ["humano", "corredor", "perseguidor", "estalador", "verme"]
    
    if (inimigo_anterior >= 0) {
        lista_inimigos[inimigo_anterior].style.display = "none"
    }

    for (
       var contador = 0;
       contador < 5;
       contador++
    ) {

        if (preferido.value == lista_escolha[contador]) {
            lista_inimigos[contador].style.display = "block"
            inimigo_anterior = contador;
        }

    }
}

function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome.value;
    var emailVar = email.value;
    var senhaVar = senha.value;
    var confirmar_senhaVar = confirmar_senha.value;
    var preferidoVar = preferido.value;
    var qtdMortesVar = qtdMortes.value;

       if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmar_senhaVar == "" || preferidoVar == "" || qtdMortesVar == "") {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos!'
          })

        // finalizarAguardar();
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
            preferidoServer: preferidoVar,
            qtdMortesServer: qtdMortesVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Cadastro realizado com sucesso, redirecionando para tela de login!'
              })

            setTimeout(() => {
                window.location = "login.html";
            }, "3500")
            
            // limparFormulario();
            // finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    return false;
}

function entrar() {
    // aguardar();

    var emailVar = email.value;
    var senhaVar = senha.value;

    if (emailVar == "" || senhaVar == "") {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Preencha todos os campos!'
          })
        // finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Login realizado com sucesso!'
              })

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.INIMIGO = json.preferido;

                setTimeout(function () {
                    window.location = "./dashboard/dicas.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}