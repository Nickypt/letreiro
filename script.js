// script.js (COMPLETO E ATUALIZADO)

// === Definições Iniciais ===
const marqueeText = document.getElementById('marqueeText');
const screen = document.querySelector('.screen');
const textContent = marqueeText.getAttribute('data-text'); 

// Array de cores pastel para o efeito arco-íris
const pastelColors = [
    '#FFD1DC', // Pastel Pink
    '#FADADD', // Light Rose
    '#B0E0E6', // Sky Light (Cyan)
    '#DCDCDC', // Light Gray (Cloud)
    '#6495ED', // Cornflower Blue
    '#DC143C', // Crimson Red (Suit Red - pode ser ajustado para um pastel)
    '#ADD8E6'  // Light Blue
];

// Parâmetros da Animação do Letreiro
const baseSpeed = 0.6; 
const speedVariation = 0.5;
let position = 0; 
let direction = 1;

// Flag para evitar cliques repetidos durante a animação
let isDistorting = false; 

// === 1. Inicializa o Efeito de Onda ===
function initializeTextWave(text) {
    let htmlContent = '';
    let delay = 0;
    
    text.split('').forEach(char => {
        const content = char === ' ' ? '&nbsp;' : char;
        htmlContent += `<span style="animation-delay: ${delay}s">${content}</span>`;
        
        delay += 0.05;
    });

    marqueeText.innerHTML = htmlContent;
}

// === 2. Função Principal de Animação (Ida e Volta Horizontal) ===
function animateMarquee() {
    const screenWidth = screen.clientWidth;
    const textWidth = marqueeText.scrollWidth; 
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
// ✅ NOVO: Efeito Tipográfico Arco-íris Pastel ao Clicar
// ----------------------------------------------------

function distortText() {
    if (isDistorting) return; // Não permite cliques enquanto animando
    isDistorting = true;
    
    const letters = marqueeText.querySelectorAll('span');
    const animationDuration = 3000; // Duração total da animação em milissegundos (3 segundos)
    
    letters.forEach((span, index) => {
        // Usa a posição no texto para determinar a cor do arco-íris
        const color = pastelColors[index % pastelColors.length];
        
        // Aplica a animação no CSS (keyframes criado dinamicamente)
        span.style.animation = `rainbow-wave-${index} 0.5s infinite alternate, temporary-transform 3s forwards`;
        
        // Define keyframes dinâmicos para cada letra (cor e movimento)
        const styleSheet = document.styleSheets[0];
        
        // Define o movimento (para cima/baixo)
        if (!styleSheet.rules || !Array.from(styleSheet.rules).some(rule => rule.name === `rainbow-wave-${index}`)) {
            styleSheet.insertRule(`
                @keyframes rainbow-wave-${index} {
                    0% { 
                        transform: translateY(0px) scale(1);
                        color: ${color}; 
                        text-shadow: 0 0 10px ${color};
                    }
                    50% { 
                        transform: translateY(-12px) scale(1.05); /* Mais para cima */
                        color: ${pastelColors[(index + 1) % pastelColors.length]}; 
                        text-shadow: 0 0 15px ${pastelColors[(index + 1) % pastelColors.length]};
                    }
                    100% {
                        transform: translateY(0px) scale(1);
                        color: ${color}; 
                        text-shadow: 0 0 10px ${color};
                    }
                }
            `, styleSheet.cssRules.length);
        }
    });

    // Remove as animações e restaura o estado original após a duração total
    setTimeout(() => {
        letters.forEach(span => {
            span.style.animation = ''; // Remove as animações dinâmicas
            span.style.transform = '';
            // Força a re-aplicação da animação de onda padrão
            span.style.animation = `wave-text 6s infinite ease-in-out`; 
        });
        isDistorting = false;
    }, animationDuration);
}

screen.addEventListener('click', distortText);


// ----------------------------------------------------
// Lógica do Rastro Mágico do Cursor (Extravagante)
// ----------------------------------------------------

const cursorTrail = document.getElementById('cursor-trail');
let lastSparkleTime = 0;
const sparkleInterval = 20; // 20ms: Geração mais rápida

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    sparkle.style.opacity = '1';
    
    cursorTrail.appendChild(sparkle);

    setTimeout(() => {
        const endX = x + (Math.random() - 0.5) * 70; // Maior dispersão
        const endY = y + (Math.random() - 0.5) * 70;
        
        sparkle.style.transform = `translate(${endX - x}px, ${endY - y}px)`;
        sparkle.style.opacity = 0;
        
    }, 10);

    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1500); // 1.5s de vida
}

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    
    if (currentTime - lastSparkleTime > sparkleInterval) {
        createSparkle(e.clientX, e.clientY);
        lastSparkleTime = currentTime;
    }
});


// === Inicialização do Projeto ===
initializeTextWave(textContent); 
animateMarquee();