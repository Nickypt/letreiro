// Obtém os elementos principais
const marqueeText = document.getElementById('marqueeText');
const screen = document.querySelector('.screen');
// Obtém o texto da citação a partir do atributo data-text do HTML
const textContent = marqueeText.getAttribute('data-text'); 

// Parâmetros da Animação
const baseSpeed = 1.5; 
const speedVariation = 0.5; // Para o movimento ser mais "orgânico"
let position = 0; 
let direction = 1; // 1 = Direita, -1 = Esquerda

// 1. Inicializa o Efeito de Onda (Quebra a frase em spans)
function initializeTextWave() {
    let htmlContent = '';
    let delay = 0;
    
    // Itera sobre cada caractere
    textContent.split('').forEach(char => {
        // Usa um span para cada caractere
        // Substitui o espaço por &nbsp; para que o span não suma
        const content = char === ' ' ? '&nbsp;' : char;
        // Adiciona um delay diferente para cada letra (cria o efeito de onda)
        htmlContent += `<span style="animation-delay: ${delay}s">${content}</span>`;
        
        delay += 0.05; // Incrementa o delay para a próxima letra
    });

    marqueeText.innerHTML = htmlContent;
}

// 2. Função Principal de Animação (Ida e Volta Horizontal)
function animateMarquee() {
    const screenWidth = screen.clientWidth;
    const textWidth = marqueeText.clientWidth;
    const maxPosition = screenWidth - textWidth; 

    // Calcula a velocidade variável usando uma função seno (movimento menos robótico)
    const variableSpeed = baseSpeed + (Math.sin(Date.now() / 1000) * speedVariation);
    
    // 1. Move o texto
    position += variableSpeed * direction;

    // 2. Lógica de ida e volta (reversão)
    if (direction === 1) { // Movendo para a direita
        if (position >= maxPosition) {
            position = maxPosition; 
            direction = -1; // Inverte para a esquerda
        }
    } else { // Movendo para a esquerda
        if (position <= 0) {
            position = 0; 
            direction = 1; // Inverte para a direita
        }
    }

    // 3. Aplica a nova posição ao elemento
    marqueeText.style.left = `${position}px`;

    // 4. Agenda o próximo frame
    requestAnimationFrame(animateMarquee);
}

// Inicia as funções ao carregar o script
initializeTextWave();
animateMarquee();