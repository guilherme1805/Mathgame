var sec = 0;
var cronometro1 = 0;
var nivel;
var modo = 0;
var instrucoes = 0;
var timer;
var timer2;
var verificacao;
var pontos = 0;
var sair = 0;
var menu =
            '<div id="menu-container">'+
            '<div class="gameover">'+
            '<table style="font-size:20px;color:white;" align="center">'+
            '<tr>'+
            '<td colspan="2">The Game Ended</td>'+
            '</tr>'+
            '<tr>'+
            '<td colspan="2">&nbsp;</td>'+
            '</tr>'+
            '<tr>'+
            '<td style="color:grey; font-size:16px;">Points</td>'+
            '<td id="pontos1"></td>'+
            '</tr>'+
            '</table>'+
            '</div>'+
            '<div class="play1" id="play" onmouseover="botoes('+'5'+');" onclick="location.reload();" onmouseout="botoes('+'6'+');">'+
            '<img id="play1" src="images/play.svg" height="25" style="margin-left:30px;margin-top:8px;">'+
            '</div>'+
            '</div>';

function playgame(dificuldade){
    document.getElementById("game").style.display = 'block';
    document.getElementById("apagar").innerHTML = '';
    nivel = dificuldade;
    if (nivel==1){
        document.getElementById("segundos").innerHTML = '10 seconds';
    }
    else if (nivel==2){
        document.getElementById("segundos").innerHTML = '6 seconds';
    }
    else if (nivel==3){
        document.getElementById("segundos").innerHTML = '4 seconds';
    }
    else if (nivel==4){
        document.getElementById("segundos").innerHTML = '2 seconds';
    }
    else if (nivel==5){
        document.getElementById("segundos").innerHTML = '1 second';
    }
    calculo();
}

function tempo(){
    if(sair==0){
        clearTimeout(timer);
        clearInterval(timer2);
        document.getElementById("barra").style.width= '400px';
        if (nivel==1){
            //A cada 0.05s a barra do tempo reduz 2px
            timer2=setInterval('cronometro()',50);
            //10s maximos segundos para responder
            timer=setTimeout('derrota()',10000);
        }
        else if (nivel==2){
            //A cada 0.03s a barra do tempo reduz 2px
            timer2=setInterval('cronometro()',30);
            //6s maximos segundos para responder
            timer=setTimeout('derrota()',6000);
        }
        else if (nivel==3){
            //A cada 0.02s a barra do tempo reduz 2px
            timer2=setInterval('cronometro()',20);
            //4s maximos segundos para responder
            timer=setTimeout('derrota()',4000);
        }
        else if (nivel==4){
            //A cada 0.01s a barra do tempo reduz 2px
            timer2=setInterval('cronometro()',10);
            //2s maximos segundos para responder
            timer=setTimeout('derrota()',2000);
        }
        else if (nivel==5){
            //A cada 0.005s a barra do tempo reduz 2px
            timer2=setInterval('cronometro()',5);
            //1s maximos segundos para responder
            timer=setTimeout('derrota()',1000);
        }
    }
}

function cronometro(){
    //Reduz 2px ao tamanho da barra do tempo
    var comprimento_barra = document.getElementById("barra").clientWidth;
    comprimento_barra = eval("comprimento_barra - 2");
    comprimento_barra = comprimento_barra + 'px';
    document.getElementById("barra").style.width= comprimento_barra;
}



function main(resposta){
    //Verificacao da resposta
    document.getElementById("segundos").innerHTML="";
    if(resposta==verificacao){
        pontos = pontos + 1;
        document.getElementById("pontos").innerHTML = '<span style="font-size:16px;"> Points </span><br>' + pontos;
        calculo();
        if(cronometro1==0){
            cronometro1=1;
            carga();
        }

    }
    else{
        derrota();
        sair=1;
    }
}

function derrota(){

    clearInterval(timer2);
    clearTimeout(timer);

    //Popup da pontuação
    document.getElementById('caixa').innerHTML = menu;
    document.getElementById('pontos1').innerHTML = pontos;

    //Desativar os botoes correto/errado
    document.getElementById('botao_1').onclick = "";
    document.getElementById('botao_2').onclick = "";
}

function calculo(){
    //Gerar numero1 (1-10)
    var numero1 = Math.floor((Math.random() * 10) + 1);

    //Gerar numero2 (1-10)
    var numero2 = Math.floor((Math.random() * 10) + 1);

    //Gerar sinal1 (+/-)
    var sinal1 = Math.floor((Math.random() * 2) + 1);
    if (sinal1 == 1){
        sinal1 = "+";
    }
    else{
        sinal1 = "-";
    }

    //Resultado real do calculo
    var resultado1 = eval(numero1 + sinal1 + numero2);

    //Gerar resultado random do calculo
    var sinal2 = Math.floor((Math.random() * 2) + 1);
    if (sinal2 == 1){
        sinal2 = "+";
    }
    else{
        sinal2 = "-";
    }
    var numero3 = Math.floor((Math.random() * 4) + 1);
    var resultado2 = eval(resultado1 + sinal2 + numero3);

    // Resultado incorreto ou correto
    verificacao = Math.floor((Math.random() * 2) + 1);

    //Atribuir os valores
    document.getElementById("num1").innerHTML = numero1;
    document.getElementById("sinal").innerHTML = sinal1;
    document.getElementById("num2").innerHTML = numero2;
    if (verificacao==1){
        document.getElementById("res").innerHTML = "= " + resultado1;
    }
    else{
        document.getElementById("res").innerHTML = "= " + resultado2;
    }

    //Cor de Fundo
    var fundo =Math.floor((Math.random() * 5) + 1);
    if(fundo==1){
        document.getElementById("game").style.backgroundColor = "#25AE5E";
    }
    else if(fundo==2){
        document.getElementById("game").style.backgroundColor = "#D25400";
    }
    else if(fundo==3){
        document.getElementById("game").style.backgroundColor = "#8F44AD";
    }
    else if(fundo==4){
        document.getElementById("game").style.backgroundColor = "#818C8E";
    }
    else if(fundo==5){
        document.getElementById("game").style.backgroundColor = "#F39C11";
    }
}


function botoes(valor){
    //Onmouseover botao certo
    if(valor==1){
        document.getElementById("botao_1").src="images/check2.svg";
        document.getElementById("botao1").className="botton2";
    }
    //Onmouseout botao certo
    else if(valor==2){
        document.getElementById("botao_2").src="images/delete2.svg";
        document.getElementById("botao2").className = "botton2";
    }
    //Onmouseover botao errado
    else if(valor==3){
        document.getElementById("botao_1").src="images/check.svg";
        document.getElementById("botao1").className = "botton1";
    }
    //Onmouseout botao errado
    else if(valor==4){
        document.getElementById("botao_2").src="images/delete.svg";
        document.getElementById("botao2").className = "botton1";
    }
    //Onmouseover botao play
    else if(valor==5){
        document.getElementById("play1").src="images/play2.svg"
        document.getElementById("play").className = "play2";
    }
    //Onmouseout botao play
    else if(valor==6){
        document.getElementById("play1").src="images/play.svg"
        document.getElementById("play").className = "play1";
    }
}

function instru(){
    if(instrucoes==0){
        document.getElementById("instrucoes").style.display = 'block';
        instrucoes = 1;
    }
    else if(instrucoes==1){
        document.getElementById("instrucoes").style.display = 'none';
        instrucoes = 0;
    }
}

function dificuldade(){
    if (modo==0){
        document.getElementById("dificuldade").style.display = 'block';
        modo=1;
    }
    else if(modo==1){
        document.getElementById("dificuldade").style.display = 'none';
        modo=0;
    }
}

function carga(){
    contador_s=1;
    contador_m=0;
    s=document.getElementById("seg");
    m=document.getElementById("min");

    window.setInterval(
    function(){
        if(contador_s==60)
        {
            contador_s=0;
            contador_m++;
            if(contador_m==60)
            {
                contador_m=0;
            }
        }
        if(contador_s<=9){
            document.getElementById("seg").innerHTML='0'+contador_s;
        }
        else{
            document.getElementById("seg").innerHTML=contador_s;
        }
        if(contador_m<=9){
            document.getElementById("min").innerHTML='0'+contador_m;
        }
        else{
            document.getElementById("min").innerHTML=contador_m;
        }
        contador_s++;
    }
    ,1000);
}
