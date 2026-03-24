(() => {
  const parseNumberFromHash = value => {
    console.log({ value });
    try {
      return parseInt(value.replace('#', ''));
    } catch {
      return 0;
    }
  };

  const slides = Array.from(document.querySelectorAll('a[href^="#"][name]'));

  const firstSlide = slides[0];
  const lastSlide = slides[slides.length - 1];

  const minSlides = parseNumberFromHash(firstSlide.getAttribute('href'));
  const maxSlides = parseNumberFromHash(lastSlide.getAttribute('href'));

  let currentSlide = location.hash ? parseNumberFromHash(location.hash) : 0;

  document.body.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      currentSlide = Math.max(currentSlide - 1, minSlides);
      location.hash = currentSlide;
    } else if (e.key === 'ArrowRight') {
      currentSlide = Math.min(currentSlide + 1, maxSlides);
      location.hash = currentSlide;
    }
  });

  window.addEventListener('hashchange', e => {
    currentSlide = parseNumberFromHash(location.hash);
  });

  slides.map(slide => {
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            currentSlide = parseNumberFromHash(
              entry.target.getAttribute('href')
            );

            history.replaceState(
              null,
              '',
              `${window.location.pathname}#${currentSlide}`
            );
          }
        });
      },
      {
        threshold: 1
      }
    ).observe(slide);
  });
})();
