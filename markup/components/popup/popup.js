$(document).on('click', '.close-popup', function () {
  $(this).closest('.popup').addClass('is-closed');
  $(this).closest('.popup').removeClass('is-opened');
});

$(document).on('click', '.popup-sublayer', function () {
  $(this).closest('.popup').addClass('is-closed');
  $(this).closest('.popup').removeClass('is-opened');
});


$(document).on('click', '.open-request-form', function () {
  $('.popup__request-wrap').removeClass('is-closed');
  $('.popup__request-wrap').addClass('is-opened');
});

$(document).on('click', '.popap__city-yes', function () {
  let city = $('.header .city .custom-option[data-value="1"]');
  let currCity = city.data('name');
  $(this).closest('.popup').addClass('is-closed');
  setCookie('city', 1, {
    expires: 36000,
    path: '/'
  });

  setCookie('city-name', currCity, {
    expires: 36000,
    path: '/'
  });
  location.reload();
});


$('.subscribe-form').submit(function (e) {
  e.preventDefault();
  let _data = $(this).serialize();
  let error = false;

  let emailValue = $(this).find('input[name=email]').val();
  let email = $(this).find('input[name=email]');

  if (validateEmail(emailValue) == false) {
    email.parent().addClass('has-error');
    error = true;
  } else {
    email.parent().removeClass('has-error');
    $(this).find('.over').toggleClass('done');
    setTimeout(function () {
      $('.subscribe-form .over').toggleClass('done');
    }, 5000);
  }

  if (error == true) {
    return false;
  }
  $.ajax({
    url: '/api/subscribe/',
    type: 'POST',
    data: _data,
    dataType: 'json',
    success: function () {
      $('input').val('');
    }
  });
});

$('.full-form').submit(function (e) {
  e.preventDefault();

  let action = $(this).attr('action');
  let method = $(this).attr('method');
  let error = false;
  // TODO - make validation
  $(this).find('.input-group').each(function () {
    console.log(111);
    if ($(this).hasClass('required')) {
      let input = $(this).find('.input-field');
      if (input.val() == '' || input.val() == ' ') {
        input.parent().addClass('has-error');
        error = true;
      } else {
        input.parent().removeClass('has-error');
      }
    }

    if ($(this).find('input[name=tel]').length) {
      let tel = $(this).find('.input-field');
      if (tel.val().length < 10) {
        tel.parent().addClass('has-error');
        error = true;
      } else {
        tel.parent().removeClass('has-error');
      }
    }
    if ($(this).find('input[name=email]').length) {
      let emailValue = $(this).find('.input-field').val();
      let email = $(this).find('.input-field');
      if (validateEmail(emailValue) == false) {
        email.parent().addClass('has-error');
        error = true;
      } else {
        email.parent().removeClass('has-error');
      }
    }
  });

  if (error == true) {
    return false;
  }

  let _data = $(this).serialize();

  $.ajax({
    url: action,
    type: method,
    data: _data,
    dataType: 'json',
    success: function () {
      $('input.for-cleared').val('');
      $('textarea').val('');
      $('.popup.is-opened').addClass('is-closed');
      $('.popup.is-opened').removeClass('is-opened');
      $('.popup__thanks-wrap').removeClass('is-closed');
      $('.popup__thanks-wrap').addClass('is-opened');
      // setTimeout(() => {
      //   $('.popup__thanks-wrap').addClass('is-closed');
      //   $('.popup__thanks-wrap').removeClass('is-opened');
      // }, 3500);
    }
  });
});

function validateEmail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[­[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

$(document).on('click', '.open-reserv', function () {
  $('.popup__reserved-wrap').removeClass('is-closed');
  $('.popup__reserved-wrap').addClass('is-opened');
});

$(document).on('click', '.open-feedback', function () {
  $('.popup__feedback-wrap').removeClass('is-closed');
  $('.popup__feedback-wrap').addClass('is-opened');
});

$(document).on('click', '.open-request', function () {
  $('.popup__request-wrap').removeClass('is-closed');
  $('.popup__request-wrap').addClass('is-opened');
});


$(document).ready(function () {
  $('input[name=tel]').inputmask({
    'mask': '+38 (999) 999-9999',
    'clearIncomplete': true,
    'showMaskOnHover': false
  });
});

$(document).on('focus', 'input', function () {
  $(this).closest('.input-group').removeClass('has-error');
  $(this).closest('.info__wrap-input').removeClass('has-error');
});
