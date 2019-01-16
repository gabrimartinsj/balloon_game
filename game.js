var timerId = null;

function inicia_jogo(){
    var url = window.location.search;
    var nivel_jogo = url.replace("?", "");
    var tempo_s = 0;

    if (nivel_jogo == 1)
        tempo_s = 120;
    else if (nivel_jogo == 2)
        tempo_s = 60;
    else
        tempo_s = 30;

    document.getElementById("cronometro").innerHTML =  tempo_s;

    var q_baloes = 80;
    cria_baloes(q_baloes);

    document.getElementById("baloes_inteiros").innerHTML = q_baloes;
    document.getElementById("baloes_estourados").innerHTML = 0;

    contagem_tempo(tempo_s + 1);
}

function cria_baloes(q_baloes){
    for (var i=0; i<q_baloes; i++){
        var balao = document.createElement("img");
        balao.src = "imagens/balao_azul_pequeno.png";
        balao.style.margin = "10px";
        balao.style.padding = "2px";
        balao.id = "b" + i;
        balao.onclick = function(){estourar(this);}

        document.getElementById("cenario").appendChild(balao);
    }
}

function contagem_tempo(segundos){
    segundos--;

    if (segundos == -1){
        clearTimeout(timerId);
        fim_jogo();
        return false;
    }

    document.getElementById("cronometro").innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")", 1000)
}

function fim_jogo(){
    alert("Fim de jogo, você não conseguiu estourar todos os balões!");
}

function estourar(e){
    var id_balao = e.id;
    document.getElementById(id_balao).setAttribute("onclick", "")
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";

    pontuacao(-1);
}

function pontuacao(acao){
    var baloes_inteiros = parseInt(document.getElementById("baloes_inteiros").innerHTML);
    var baloes_estourados = parseInt(document.getElementById("baloes_estourados").innerHTML);

    baloes_inteiros--;
    baloes_estourados++;

    document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros;
    document.getElementById("baloes_estourados").innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
    if (baloes_inteiros == 0){
        alert ("Parabéns!!! Você conseguiu estourar todos os balões a tempo!");
        clearTimeout(timerId);
    }
}
