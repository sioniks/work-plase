$(document).ready(function () {
  let userAgent = window.navigator.userAgent;
  if (userAgent.match(/(iPad|iPhone|iPod)/i)) {
    document.body.classList.add('is-iphone');
  }

  $('.custom-select').each(function () {
    let classes = $(this).attr('class');
    let template = '<div class="' + classes + '">';
    template += '<span class="custom-select-trigger">' + $(this).find('.item:first-child()').text() + '</span>';
    template += '<div class="custom-options">';
    $(this).find('option').each(function () {
      let name = $(this).data('name');

      template += '<span class="custom-option ' + $(this).attr('class') + '" data-value="' + $(this).attr('value') + '" data-name="' + name + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });

  let currCityId = getCookie('city');
  let cityOnChange = $('.city [data-value="' + currCityId + '"]').data('name');
  setCookie('city-name', cityOnChange, {
    expires: 36000,
    path: '/'
  });

  let currCity = getCookie('city-name');
  let trCity = document.getElementById('tr-city').value;

  let firstCity = document.querySelector('.city .custom-option:first-child').dataset.name;

  if (currCity === undefined || currCity == 'undefined') {
    $('.city .custom-select-trigger').text('Киев');
    $('.popup__city-wrap .city .custom-select-trigger').text(trCity);
    $('#reserve-city').val(firstCity);
    $('#reserve-city-hidden').val('1');
    console.log(firstCity);

  } else {
    $('.city .custom-select-trigger').text(currCity);
    $('.popup__city-wrap .city .custom-select-trigger').text(trCity);
    $('#reserve-city').val(currCity);
    $('#reserve-city-hidden').val(currCityId);
    console.log(firstCity);
  }

  setTimeout(() => {
    let currentLang = $('.current-lang').val();
    $('.js-drop.lang .custom-select-trigger').text(currentLang);
    $('[data-value="' + currentLang + '"]').addClass('is-active');
  }, 300);

  $('.custom-select .custom-option').removeClass('selection');
  $('.custom-select [data-name="' + currCity + '"]').addClass('selection');

  $('.custom-option:first-of-type').hover(function () {
    $(this).parents('.custom-options').addClass('option-hover');
  }, function () {
    $(this).parents('.custom-options').removeClass('option-hover');
  });



  $('.custom-option').on('click', function () {
    $(this).parents('.custom-select-wrapper').find('select').val($(this).data('value'));
    $(this).closest('.custom-options').find('.custom-option').removeClass('selection');
    $(this).addClass('selection');
    $(this).parents('.custom-select').removeClass('opened');
    $(this).parents('.custom-select').find('.custom-select-trigger').text($(this).text());
  });

  let cityLength = document.querySelectorAll('.header .city .custom-option').length;

  if (cityLength > 1) {
    if (currCity === undefined || currCity == 'undefined') {
      $('.popup__city-wrap').removeClass('is-closed');
    }
  }

  if (document.querySelector('.blog__wrap')) {
    let cityId = getCookie('city');
    let urls = '?BlogSearch[city_id]=' + cityId;
    if (document.querySelector('#p0')) {
      $.pjax.reload({
        url: urls,
        container: '#p0'
      });
    }
  } else if (document.querySelector('.locations-section')) {
    let cityId = getCookie('city');
    let urls = '?LocationSearch[city_id]=' + cityId;
    if (document.querySelector('#p0')) {
      $.pjax.reload({
        url: urls,
        container: '#p0'
      });
    }
  } else if (document.querySelector('.events__wrap')) {
    let cityId = getCookie('city');
    let urls = '?EventSearch[city_id]=' + cityId;
    if (document.querySelector('#p0')) {
      $.pjax.reload({
        url: urls,
        container: '#p0'
      });
    }
  }

  selectLink();

});
$(document).on('click', '.custom-select-trigger', function (e) {
  if ($(this).parents('.js-drop').hasClass('opened')) {
    $('.js-drop').removeClass('opened');
  } else {
    $('.js-drop').removeClass('opened');
    $(this).parents('.js-drop').addClass('opened');
  }
  e.stopPropagation();
});


// $(document).on('click', function (event) {
//   let $select = $('.custom-select');
//   if (event.target != $select) {
//     $('.custom-select').removeClass('opened');
//     // eslint-disable-next-line no-alert
//     // alert(event.target);
//   }
// });

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  let expires = options.expires;

  if (typeof expires == 'number' && expires) {
    let d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + '=' + value;

  for (let propName in options) {
    updatedCookie += '; ' + propName;
    let propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
}

$(document).on('click', '.city .custom-option', function () {
  let cityId = $(this).data('value');
  let cityName = $(this).data('name');

  setCookie('city', cityId, {
    expires: 36000,
    path: '/'
  });

  setCookie('city-name', cityName, {
    expires: 36000,
    path: '/'
  });


});

$(document).on('click', '.city.reload .custom-option', function () {
  setCookie('preloader', '1', {
    path: '/'
  });

  setTimeout(function () {
    location.reload();
  }, 300);
});

let selectLink = function selectLink() {
  $('.custom-select-link').each(function () {
    let classes = $(this).attr('class');
    let template = '<div class="' + classes + '">';
    template += '<span class="custom-select-trigger"></span>';
    template += '<div class="custom-options">';
    $(this).find('option').each(function () {
      let link = $(this).data('link');
      template += '<a href="' + link + '" class="custom-option ' + $(this).attr('class') + '" data-value="' + $(this).attr('value') + '">' + $(this).html() + '</a>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);

    $('.custom-option:first-of-type').hover(function () {
      $(this).parents('.custom-options').addClass('option-hover');
    }, function () {
      $(this).parents('.custom-options').removeClass('option-hover');
    });

    // $('.custom-select-trigger').on('click', function (e) {
    //   if ($(this).parents('.js-drop').hasClass('opened')) {
    //     $('.js-drop').removeClass('opened');
    //   } else {
    //     $('.js-drop').removeClass('opened');
    //     $(this).parents('.js-drop').addClass('opened');
    //   }
    //   e.stopPropagation();
    // });
    // $('.custom-option').on('click', function (e) {
    //   // e.preventDefault();
    //   $(this).closest('.custom-select-wrapper').find('select').val($(this).data('value'));
    //   $(this).closest('.custom-options').find('.custom-option').removeClass('selection');
    //   $(this).addClass('selection');
    //   $(this).closest('.custom-select-link').removeClass('opened');
    //   $(this).closest('.custom-select-link').find('.custom-select-trigger').text($(this).text());
    // });
  });
};

// start pjax sort pagination
$(document).on('click', '.blog__wrap .take-posts .custom-option', function () {
  let categoryId = $(this).data('value');
  let categoryTime = $('.take-time .custom-option.selection').data('value');
  let urls = '?BlogSearch[category_id]=' + categoryId + '&BlogSearch[time]=' + categoryTime;

  $.pjax.reload({
    url: urls,
    container: '#p0'
  });
});

$(document).on('click', '.blog__wrap .take-time .custom-option', function () {
  let categoryId = $('.take-posts .custom-option.selection').data('value');
  let categoryTime = $(this).data('value');
  let urls = '?BlogSearch[category_id]=' + categoryId + '&BlogSearch[time]=' + categoryTime;
  $.pjax.reload({
    url: urls,
    container: '#p0'
  });
});

$(document).on('click', '.locations-section .take-city .custom-option', function () {
  let cityId = $(this).data('value');
  let urls = '?LocationSearch[city_id]=' + cityId;

  $.pjax.reload({
    url: urls,
    container: '#p0'
  });
});
// end pjax sort pagination


// $(document).on('click', '.events-all .custom-option', function () {
//   let cityId = $('.filter-city .custom-option.selection').data('value') ? $('.filter-city .custom-option.selection').data('value') : 1;
//   let categoryId = $('.filter-events .custom-option.selection').data('value') ? $('.filter-events .custom-option.selection').data('value') : 1;
//   let locationId = $('.filter-location .custom-option.selection').data('value') ? $('.filter-location .custom-option.selection').data('value') : 1;
//   let time = $('.filter-date .custom-option.selection').data('value') ? $('.filter-date .custom-option.selection').data('value') : 1;
//   let urls = '?EventSearch[city_id]=' + cityId + '&EventSearch[category_id]=' + categoryId + '&EventSearch[location_id]=' + locationId + '&EventSearch[time]=' + time;

//   $.pjax.reload({
//     url: urls,
//     container: '#p0'
//   });
// });

$(document).on('click', '.city-change', function () {
  let $cityId = $(this).data('value');
  let $cityName = $(this).data('name');
  $('.take-city .custom-select-wrapper').find('select').val($cityId);
  $('.take-city .custom-options').find('.custom-option').removeClass('selection');
  $('.custom-option[data-value="' + $cityId + '"]').addClass('selection');
  $(this).parents('.custom-select-link').removeClass('opened');
  $('.take-city').find('.custom-select-trigger').text($cityName);
  location.reload();
});


// // reload page on event page

// $(document).on('click', '.filter-city .custom-option', function () {
//   setTimeout(function () {
//     location.reload();
//   }, 200);
// });
