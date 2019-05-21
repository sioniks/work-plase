$(document).on('click', '.faq__listitem', function () {
  if ($(this).hasClass('is-active')) {
    $(this).removeClass('is-active');
  } else {
    $('.faq__listitem').removeClass('is-active');
    $(this).addClass('is-active');
  }


});

$(document).ready(function () {
  $('.faq__listitem:nth-child(1)').addClass('default-visible');
  $('.faq__listitem:nth-child(2)').addClass('default-visible');
  $('.faq__listitem:nth-child(3)').addClass('default-visible');
});


$(document).on('click', '.faq-btn', function () {
  $('.faq__listitem').toggleClass('is-visible');
});
