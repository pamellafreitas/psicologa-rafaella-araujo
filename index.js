/* ═══════════════════════════════════════════════
   INDEX.JS — Rafaella Araújo Psicóloga
   Página Inicial
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Garantia de loop suave no ticker ──
  // O loop é feito via CSS (translateX -50%) com conteúdo duplicado no HTML.
  // Aqui garantimos que o elemento existe e está visível.
  const tickerContent = document.getElementById('ticker-content');
  if (tickerContent) {
    tickerContent.style.display = 'flex';
  }

  // ── Pausa o ticker quando o mouse estiver em cima (acessibilidade) ──
  const tickerSection = document.querySelector('.ticker-section');
  if (tickerSection) {
    tickerSection.addEventListener('mouseenter', () => {
      if (tickerContent) {
        tickerContent.style.animationPlayState = 'paused';
      }
    });
    tickerSection.addEventListener('mouseleave', () => {
      if (tickerContent) {
        tickerContent.style.animationPlayState = 'running';
      }
    });
  }

  // ── Efeito parallax suave na imagem de fundo do hero (desktop) ──
  const heroBg = document.querySelector('.hero-bg-image');
  if (heroBg && window.innerWidth > 992) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.25;
      heroBg.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
  }

  // ── Micro-animação de entrada das fotos no hero ──
  // Já tratada via CSS animation, mas aqui garantimos que se IntersectionObserver
  // não estiver disponível, as fotos ficam visíveis.
  const photos = document.querySelectorAll('.hero-photo');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    photos.forEach(photo => observer.observe(photo));
  } else {
    // Fallback: garante visibilidade
    photos.forEach(photo => {
      photo.style.opacity = '1';
    });
  }

  // ── Hover sutil nas fotos: leve translateY ──
  const photoMain = document.getElementById('photo-main');
  if (photoMain) {
    photoMain.addEventListener('mouseenter', () => {
      photoMain.style.transition = 'transform 0.4s ease';
      photoMain.style.transform = 'translateY(-6px)';
    });
    photoMain.addEventListener('mouseleave', () => {
      photoMain.style.transform = 'translateY(0)';
    });
  }

  // ── Controle do slider de depoimentos ──
  const depoSlider = document.getElementById('depo-slider');
  const depoPrev = document.getElementById('depo-prev');
  const depoNext = document.getElementById('depo-next');

  if (depoSlider && depoPrev && depoNext) {
    depoPrev.addEventListener('click', () => {
      // Pega a largura do primeiro card visível + gap aproximado
      const cardWidth = depoSlider.querySelector('.depo-card').offsetWidth + 24;
      depoSlider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    depoNext.addEventListener('click', () => {
      const cardWidth = depoSlider.querySelector('.depo-card').offsetWidth + 24;
      depoSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }

  // ── Animações de Entrada ao Rolar (Scroll Animations) ──
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          scrollObserver.unobserve(entry.target); // Anima apenas uma vez
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px', // Aciona quando o elemento estiver 50px dentro da tela
      threshold: 0.1
    });

    scrollElements.forEach(el => scrollObserver.observe(el));
  } else {
    // Fallback caso o navegador não suporte IntersectionObserver
    scrollElements.forEach(el => {
      el.classList.add('animate-active');
    });
  }

});
