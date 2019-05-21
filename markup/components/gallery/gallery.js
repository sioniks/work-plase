$(document).ready(function () {
  let windowW = window.innerWidth;

  if (windowW < 768) {
    // eslint-disable-next-line no-var
    var owl = $('.gallery_min').owlCarousel({
      loop: true,
      items: 1,
      nav: true,
      navText: [
        '<button class="gallery__control prev">&#10094;</button>',
        '<button class="gallery__control next">&#10095;</button>'
      ],
      responsive: {
        480: {
          items: 2
        }
      }
    });
  } else {
    // eslint-disable-next-line no-var
    owl = $('.gallery_max').owlCarousel({
      loop: true,
      items: 2,
      // nav: true,
      navText: [
        '<span class="gallery__control prev">&#10094;</span>',
        '<span class="gallery__control next">&#10095;</span>'
      ],
      responsive: {
        1200: {
          items: 4,
          // nav: true,
        }
      }
    });
  }

  $('[data-fancybox="gallery"]').fancybox({
    preventCaptionOverlap: true,
    buttons: [
      'close'
    ],
  });


  $('.gallery__control.next').click(function () {
    owl.trigger('owl.next');
  });
  $('.gallery__control.prev').click(function () {
    owl.trigger('owl.prev');
  });

});
