const Share = {

  go: function (_element, _options) {
    let
      self = Share,
      options = $.extend({
          type: 'fb', // тип соцсети
          url: location.href, // какую ссылку шарим
          title: document.title, // заголовок шаринга
          image: '', // картинка шаринга
          text: '', // текст шаринга
        },
        $(_element).data(), // Если параметры заданы в data, то читаем их
        _options // Параметры из вызова метода имеют наивысший приоритет
      );

    if (self.popup(link = self[options.type](options)) === null) {
      // Если не удалось открыть попап
      if ($(_element).is('a')) {
        // Если это <a>, то подставляем адрес и просим браузер продолжить переход по ссылке
        $(_element).prop('href', link);
        return true;
      } else {
        // Если это не <a>, то пытаемся перейти по адресу
        location.href = link;
        return false;
      }
    } else {
      // Попап успешно открыт, просим браузер не продолжать обработку
      return false;
    }
  },

  // Facebook
  // fb: function (_options) {
  //   let options = $.extend({
  //     url: location.href,
  //     title: document.title,
  //     image: '',
  //     text: '',
  //   }, _options);

  //   return 'http://www.facebook.com/sharer.php?s=100' +
  //     '&p[title]=' + encodeURIComponent(options.title) +
  //     '&p[summary]=' + encodeURIComponent(options.text) +
  //     '&p[url]=' + encodeURIComponent(options.url) +
  //     '&p[images][0]=' + encodeURIComponent(options.image);
  // },

  // LinkedIn
  li: function (_options) {
    let options = $.extend({
      url: location.href,
      title: document.title,
      text: ''
    }, _options);

    return 'http://www.linkedin.com/shareArticle?mini=true' +
      '&url=' + encodeURIComponent(options.url) +
      '&title=' + encodeURIComponent(options.title) +
      '&summary=' + encodeURIComponent(options.text);
  },

  // Открыть окно шаринга
  popup: function (url) {
    return window.open(url, '', 'toolbar=0,status=0,scrollbars=1,width=626,height=436');
  }
};


$(document).on('click', '.social__link.li', function (event) {
  Share.go(this);
  sendCountSocial(event);
});



$(document).ready(function () {
  if ($('#shareBtn').length) {
    document.getElementById('shareBtn').onclick = function (event) {
      sendCountSocial(event);
      let url = location.href;
      FB.ui({
        method: 'share',
        display: 'popup',
        href: url,
      }, function (response) {});
    };
  }
});

function sendCountSocial(event) {
  let fb = $('.facebook').text();
  let lin = $('.linkedin').text();
  let socId = $('#social_id').val();
  let socType = $('#social_type').val();

  if (event.target.classList.contains('fb')) {
    fb++;
  } else {
    lin++;
  }
  $.ajax({
    type: 'POST',
    url: '/api/social/',
    data: {
      facebook: fb,
      linkedin: lin,
      type: socType,
      id: socId
    }
  });
}
