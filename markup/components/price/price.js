let $win = $(window);
let $marker = $('#colormarker');
let $wrap = $('.anim__wrap');
let $header = $('.header__wrap');

if ($('.anim__wrap').length) {
  $win.scroll(function () {

    if ($win.scrollTop() + $win.height() * 0.8 >= $marker.offset().top && $win.scrollTop() <= ($marker.offset().top + $marker.height() * 0.8)) {
      $wrap.addClass('full');
      $header.addClass('full');
    } else {
      $wrap.removeClass('full');
      $header.removeClass('full');
    }
  });

}

let windowW = window.innerWidth;

$(document).on('click', '.price__nav-item', function () {

  $('.price__nav-item').removeClass('is-active');
  $(this).addClass('is-active');

  if (windowW < 768) {
    $('html, body').animate({
      scrollTop: $('#sliders__wrap').offset().top - 80
    }, 1000);
  }
});

$(document).on('click', '.go-to-request', function () {
  let loc = document.location.toString().split('#')[0];
  document.location = loc + '#colormarker';
  return false;
});

$(document).ready(function () {
  let d = new Date();
  let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  // console.log(months[d.getMonth()]);
  $('#date').val(months[d.getMonth()]);
  setTimeout(() => {
    $('#full-form').find('.custom-select-trigger').text(months[d.getMonth()]);
  }, 1000);

  $('.count-btn').on('click', function () {

    let $button = $(this),
      newVal = '',
      oldValue = $(this).closest('.people-count').find('input').val();

    if ($button.text() === '+') {
      if (oldValue <= 99) {
        newVal = parseFloat(oldValue) + 1;
      } else {
        newVal = 100;
      }
    } else {
      // Don't allow decrementing below zero
      if (oldValue >= 2) {
        newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 1;
      }
    }

    $(this).closest('.people-count').find('input').val(newVal);


  });
});
