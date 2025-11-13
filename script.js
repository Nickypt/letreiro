// script.js (COMPLETO E ATUALIZADO)

// === Definições Iniciais ===
const marqueeText = document.getElementById('marqueeText');
const screen = document.querySelector('.screen');

// Texto fixo do HTML
const textContent = marqueeText.getAttribute('data-text'); 

// Parâmetros da Animação do Letreiro
const baseSpeed = 0.6; // Movimento lento e suave
const speedVariation = 0.5;
let position = 0; 
let direction = 1;

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
    // Usa scrollWidth para obter a largura real do texto (correto para letreiros)
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
// Lógica do Rastro Mágico do Cursor
// ----------------------------------------------------

const cursorTrail = document.getElementById('cursor-trail');
let lastSparkleTime = 0;
const sparkleInterval = 50; 

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    cursorTrail.appendChild(sparkle);

    setTimeout(() => {
        const endX = x + (Math.random() - 0.5) * 50; 
        const endY = y + (Math.random() - 0.5) * 50;
        
        sparkle.style.transform = `translate(${endX - x}px, ${endY - y}px)`;
        sparkle.style.opacity = 0;
        
    }, 10);

    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000); 
}

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    
    if (currentTime - lastSparkleTime > sparkleInterval) {
        createSparkle(e.clientX, e.clientY);
        lastSparkleTime = currentTime;
    }
});


// === Inicialização do Projeto ===
// Inicia com o texto fixo do HTML
initializeTextWave(textContent); 

// Inicia o movimento do letreiro
animateMarquee();