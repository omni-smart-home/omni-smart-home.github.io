window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: false,
			autoplay: false,
			autoplaySpeed: 3000,
			breakpoints: [
				{changePoint: 480, slidesToShow: 1, slidesToScroll: 1},
				{changePoint: 640, slidesToShow: 1, slidesToScroll: 1},
				{changePoint: 768, slidesToShow: 1, slidesToScroll: 1}
			],
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Pause the playing media whenever a carousel moves to another slide.
    for (var i = 0; i < carousels.length; i++) {
    	carousels[i].on('before:show', function() {
    		pauseAllMedia();
    	});
    }

    // Only one video or audio clip plays at a time.
    document.querySelectorAll('video, audio').forEach(function(media) {
      media.addEventListener('play', function() {
        pauseAllMedia(media);
      });
    });

    // Benchmark samples: Synthetic / Real-world toggle. The real-world carousel starts
    // hidden, so it is attached the first time its pane is shown (it cannot measure
    // itself while hidden).
    var realCarousel = null;
    document.querySelectorAll('[data-sample-domain]').forEach(function(tab) {
      tab.addEventListener('click', function() {
        var domain = tab.getAttribute('data-sample-domain');
        pauseAllMedia();
        document.querySelectorAll('[data-sample-domain]').forEach(function(t) {
          t.classList.toggle('is-active', t === tab);
        });
        document.querySelectorAll('[data-sample-pane]').forEach(function(pane) {
          pane.classList.toggle('is-hidden', pane.getAttribute('data-sample-pane') !== domain);
        });
        if (domain === 'real' && !realCarousel && document.getElementById('real-carousel')) {
          realCarousel = bulmaCarousel.attach('#real-carousel', options)[0];
          realCarousel.on('before:show', function() {
            pauseAllMedia();
          });
        }
        // Visible carousels re-measure their slides on resize.
        window.dispatchEvent(new Event('resize'));
      });
    });

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        pauseAllMedia();
      }
    });

    bulmaSlider.attach();
})

function pauseAllMedia(except) {
  document.querySelectorAll('video, audio').forEach(function(media) {
    if (media !== except) {
      media.pause();
    }
  });
}

