const sectionPaleteColor = document.querySelector('#color-palette');

// A função generatePaleteColor é responsável por criar tag div de forma dinâmica pelo JavaScript.
// 1- Primeiro passo foi fazer um for para repitir a quantidade de div que foi pedida no requisito.
// 2- Dentro desse loop criei uma constante para poder criar um elemento div até completar o ciclo do loop.
// 3- Ainda no loop atribui uma class e propriedade CSS diretamente no JavaScript.
// 4- Em seguida acrescentei essas div dentro de uma section que foi criada por mim diretamente no HTML.
// 5- Criei uma condição somente para a primeira div de que: se for a primeira div, eu quero que seja atribuido uma class chamada 'selected' que vai ser utilizada mais pra frente.
const generatePaleteColor = () => {
  for (let index = 0; index < 4; index += 1) {
    const divs = document.createElement('div');
    divs.className = 'color';
    divs.style.border = '1px solid black';
    sectionPaleteColor.appendChild(divs);

    if (index === 0) {
      divs.classList.add('selected');
    }
  }
};

// A função colorRandom é responsável somente para gerar uma cor aleatória que vão ser colocadas nas minhas divs da paleta de cores. O raciocínio foi o seguinte:
// 1 - Criei 3 constantes que vão ter números aleatórios. (Utilizei o Math.floor() para os numeros serem arredondados para baixo e dentro dessa função floor coloquei um Math.random() multiplicado por 255 pra pegar a maior gama de cores possíveis, descartando somente o branco).
// 2- No return fiz uma concatenação para gerar uma string de cor que vai ser utilizada pra pintar as div da paleta de cor.
const colorRandom = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

// A função coloredDiv ficou responsável por colorir essas div criadas anteriormente. O processo foi pensado da seguinte forma:
// 1- Capturei todas as div com a class 'color' e coloquei dentro de uma constante criada.
// 2- Realizei um for pra percorrer a constante criada com todas as div com a class 'color.
// 3- Fiz uma condição para duas situações: Se o index que foi percorrido no for for igual ao index 0, ou seja, a primeira div, eu quero que a cor de fundo seja preto. Senão for eu quero que aplique a cor de fundo que foi criada na minha função colorRandom.
const coloredDiv = () => {
  const divs = document.querySelectorAll('.color');
  for (let index = 0; index < divs.length; index += 1) {
    if (divs[index] === divs[0]) {
      divs[index].style.backgroundColor = 'black';
    } else {
      divs[index].style.backgroundColor = colorRandom();
    }
  }
};

window.onload = () => {
  generatePaleteColor();
  colorRandom();
  coloredDiv();
};
