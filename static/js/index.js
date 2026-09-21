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
