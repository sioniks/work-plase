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

  // eslint-disable-next-line guard-for-in
  for (let propName in options) {
    updatedCookie += '; ' + propName;
    let propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
}


function ready() {
  let preloader = document.getElementById('preloader');

  if (!getCookie('preloader')) {

    preloader.classList.add('active');


    setTimeout(function () {
      preloader.classList.remove('active');
      setCookie('preloader', 1, {
        expires: 259200,
        path: '/'
      });
    }, 4000);
  }
}

document.addEventListener('DOMContentLoaded', ready);
