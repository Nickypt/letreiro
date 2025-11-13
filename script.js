// script.js (COMPLETO E ATUALIZADO)

// === Definições Iniciais ===
const marqueeText = document.getElementById('marqueeText');
const screen = document.querySelector('.screen');
const textContent = marqueeText.getAttribute('data-text'); 

// Parâmetros da Animação do Letreiro
const baseSpeed = 0.6; 
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
// Efeito Tipográfico ao Clicar
// ----------------------------------------------------

function distortText() {
    const letters = marqueeText.querySelectorAll('span');
    
    letters.forEach(span => {
        const randomRotate = (Math.random() * 20) - 10;
        const randomTranslateY = (Math.random() * 20) - 10;
        
        span.style.transition = 'transform 0.1s ease-out';
        span.style.transform = `translateY(${randomTranslateY}px) rotate(${randomRotate}deg)`;
        
        setTimeout(() => {
            span.style.transition = 'transform 0.4s ease-in-out'; 
            span.style.transform = 'translateY(0) rotate(0deg)';
        }, 200); 
    });
}

screen.addEventListener('click', distortText);


// ----------------------------------------------------
// Lógica do Rastro Mágico do Cursor (AGORA CORRIGIDA)
// ----------------------------------------------------

const cursorTrail = document.getElementById('cursor-trail');
let lastSparkleTime = 0;
const sparkleInterval = 50; 

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    // ✅ CORREÇÃO: Define a opacidade para 1 ANTES de ser adicionada, garantindo visibilidade inicial
    sparkle.style.opacity = '1';
    
    cursorTrail.appendChild(sparkle);

    setTimeout(() => {
        const endX = x + (Math.random() - 0.5) * 50; 
        const endY = y + (Math.random() - 0.5) * 50;
        
        // Isso ativa a transição CSS (move e fade-out para opacity: 0)
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
initializeTextWave(textContent); 
animateMarquee();