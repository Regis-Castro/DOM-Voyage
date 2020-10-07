//scroll do menu 
let sobreBaixo = document.querySelector('#sobre');
let sobreH1 = document.querySelector('section#sobre h1');
sobreBaixo.addEventListener('click', function() {
	sobreH1.scrollIntoView ({
			behavior: 'smooth'
	});
});

let instrucoesBaixo = document.querySelector('#instrucoes');
let instrucoesH1 = document.querySelector('section#instrucoes h1');
instrucoesBaixo.addEventListener('click', function() {
	instrucoesH1.scrollIntoView ({
			behavior: 'smooth'
	});
});

let jogarBaixo = document.querySelector('#jogar');
let jogarH1 = document.querySelector('#jogar h1');
jogarBaixo.addEventListener('click', function() {
	jogarH1.scrollIntoView ({
			behavior: 'smooth'
	});   
});


let contatoBaixo = document.querySelector('#contato');
let rodape = document.querySelector('footer');
contatoBaixo.addEventListener('click', function() {
    rodape.scrollIntoView ({
			behavior: 'smooth'
	});
});

let setaCima = document.querySelector('#seta');
setaCima.addEventListener('click', function() {
  window.scrollTo ({
      top: 0,
      behavior: 'smooth'
  });
});

let somLigado = document.querySelector('.fa-volume-up');
let somDesligado = document.querySelector('.fa-volume-mute');
somDesligado.addEventListener('click', function() {
	somLigado.style.visibility = 'visible';
	somDesligado.style.visibility = 'hidden';
	noktaStirado.play();
});

somLigado.addEventListener('click', function() {
	somLigado.style.visibility = 'hidden';
	somDesligado.style.visibility = 'visible';
	noktaStirado.pause();
});

//jogo

//trocar cor do carro 
//variável pra selecionar a imagem do carro
let carro = document.querySelector('#carro');

//variável pro som de confirmação da cor. O som é tocado através do confirmacao.play() 
let confirmacao = document.querySelector('#confirmacao');

//variável pra música de fundo do jogo 
let california = document.querySelector('#california');

//trocar pro branco
let botaoBranco = document.querySelector('#branco');

botaoBranco.addEventListener('click', function() {
	carro.getAttribute('src');
	carro.setAttribute('src', "imagens/carro_branco.png");
	confirmacao.play();
	});


//trocar pro amarelo 
let botaoAmarelo = document.querySelector('#amarelo');
botaoAmarelo.addEventListener('click', function() {
	carro.getAttribute('src');
	carro.setAttribute('src', "imagens/carro_amarelo.png");
	confirmacao.play();
});

//trocar cor pro azul 
let botaoAzul = document.querySelector('#azul');
botaoAzul.addEventListener('click', function() {
	carro.getAttribute('src');
	carro.setAttribute('src', "imagens/carro_azul.png");
	confirmacao.play();
});

//trocar cor pro laranja
let botaoLaranja = document.querySelector('#laranja');
botaoLaranja.addEventListener('click', function() {
	carro.getAttribute('src');
	carro.setAttribute('src', "imagens/carro_laranja.png");
	confirmacao.play();
});

//trocar cor pro rosa
let botaoRosa = document.getElementById('rosa');
botaoRosa.addEventListener('click', function() {
	carro.getAttribute('src');
	carro.setAttribute('src', "imagens/carro_rosa.png");
	confirmacao.play();
});

//variável pro fundo do jogo
let fundo = document.getElementById('fundo');

//variável pro posto 
let posto = document.getElementById('posto');

//atualizar o valor da gasolina de acordo com o valor indicado no campo de tanque
let tanque = document.querySelector('#tanque');
let gasolina = document.querySelector('#gasolina');
let consumo = document.querySelector('#consumo');
let deslocamentoMax = document.querySelector('#deslocamentoMax');
let deslocamentoMaximo; //está declarada fora do addEventListener pra ela ter escopo global e poder ser usado dentro de outro addEventListener
let anoiteceu; //criei pra alterar pra true ao passar pelo posto e false ao dar Enter. Assim as cores dos textos alteram entre branco e preto dependendo se for dia ou noite.
let posicao = 21;
let andar = 1;
let fimJogo = false;


tanque.addEventListener('input', function(gasosa) {
    //atualizando o valor do tanque de acordo com o que foi digitado
		tanque = gasosa.target.value;

	if (gasosa.target.value == 1 && fimJogo == true || gasosa.target.value == 1 && fimJogo == false ) {
		gasolina.style.color = '#00303f';
		gasolina.style.fontWeight = 'normal';
		gasolina.innerHTML = 'Gasolina: ' + gasosa.target.value + ' litro';
	}	else if (gasosa.target.value > 100 && fimJogo == true || gasosa.target.value > 100 && fimJogo == false) {
		gasolina.style.color = 'red';
		gasolina.style.fontWeight = 'bold';
		gasolina.innerHTML = 'O valor do tanque deve estar entre 1 e 100 litros. Digite outro valor.';
	} else if (gasosa.target.value > 1 && gasosa.target.value <= 100 && fimJogo == true || gasosa.target.value > 1 && gasosa.target.value <= 100 && fimJogo == false) {
		gasolina.style.color = '#00303f';
		gasolina.style.fontWeight = 'normal';
		gasolina.innerHTML = 'Gasolina: ' + gasosa.target.value + ' litros';
		deslocamentoMax.style.color = '#00303f';
		deslocamentoMax.style.fontWeight = 'normal';
		deslocamentoMax.innerHTML = 'Deslocamento máximo: ' + deslocamentoMaximo + 'Km';
	} 

	deslocamentoMax.innerHTML = 'Deslocamento máximo: 0 Km'; //para não aparecer undefinedKm no deslocamento enquanto o campo de consumo estiver em branco
});


//atualizando o valor do consumo de acordo com o que foi digitado
consumo.addEventListener('input', function(cons) {
	consumoInicial = cons.target.value;
	consumo = cons.target.value;

if (cons.target.value <= 25) {
	deslocamentoMax.style.color = '#00303f';
	deslocamentoMax.style.fontWeight = 'normal';
	deslocamentoMaximo = consumo * tanque;
	deslocamentoMaximo = deslocamentoMaximo.toFixed(1); //para os números ficarem sempre com apenas um número após a vírgula
	deslocamentoMax.innerHTML = 'Deslocamento máximo: ' + deslocamentoMaximo + 'Km';
}	else {
	deslocamentoMax.style.color = 'red';
	deslocamentoMax.style.fontWeight = 'bold';
	deslocamentoMax.innerHTML = "O consumo deve estar entre 1 e 25 km/l";
}
});


//Fazendo o carro andar com as setas, atualizar os valores e parar de andar assim que fica sem gasolina
 window.addEventListener('keydown', function(e) {	
    if (e.key == 'ArrowRight' && posicao <= 71 && tanque > 0 && consumo <= 25) { //posicao left 71% é o máximo para o carro não sair da tela
			posicao += andar;
			carro.style.left = posicao + '%';
			tanque -= 1; 
			tanque = tanque.toFixed(1);
			gasolina.style.color = '#00303f';
			gasolina.innerHTML = 'Gasolina: ' + tanque + ' litros'; //a variável tanque está recebendo o valor digitado no input de gasolina no tanque
			deslocamentoMaximo = consumo * tanque;
			deslocamentoMaximo = deslocamentoMaximo.toFixed(1); //para os números ficarem sempre com apenas um número após a vírgula
			deslocamentoMax.style.color = '#00303f';
			deslocamentoMax.style.fontWeight = 'normal';
			deslocamentoMax.innerHTML = 'Deslocamento máximo: ' + deslocamentoMaximo + 'Km'; 				
	} 

		if (e.key == 'ArrowLeft' && posicao > 21 && tanque > 0 && consumo <= 25) {
		  posicao -= andar;
			carro.style.left = posicao + '%';
			tanque -= 1;
			tanque = tanque.toFixed(1);
			gasolina.innerHTML = 'Gasolina: ' + tanque + ' litros';
			deslocamentoMaximo = consumo * tanque;
			deslocamentoMaximo = deslocamentoMaximo.toFixed(1);
			deslocamentoMax.innerHTML = 'Deslocamento máximo: ' + deslocamentoMaximo + 'Km';
		}

		//Pra avisar que a gasolina terminou, em vermelho
		if (e.key == 'ArrowRight' && tanque <= 0 || e.key == 'ArrowLeft' && tanque <= 0) {
			gasolina.style.color = 'red';
			gasolina.style.fontWeight = 'bold';
			gasolina.innerHTML = 'Sua gasolina terminou! Você não pode mais se deslocar.';
			fimJogo = 'true';
		} 

		if (e.key == 'ArrowRight' && deslocamentoMaximo <= 0 && posicao != 55 || e.key == 'ArrowLeft' && deslocamentoMaximo <= 0 && posicao != 55) {
			deslocamentoMax.style.color = 'red';
			deslocamentoMax.style.fontWeight = 'bold';
			deslocamentoMax.innerHTML = 'Aperte "Enter" e digite um novo valor.';
			fimJogo = 'true';
		} 

		//fazer aparecer mensagem de abastecimento ao chegar na posição 55 da pista
		if (e.key == 'ArrowRight' && posicao == 55 || e.key == 'ArrowLeft' && posicao == 55) {
			gasolina.style.color = 'orange';
			gasolina.style.fontWeight = 'bold';
			gasolina.innerHTML = 'Deseja abastecer? s/n';
		}

	
		if (e.key == 'ArrowRight' && posicao == 55 && anoiteceu == true || e.key == 'ArrowLeft' && posicao == 55 && anoiteceu == true) {
			deslocamentoMax.style.color = 'white';
			deslocamentoMax.style.fontWeight = 'normal';
			gasolina.innerHTML = 'Deseja abastecer? s/n';

		}

		//voltar o texto da gasolina pra cor normal depois de ter passado pelo posto
		if (e.key == 'ArrowRight' && posicao != 55 && tanque >= 0.9 || e.key == 'ArrowLeft' && posicao != 55 && tanque >= 0.9) {
			gasolina.style.color = '#00303f';
			gasolina.style.fontWeight = 'normal';
			gasolina.innerHTML = 'Gasolina: ' + tanque + ' litros';
		}

		//fazer anoitecer assim que o carro chega no posto 
		if (e.key == 'ArrowRight' && posicao == 63 || e.key == 'ArrowLeft' && posicao == 63) {
			fundo.getAttribute('src');
			fundo.setAttribute('src', "imagens/rodovia_noite.png");
			posto.getAttribute('src');
			posto.setAttribute('src', "imagens/posto_noite.png");
			anoiteceu = true;
			somLigado.style.color = 'white';
			somDesligado.style.color = 'white';
		}

		//adicionei posição != 55 aqui para o carro poder abastecer mesmo depois de anoitecer
		if (e.key == 'ArrowRight' && anoiteceu == true && tanque != 0 && posicao != 55 || e.key == 'ArrowLeft' && anoiteceu == true && tanque != 0 && posicao != 55) {
			gasolina.style.color = 'white';
			gasolina.style.fontWeight = 'normal';
			gasolina.innerHTML = 'Gasolina: ' + tanque + ' litros';
			deslocamentoMax.style.color = 'white';
		}

		if (e.key == 's' && posicao == 55) {
			let gasolinaAdicional = 100 - tanque;
			tanque = 100;
			gasolina.innerHTML = 'Você abasteceu ' + gasolinaAdicional + ' litros <br> Gasolina total: 100 litros';
			deslocamentoMaximo = consumo * tanque;
			deslocamentoMaximo = deslocamentoMaximo.toFixed(1);
			deslocamentoMax.innerHTML = 'Deslocamento máximo: ' + deslocamentoMaximo + 'Km';
		}
		
		if (e.key == 'n' && posicao == 55 && tanque != 100) {
			gasolina.style.color = 'orange';
			gasolina.innerHTML = 'Cuidado para não ficar na estrada! Gasolina: ' + tanque + ' litros';
		}

		if (e.key == "Enter" && tanque <= 0) {
			fimJogo = true;
		}

		//Tive que criar esta nova variável pra conseguir desabilitar o input porque a variável tanque foi sobrescrita ao longo do projeto, então eu teria que arrumar isso ou criar uma variável nova. Desabilita ambos os inputs assim que o carro anda.
		let desabilitarTanque = document.querySelector('#tanque');
		let desabilitarConsumo = document.querySelector('#consumo');
		if (e.key == 'ArrowRight' && tanque <= 100 && consumo <= 25) {
			desabilitarTanque.disabled = true;
			desabilitarConsumo.disabled = true;
		}

		if (e.key == "Enter" && tanque <= 0 && fimJogo == true) { 
			posicao = 21;
			carro.style.left = posicao + '%';
			gasolina.style.color = '#00303f';
			gasolina.style.fontWeight = 'normal';
			gasolina.innerHTML = 'Gasolina: 0 litros';
			deslocamentoMax.style.color = '#00303f';
			deslocamentoMax.style.fontWeight = 'normal';
			deslocamentoMax.innerHTML = 'Deslocamento máximo: 0 Km';
			//pra remover o atributo desabilitação
			desabilitarTanque.removeAttribute('disabled');
			desabilitarConsumo.removeAttribute('disabled');
		
		}

		if (e.key == "Enter" && tanque <= 0 && fimJogo == true && anoiteceu == true) { 
			posicao = 21;
			carro.style.left = posicao + '%';
			gasolina.style.color = '#00303f';
			gasolina.style.fontWeight = 'normal';
			gasolina.innerHTML = 'Gasolina: 0 litros';
			deslocamentoMax.style.color = '#00303f';
			deslocamentoMax.style.fontWeight = 'normal';
			deslocamentoMax.innerHTML = 'Deslocamento máximo: 0 Km';
			fundo.getAttribute('src');
			fundo.setAttribute('src', "imagens/rodovia_dia.png");
			posto.getAttribute('src');
			posto.setAttribute('src', "imagens/posto.png");
			somLigado.style.color = '#00303f';
			somDesligado.style.color = '#00303f';
			anoiteceu = false;
		}
});