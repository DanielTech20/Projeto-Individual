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
            console.log(lista_inimigos[contador])
            lista_inimigos[contador].style.display = "block"
            inimigo_anterior = contador;
        }

    }
}