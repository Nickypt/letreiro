// Obtém os elementos principais
const marqueeText = document.getElementById('marqueeText');
const screen = document.querySelector('.screen');
const textContent = marqueeText.getAttribute('data-text'); 

// Parâmetros da Animação do Letreiro
const baseSpeed = 0.6; // Movimento lento e suave
const speedVariation = 0.5;
let position = 0; 
let direction = 1;

// 1. Inicializa o Efeito de Onda (Quebra a frase em spans)
function initializeTextWave() {
    let htmlContent = '';
    let delay = 0;
    
    textContent.split('').forEach(char => {
        const content = char === ' ' ? '&nbsp;' : char;
        htmlContent += `<span style="animation-delay: ${delay}s">${content}</span>`;
        
        delay += 0.05;
    });

    marqueeText.innerHTML = htmlContent;
}

// 2. Função Principal de Animação (Ida e Volta Horizontal)
function animateMarquee() {
    const screenWidth = screen.clientWidth;
    const textWidth = marqueeText.clientWidth;
    const maxPosition = screenWidth - textWidth; 

    const variableSpeed = baseSpeed + (Math.sin(Date.now() / 1000) * speedVariation);
    
    position += variableSpeed * direction;

    if (direction === 1) { 
        if (position >= maxPosition) {
            position = maxPosition; 
            direction = -1;
        }
    } else {
        if (position <= 0) {
            position = 0; 
            direction = 1;
        }
    }

    marqueeText.style.left = `${position}px`;
    requestAnimationFrame(animateMarquee);
}

// ----------------------------------------------------
// Lógica do Rastro Mágico do Cursor (CORRIGIDA)
// ----------------------------------------------------

const cursorTrail = document.getElementById('cursor-trail');
// Não precisamos mais do array 'particles' se gerarmos de forma espaçada
let lastSparkleTime = 0;
const sparkleInterval = 50; // Cria uma nova partícula a cada 50ms (mais espaçado e performático)

// Função que cria e anima uma nova partícula
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Posição inicial
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    cursorTrail.appendChild(sparkle);

    // Anima a partícula
    setTimeout(() => {
        const endX = x + (Math.random() - 0.5) * 50; 
        const endY = y + (Math.random() - 0.5) * 50;
        
        sparkle.style.transform = `translate(${endX - x}px, ${endY - y}px)`;
        sparkle.style.opacity = 0;
        
    }, 10);

    // Remove a partícula após 1 segundo
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000); 
}

// Ouve o movimento do mouse
document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    
    // Verifica se já passou tempo suficiente desde a última partícula
    if (currentTime - lastSparkleTime > sparkleInterval) {
        createSparkle(e.clientX, e.clientY);
        lastSparkleTime = currentTime;
    }
});


// Inicia as funções principais ao carregar o script
initializeTextWave();
animateMarquee();