(function () {
    const pendingSlides = Array.from(document.querySelectorAll('.bg-slideshow [data-background]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!pendingSlides.length || reduceMotion) return;

    function loadBackground(slide) {
        const source = slide.dataset.background;
        if (!source) return;

        const image = new Image();
        image.decoding = 'async';
        image.onload = function () {
            slide.style.backgroundImage = `url("${source}")`;
            slide.removeAttribute('data-background');
        };
        image.src = source;
    }

    function scheduleBackground(slide, delay) {
        window.setTimeout(function () {
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(function () {
                    loadBackground(slide);
                }, { timeout: 1500 });
                return;
            }
            loadBackground(slide);
        }, delay);
    }

    window.addEventListener('load', function () {
        pendingSlides.forEach(function (slide, index) {
            scheduleBackground(slide, index * 3500);
        });
    }, { once: true });
}());
