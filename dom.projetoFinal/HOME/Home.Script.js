const loadingStartedAt = performance.now();
const minimumLoadingTime = 10000;

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener(
    "load",
    () => {
      const tempoDecorrido = performance.now() - loadingStartedAt;
      const tempoRestante = Math.max(0, minimumLoadingTime - tempoDecorrido);

      setTimeout(() => {
        const loadingScreen = document.getElementById("loading-screen");

        if (loadingScreen) {
          loadingScreen.classList.add("is-complete");
          setTimeout(() => {
            document.body.classList.remove("is-loading");
            document.body.setAttribute("aria-busy", "false");
            document.body.classList.add("page-ready");
            loadingScreen.classList.add("is-hidden");
            setTimeout(() => loadingScreen.remove(), 500);
          }, 900);
        } else {
          document.body.classList.remove("is-loading");
          document.body.setAttribute("aria-busy", "false");
          document.body.classList.add("page-ready");
        }
      }, tempoRestante);
    },
    { once: true },
  );

  // ---------- Animações de entrada ao rolar a página ----------
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Os links do menu (Início, Animais, Cadastrar animais) agora levam a
  // páginas reais, então usamos a navegação padrão do navegador — sem
  // interceptar o clique. O botão "Encontrar um amigo" também navega
  // direto (ver atributo onclick no HTML).

  // ---------- Carrossel de imagens do hero ----------
  const carousel = document.getElementById("heroCarousel");
  if (carousel) {
    const slides = Array.from(
      carousel.querySelectorAll(".hero-carousel-slide"),
    );
    const dotsWrap = carousel.querySelector(".hero-carousel-dots");
    const btnPrev = carousel.querySelector(".hero-carousel-btn.prev");
    const btnNext = carousel.querySelector(".hero-carousel-btn.next");
    let atual = slides.findIndex((s) => s.classList.contains("is-active"));
    if (atual < 0) atual = 0;
    let timer = null;

    // Cria um dot (bolinha) para cada slide
    const dots = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir para imagem ${i + 1}`);
      if (i === atual) dot.classList.add("is-active");
      dot.addEventListener("click", () => irPara(i));
      dotsWrap?.appendChild(dot);
      return dot;
    });

    function irPara(indice) {
      slides[atual].classList.remove("is-active");
      dots[atual]?.classList.remove("is-active");
      atual = (indice + slides.length) % slides.length;
      slides[atual].classList.add("is-active");
      dots[atual]?.classList.add("is-active");
    }

    const proximo = () => irPara(atual + 1);
    const anterior = () => irPara(atual - 1);

    btnNext?.addEventListener("click", () => {
      proximo();
      reiniciarAutoplay();
    });
    btnPrev?.addEventListener("click", () => {
      anterior();
      reiniciarAutoplay();
    });

    function iniciarAutoplay() {
      timer = setInterval(proximo, 5000);
    }
    function reiniciarAutoplay() {
      clearInterval(timer);
      iniciarAutoplay();
    }

    // Pausa o avanço automático quando o mouse está sobre o carrossel
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", iniciarAutoplay);

    if (slides.length > 1) iniciarAutoplay();
  }
});
