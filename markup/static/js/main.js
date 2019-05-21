'use strict';

// для скролла на главной используется класс .hs на секциях

const APP = {

  // =============used plagin

  pluginsInit() {


  },
  headerJs: {
    vars: {
      mobileMenuWrap: $('.header__menu'),
    },
    openMenu() {
      $('.header__menu').addClass('open');
    },
    closeMenu() {
      $('.header__menu').removeClass('open');
    },
    attachEvents() {
      const $open = $('.menu__mobile-open'),
        $close = $('.menu__mobile-close');

      $open.on('click', function () {
        APP.headerJs.openMenu();
      });

      $close.on('click', function () {
        APP.headerJs.closeMenu();
      });
    },
    init() {
      APP.headerJs.attachEvents();
    },
  },

  responsive: {
    deviceWidth: {
      desctop: 1600,
      laptop: 1280,
      tablet: 768
    },
    reloadPage(deviceWidth, windowWidth) {
      let statrtInnerWidth = window.innerWidth;

      $(window).on('resize', function () {
        windowWidth = window.innerWidth;

        if (statrtInnerWidth == windowWidth) {
          return false;
        }

        if (windowWidth <= deviceWidth.tablet) {
          location.reload();
        } else if (windowWidth > deviceWidth.tablet) {
          location.reload();
        }
      });
    },

    checkDeviceWidth() {
      let deviceWidth = APP.responsive.deviceWidth,
        windowWidth = window.innerWidth;

      if (windowWidth >= deviceWidth.laptop) {
        if ($('.section__wrap').length) {
          $('.section__wrap').onepage_scroll({
            sectionContainer: '.hs',
            easing: 'ease',
            animationTime: 1000,
            pagination: false,
            updateURL: false,
            beforeMove: function () {
              if ($('.section-n1').hasClass('active')) {
                $('.header__wrap').addClass('s1');
              } else {
                $('.header__wrap').removeClass('s1');
              }
            },
            afterMove: function () {

            },
            loop: false,
            keyboard: true,
            responsiveFallback: false,
            direction: 'vertical'
          });
        }
      }

      APP.responsive.reloadPage(deviceWidth, windowWidth);
    }
  },
  windowScroll: {
    changeHeader(el) {
      let elHeight = $(el).height();
      $(window).scroll(function () {
        if ($(el).offset().top <= $(window).scrollTop() + 100) {
          $('.active').prev().removeClass('active');
          $(el).addClass('active');
        } else {
          $(el).removeClass('active');
        }


        if ($('.section-n1').hasClass('active')) {
          $('.header__wrap').addClass('s1');
        } else {
          $('.header__wrap').removeClass('s1');
        }

        if ($('.section-n2').hasClass('active')) {
          $('.header__wrap').addClass('s2');
        } else {
          $('.header__wrap').removeClass('s2');
        }

        if ($('.section-n3').hasClass('active')) {
          $('.header__wrap').addClass('s3');
        } else {
          $('.header__wrap').removeClass('s3');
        }

        if ($('.section-n4').hasClass('active')) {
          $('.header__wrap').addClass('s4');
        } else {
          $('.header__wrap').removeClass('s4');
        }

        if ($('.section-n5').hasClass('active')) {
          $('.header__wrap').addClass('s5');
        } else {
          $('.header__wrap').removeClass('s5');
        }
      });
    },
    attachEvents(el) {
      APP.windowScroll.changeHeader(el);
    },
    init() {
      $('.section').each(function () {
        APP.windowScroll.attachEvents(this);
      });

      $('.anim-trigger').each(function () {
        APP.windowScroll.attachEvents(this);
      });
    },
  },
  // slider: {
  //     vars: {

  //     },
  //     attachEvents() {

  //     },
  //     init() {
  //         APP.slider.attachEvents();
  //     },
  // },
  init() {
    this.pluginsInit();
    this.headerJs.init();
    // this.slider.init();
    this.windowScroll.init();
    this.responsive.checkDeviceWidth();

  },
};

$(function () {
  APP.init();
});
