const sectionPaleteColor = document.querySelector('#color-palette');
const buttonRandomColor = document.querySelector('#button-random-color');
const clearButton = document.querySelector('#clear-board');

// A função generatePaleteColor é responsável por criar tag div de forma dinâmica pelo JavaScript.
// 1- Primeiro passo foi fazer um for para repitir a quantidade de div que foi pedida no requisito.
// 2- Dentro desse loop criei uma constante para poder criar um elemento div até completar o ciclo do loop.
// 3- Ainda no loop atribui uma class e propriedade CSS diretamente no JavaScript.
// 4- Em seguida acrescentei essas div dentro de uma section que foi criada por mim diretamente no HTML.
// 5- Criei uma condição somente para a primeira div de que: se for a primeira div da section, eu quero que seja atribuido uma class extra chamada 'selected' que vai ser utilizada mais pra frente.
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

// A função savePaleteColor é responsável por salvar as cores geradas para div com a class "color". A lógica foi a seguinte:
// 1- Capturei as class;
// 2- criei uma array vazia para colocar os index das div percorrida no for;
// 3- Uma vez com os index das div, utilizei o push para empurra-los para a array vazia (dentro do push peguei de forma direta somente o fundo dessas div para serem salvas);
// 4- Com as informações, fiz um setItem no local storage com o nome da chave de 'colorPalette' como pedido no requisito e utilizei o JSON.stringify para converter para string o valor.
const savePaleteColor = () => {
  const paleteColor = document.querySelectorAll('.color');
  const colors = [];
  for (let index = 0; index < paleteColor.length; index += 1) {
    colors.push(paleteColor[index].style.backgroundColor);
    localStorage.setItem('colorPalette', JSON.stringify(colors));
  }
};

// A função coloredDiv ficou responsável por colorir essas div criadas anteriormente. O processo foi pensado da seguinte forma:
// 1- Capturei todas as div com a class 'color' e coloquei dentro de uma constante criada.
// 2- Realizei um for pra percorrer a constante criada com todas as div com a class 'color.
// 3- Fiz uma condição para duas situações: Se o index que foi percorrido no for for igual ao index 0, ou seja, a primeira div, eu quero que a cor de fundo seja preto. Senão for eu quero que aplique a cor de fundo que foi criada na minha função colorRandom.
// No final foi invocada a função savePAleteColor que é responsável por "setar" o localStorage.
const coloredDiv = () => {
  const divs = document.querySelectorAll('.color');
  for (let index = 0; index < divs.length; index += 1) {
    if (divs[index] === divs[0]) {
      divs[index].style.backgroundColor = 'black';
    } else {
      divs[index].style.backgroundColor = colorRandom();
    }
  }
  savePaleteColor();
};

// O requisito 4 pede um botão para trocar as cores da paleta de cores. Criei o button diretamente no HTML e coloquei o id pedido. Foi preciso apenas um evento de click para o botão, já que o botão foi capturado lá no topo do código. A função do botão eu aproveitei o coloredDiv que faz exatamente oque era preciso nessa ocasião.
buttonRandomColor.addEventListener('click', coloredDiv);

// A função paintPaleteColorSaved serve pra pegar oque foi salvo no localStorage e reutiliza-las quando a página sofrer um refresh ou for fechada. A lógica foi a seguinte:
// 1- Capturei as className "color";
// 2- Peguei as informações o valor da chave "colorPalette" e fiz um JSON.parse() para transformá-la novamente;
// 3- Foi feito um for para poder percorrer a array que foi salva no localStorage;
// 4- com os index na mão coloquei o valor capturado no localStorage em cada index da array.
const paintPaleteColorSaved = () => {
  const palete = document.querySelectorAll('.color');
  const saveColor = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < palete.length; index += 1) {
    palete[index].style.backgroundColor = saveColor[index];
  }
};

// A função paintPaleteLocalStorage foi feita para o refresh da página ou caso ela seja fechada e a lógica foi pensada da seguinte forma: Ele vai tentar buscar alguma informação no localStorage, porém se caso não tenha nada, ou seja, nulo, ele vai utilizar a função coloredDiv que vai pintar as div. Se caso tenha alguma informação ele vai pegar a informação e utilizá-la.
const paintPaleteLocalStorage = () => {
  if (localStorage.getItem('colorPalette') === null) {
    coloredDiv();
  } else {
    paintPaleteColorSaved();
  }
};

// A função generatePixelBoard esta responsável por criar o quadro de pixels onde vão ser pintados. Para sua construção, segui a seguinte lógica:
// 1- Capturei o lugar onde vai estar meus pixels;
// 2- Fiz um for para definir a quantidade de pixels pedida no Requisito 7 (No caso foi 5 linhas e 5 colunas);
// Para cada index foi criado a tag div (que vai ser meu pixel);
// 4- atribui a className "pixel" para cada pixel criado a partir do for;
// 5- Ainda no loop a pixel criada foi acrescentada ao elemento pai com o id "#pixel-board", capturado no início desta função.
const generatePixelBoard = () => {
  const pixelBoard = document.querySelector('#pixel-board');
  for (let index = 0; index < 5 * 5; index += 1) {
    const divPixel = document.createElement('div');
    divPixel.className = 'pixel';
    pixelBoard.appendChild(divPixel);
  }
};

// A função selectedColor está responsável por selecionar a cor na paleta de cores. A lógica da função foi pensada da seguinte forma:
// 1- Capturei todas as cores da Paleta de Cores com a className "color";
// 2- Fiz um for para percorrer todas as cores da Paleta de Cores;
// 3- com o index das cores percorridas pelo for coloquei um addEventListener do tipo click para ficar no aguarde da ação do usuário;
// 4- Capturei a cor que já estava selecionada;
// 5- Criei a seguinte condição: Se o index já estiver com a className "selected", eu quero que remova. Caso não tenha, quero adicionar a className "selected", conforme pede o requisito 9.
const selectedColor = () => {
  const colors = document.querySelectorAll('.color');
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', (event) => {
      const selected = document.querySelector('.selected');
      if (selected) {
        selected.classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
};

// A função paintPixelBoard serve para pintar os pixels criados com a cor selecionada na Paleta de Cores. A lógica utilizada na função é bastante parecida com a função selectedColor, porém ao invés de "capturar o click e pegar a cor" o addEventListener foi utilizado para aplicar o backgroundColor da cor que está selecionada da função selectedColor.
// 1- Capturei os pixels criados;
// 2- Passei um for para percorrer todos os meus pixels;
// 3- com o index do pixel foi adicionado um addEventListener para pegar o click no pixel que o usuário quer pintar;
// 4- Capturei a cor selecionada (que está com a className "selected");
// 5- no index do pixel percorrido, alterei o fundo pelo fundo da cor selecionada.
const paintPixelBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', () => {
      const selected = document.querySelector('.selected');
      pixels[index].style.backgroundColor = selected.style.backgroundColor;
    });
  }
};

// A função clearPixelBoard é responsável por limpar o Pixel Board por completo. A lógica é parecida com as funções paintPixelBoard e selectedColor:
// 1- captuei os pixels;
// 2- Criei um for para percorrer todos os pixels;
// 3- Criei um addEventListener para ficar na espera do click do usuário no botão Limpar;
// 4- Após o click cada pixel retorna para o seu background inicial que é branco.
const clearPixelBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    clearButton.addEventListener('click', () => {
      pixels[index].style.backgroundColor = 'white';
    });
  }
};

window.onload = () => {
  generatePaleteColor();
  paintPaleteLocalStorage();
  generatePixelBoard();
  selectedColor();
  paintPixelBoard();
  clearPixelBoard();
};
