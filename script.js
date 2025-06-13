 // Variáveis do player minimalista
        let isMuted = false;
        let currentProgress = 0;
        let progressInterval;

        const audio = document.getElementById('audioPlayer');
        const playPauseBtn = document.getElementById('playPauseBtn');

        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                audio.pause();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-play fa-beat"></i>';
            }
        });

        // Atualize o ícone quando a música terminar
        audio.addEventListener('ended', () => {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play fa-beat"></i>';
        });

        // Inicializar player minimalista
        function initMusicPlayer() {
            startAutoProgress();
        }

        // Simular progresso automático da música
        function startAutoProgress() {
            progressInterval = setInterval(() => {
                currentProgress += 0.2; // Incrementa 0.5% a cada 200ms
                if (currentProgress >= 100) {
                    currentProgress = 0; // Reinicia quando termina
                }
                updateProgressBar();
            }, 200);
        }

        // Atualizar barra de progresso
        function updateProgressBar() {
            document.getElementById('progressFill').style.width = currentProgress + '%';
        }

        // Buscar posição na música
        function seekTo(event) {
            const progressBar = event.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const barWidth = rect.width;
            currentProgress = (clickX / barWidth) * 100;
            updateProgressBar();
        }

    
        // Array de imagens do casal (adicione suas fotos aqui)
        const coupleImages = [
            'photos/photo (1).jpeg',
            'photos/photo (2).jpeg',
            'photos/photo (3).jpeg',
            'photos/photo (4).jpeg',
            'photos/photo (5).jpeg',
            'photos/photo (6).jpeg',
            'photos/photo (7).jpeg',
            'photos/photo (8).jpeg',
            'photos/photo (9).jpeg',
            'photos/photo (10).jpeg',
            'photos/photo (11).jpeg'
        ];

        let currentSlide = 0;
        let autoSlideInterval;

        // Inicializar carrossel
        function initCarousel() {
            const carousel = document.getElementById('carousel');
            const nav = document.getElementById('carouselNav');
            
            // Adicionar imagens
            coupleImages.forEach((src, index) => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Foto do casal ${index + 1}`;
                carousel.appendChild(img);
                
                // Adicionar pontos de navegação
                const dot = document.createElement('div');
                dot.className = 'nav-dot';
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                nav.appendChild(dot);
            });
            
            startAutoSlide();
        }

        // Ir para slide específico
        function goToSlide(index) {
            currentSlide = index;
            const carousel = document.getElementById('carousel');
            const dots = document.querySelectorAll('.nav-dot');
            
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // Próximo slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % coupleImages.length;
            goToSlide(currentSlide);
        }

        // Iniciar slides automáticos
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }

        // Parar slides automáticos
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Criar corações que caem
        function createHearts() {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.className = 'heart';
                    heart.innerHTML = '❤️';
                    heart.style.left = Math.random() * 100 + 'vw';
                    heart.style.animationDelay = Math.random() * 2 + 's';
                    heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
                    
                    document.getElementById('hearts-container').appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, 3000);
                }, i * 100);
            }
        }

        // Criar corações flutuantes de fundo
        function createFloatingHearts() {
            const container = document.getElementById('floatingHearts');
            
            setInterval(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '💕';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
                heart.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
                
                container.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 8000);
            }, 2000);
        }

        // Pausar carrossel quando usuário interage
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });

        // Inicializar aplicação
        document.addEventListener('DOMContentLoaded', function() {
            initCarousel();
            initMusicPlayer();
            createFloatingHearts();
        });

       

        