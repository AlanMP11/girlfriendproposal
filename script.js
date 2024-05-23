document.addEventListener('DOMContentLoaded', (event) => {
    let currentPage = 0;
    const pages = document.querySelectorAll('.page');
    const startPage = document.getElementById('startPage');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const particlesContainer = document.querySelector('.particles');
    const numParticles = 50;
    const button = document.querySelector('.badge');

    // Función para activar el efecto de hover
    function activateHover() {
        button.classList.add('hover-effect');
    }

    function showPage(index) {
        if (index < pages.length) {
            pages.forEach(page => page.classList.remove('active', 'exiting'));
            if (index > 0) {
                pages[index - 1].classList.add('exiting');
            }
            pages[index].classList.add('active');
        }
    }

    window.nextPage = function() {
        currentPage++;
        if (currentPage < pages.length) {
            showPage(currentPage);
        }
    }

    window.showAnswer = function(answer) {
        const answerText = document.getElementById('answerText');
        if (answer === 'yes') {
            answerText.textContent = '¡Sí! ¡Aqui comienza nuestra historia!';
            activateHover();
        } else {
            answerText.textContent = 'Oh, bueno, gracias por ser honesta.';
        }
        showPage(pages.length - 1);
    }

    window.moveNoButton = function() {
        const noButton = document.getElementById('noButton');
        const content = document.getElementById('content');
        const contentRect = content.getBoundingClientRect();
        const maxLeft = contentRect.width - noButton.offsetWidth;
        const maxTop = contentRect.height - noButton.offsetHeight;

        const newLeft = Math.floor(Math.random() * maxLeft);
        const newTop = Math.floor(Math.random() * maxTop);

        noButton.style.position = 'absolute';
        noButton.style.left = `${newLeft}px`;
        noButton.style.top = `${newTop}px`;
    }

    window.startExperience = function() {
        startPage.classList.add('exiting');
        setTimeout(() => {
            startPage.style.display = 'none';
            showPage(currentPage);
            backgroundAudio.play();
        }, 500);
    }

    // Función para generar una partícula aleatoria
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 20}px`;
        particle.style.height = particle.style.width;
        particle.style.top = `${Math.random() * 70}vh`;
        particle.style.left = `${Math.random() * 70}vw`;
        particlesContainer.appendChild(particle);
        setTimeout(() => {
            particle.remove(); // Eliminar la partícula después de cierto tiempo para evitar acumulación
        }, 10000); // 10 segundos
    }

    // Generar partículas iniciales
    for (let i = 0; i < numParticles; i++) {
        createParticle();
    }

    // Generar nuevas partículas periódicamente
    setInterval(createParticle, 100);

    startPage.classList.add('active');
});
