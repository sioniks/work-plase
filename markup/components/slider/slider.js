// 'use strict';

// let slider = (function (config) {

//   const ClassName = {
//     INDICATOR_ACTIVE: 'slider__indicator_active',
//     ITEM: 'slider__item',
//     ITEM_LEFT: 'slider__item_left',
//     ITEM_RIGHT: 'slider__item_right',
//     ITEM_PREV: 'slider__item_prev',
//     ITEM_NEXT: 'slider__item_next',
//     ITEM_ACTIVE: 'slider__item_active'
//   };

//   let
//     _isSliding = false, // индикация процесса смены слайда
//     _interval = 0, // числовой идентификатор таймера
//     _transitionDuration = 1200, // длительность перехода
//     _slider = {}, // DOM элемент слайдера
//     _items = {}, // .slider-item (массив слайдов)
//     _sliderIndicators = {}, // [data-slide-to] (индикаторы)
//     _config = {
//       selector: '', // селектор слайдера
//       isCycling: true, // автоматическая смена слайдов
//       direction: 'next', // направление смены слайдов
//       interval: 5000, // интервал между автоматической сменой слайдов
//       pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
//     };

//   let
//     // функция для получения порядкового индекса элемента
//     _getItemIndex = function (_currentItem) {
//       let result;
//       _items.forEach(function (item, index) {
//         if (item === _currentItem) {
//           result = index;
//         }
//       });
//       return result;
//     },
//     // функция для подсветки активного индикатора
//     _setActiveIndicator = function (_activeIndex, _targetIndex) {
//       if (_sliderIndicators.length !== _items.length) {
//         return;
//       }
//       _sliderIndicators[_activeIndex].classList.remove(ClassName.INDICATOR_ACTIVE);
//       _sliderIndicators[_targetIndex].classList.add(ClassName.INDICATOR_ACTIVE);
//     },

//     // функция для смены слайда
//     _slide = function (direction, activeItemIndex, targetItemIndex) {
//       let
//         directionalClassName = ClassName.ITEM_RIGHT,
//         orderClassName = ClassName.ITEM_PREV,
//         activeItem = _items[activeItemIndex], // текущий элемент
//         targetItem = _items[targetItemIndex]; // следующий элемент

//       let _slideEndTransition = function () {
//         activeItem.classList.remove(ClassName.ITEM_ACTIVE);
//         activeItem.classList.remove(directionalClassName);
//         targetItem.classList.remove(orderClassName);
//         targetItem.classList.remove(directionalClassName);
//         targetItem.classList.add(ClassName.ITEM_ACTIVE);
//         window.setTimeout(function () {
//           if (_config.isCycling) {
//             clearInterval(_interval);
//             _cycle();
//           }
//           _isSliding = false;
//           activeItem.removeEventListener('transitionend', _slideEndTransition);
//         }, _transitionDuration);
//       };

//       if (_isSliding) {
//         return; // завершаем выполнение функции если идёт процесс смены слайда
//       }
//       _isSliding = true; // устанавливаем переменной значение true (идёт процесс смены слайда)

//       if (direction === 'next') { // устанавливаем значение классов в зависимости от направления
//         directionalClassName = ClassName.ITEM_LEFT;
//         orderClassName = ClassName.ITEM_NEXT;
//       }

//       targetItem.classList.add(orderClassName); // устанавливаем положение элемента перед трансформацией
//       _setActiveIndicator(activeItemIndex, targetItemIndex); // устанавливаем активный индикатор

//       window.setTimeout(function () { // запускаем трансформацию
//         targetItem.classList.add(directionalClassName);
//         activeItem.classList.add(directionalClassName);
//         activeItem.addEventListener('transitionend', _slideEndTransition);
//       }, 0);

//     },
//     // функция для перехода к предыдущему или следующему слайду
//     _slideTo = function (direction) {
//       let
//         activeItem = _slider.querySelector('.' + ClassName.ITEM_ACTIVE), // текущий элемент
//         activeItemIndex = _getItemIndex(activeItem), // индекс текущего элемента
//         lastItemIndex = _items.length - 1, // индекс последнего элемента
//         targetItemIndex = activeItemIndex === 0 ? lastItemIndex : activeItemIndex - 1;
//       if (direction === 'next') { // определяем индекс следующего слайда в зависимости от направления
//         targetItemIndex = activeItemIndex == lastItemIndex ? 0 : activeItemIndex + 1;
//       }
//       _slide(direction, activeItemIndex, targetItemIndex);
//     },
//     // функция для запуска автоматической смены слайдов в указанном направлении
//     _cycle = function () {
//       // console.log(21111);
//       if (_config.isCycling) {
//         _interval = window.setInterval(function () {
//           _slideTo(_config.direction);
//         }, _config.interval);
//       }
//     },
//     // обработка события click
//     _actionClick = function (e) {
//       let
//         activeItem = _slider.querySelector('.' + ClassName.ITEM_ACTIVE), // текущий элемент
//         activeItemIndex = _getItemIndex(activeItem), // индекс текущего элемента
//         targetItemIndex = e.target.getAttribute('data-slide-to');

//       if (!(e.target.hasAttribute('data-slide-to') || e.target.classList.contains('slider__control'))) {
//         return; // завершаем если клик пришёлся на не соответствующие элементы
//       }
//       if (e.target.hasAttribute('data-slide-to')) { // осуществляем переход на указанный сдайд
//         if (activeItemIndex === targetItemIndex) {
//           return;
//         }
//         _slide((targetItemIndex > activeItemIndex) ? 'next' : 'prev', activeItemIndex, targetItemIndex);
//       } else {
//         e.preventDefault();
//         _slideTo(e.target.classList.contains('slider__control_next') ? 'next' : 'prev');
//       }
//     },
//     // установка обработчиков событий
//     _setupListeners = function () {
//       // добавление к слайдеру обработчика события click
//       _slider.addEventListener('click', _actionClick);
//       // остановка автоматической смены слайдов (при нахождении курсора над слайдером)
//       if (_config.pause && _config.isCycling) {
//         _slider.addEventListener('mouseenter', function (e) {
//           clearInterval(_interval);
//         });
//         _slider.addEventListener('mouseleave', function (e) {
//           clearInterval(_interval);
//           _cycle();
//         });
//       }
//     };

//   // init (инициализация слайдера)
//   for (let key in config) {
//     if (key in _config) {
//       _config[key] = config[key];
//     }
//   }
//   _slider = (typeof _config.selector === 'string' ? document.querySelector(_config.selector) : _config.selector);
//   _items = _slider.querySelectorAll('.' + ClassName.ITEM);
//   _sliderIndicators = _slider.querySelectorAll('[data-slide-to]');
//   // запуск функции cycle
//   _cycle();
//   _setupListeners();

//   return {
//     next: function () { // метод next
//       _slideTo('next');
//     },
//     prev: function () { // метод prev
//       _slideTo('prev');
//     },
//     stop: function () { // метод stop
//       clearInterval(_interval);
//     },
//     cycle: function () { // метод cycle
//       clearInterval(_interval);
//       _cycle();
//     }
//   };
// });

// $(document).ready(function () {
//   // $('.slider').each(function () {
//   //   console.log($(this));
//   //   slider({
//   //     selector: '.slider',
//   //     isCycling: true,
//   //     direction: 'next',
//   //     interval: 1000,
//   //     pause: true
//   //   });
//   // });
//   // slider({
//   //   selector: '.slider-second',
//   //   isCycling: true,
//   //   direction: 'next',
//   //   interval: 1000,
//   //   pause: true
//   // });

//   let elements = document.getElementsByClassName('slider');

//   for (let i = 0; i < elements.length; i++) {
//     let elem = elements[i];
//     slider({
//       selector: elem,
//       isCycling: true,
//       direction: 'next',
//       interval: 1000,
//       pause: true
//     });
//   }
// });



//--------------------------------------------------------------------------


(function () {

  function init(item) {
    let items = item.querySelectorAll('li'),
      textContainer = item.querySelector('.content__text'),
      itemsText = null,
      current = 0,
      autoUpdate = true,
      timeTrans = 5000;

    if (item.querySelector('.content__text a')) {
      itemsText = textContainer.querySelectorAll('a');
    } else {
      itemsText = textContainer.querySelectorAll('div');
    }
    // create button prev
    let prevbtn = item.querySelector('.slider__control_prev');

    // create button next
    let nextbtn = item.querySelector('.slider__control_next');

    // progressbar
    let progress = item.querySelector('.progress');

    // create counter
    let counter = item.querySelector('.count');
    counter.className = 'counter';
    if (items.length < 10) {
      counter.innerHTML = '<span class="current">01</span><span class="all-items">0' + items.length + '</span>';
    } else {
      counter.innerHTML = '<span class="current">01</span><span class="all-items">' + items.length + '</span>';
    }

    items[current].className = 'current';
    itemsText[current].className = 'current';
    if (items.length > 1) {
      items[items.length - 1].className = 'prev_slide';
      itemsText[items.length - 1].className = 'prev_slide';
    }

    let navigate = function (dir) {
      items[current].className = '';
      itemsText[current].className = '';


      if (dir === 'right') {
        current = current < items.length - 1 ? current + 1 : 0;
      } else {
        current = current > 0 ? current - 1 : items.length - 1;
      }

      let nextCurrent = current < items.length - 1 ? current + 1 : 0,
        prevCurrent = current > 0 ? current - 1 : items.length - 1;

      items[current].className = 'current';


      items[prevCurrent].className = 'prev_slide';


      items[nextCurrent].className = '';


      setTimeout(function () {
        itemsText[current].className = 'current';
        itemsText[prevCurrent].className = 'prev_slide';
        itemsText[nextCurrent].className = '';
      }, 500);
      // update counter
      if (items.length < 10) {
        counter.firstChild.textContent = '0' + (current + 1);
      } else {
        counter.firstChild.textContent = current + 1;
      }
    };

    item.addEventListener('mouseenter', function () {
      autoUpdate = false;
    });

    item.addEventListener('mouseleave', function () {
      autoUpdate = true;
    });
    setTimeout(function () {
      progress.className = 'progress is-active';
    }, 100);
    setInterval(function () {
      if (autoUpdate) {
        navigate('right');
        progress.className = 'progress';
        setTimeout(function () {
          progress.className = 'progress is-active';
        }, 100);
      }
    }, timeTrans);

    prevbtn.addEventListener('click', function () {
      navigate('left');
      progress.className = 'progress';
      setTimeout(function () {
        progress.className = 'progress is-active';
      }, 100);

    });

    nextbtn.addEventListener('click', function () {
      navigate('right');
      progress.className = 'progress';
      setTimeout(function () {
        progress.className = 'progress is-active';
      }, 100);
    });

    // keyboard navigation
    document.addEventListener('keydown', function (ev) {
      let keyCode = ev.keyCode || ev.which;
      switch (keyCode) {
        case 37:
          navigate('left');
          break;
        case 39:
          navigate('right');
          break;
      }
    });

    // swipe navigation
    // from http://stackoverflow.com/a/23230280
    item.addEventListener('touchstart', handleTouchStart, false);
    item.addEventListener('touchmove', handleTouchMove, false);
    let xDown = null;
    let yDown = null;

    function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant*/
        if (xDiff > 0) {
          /* left swipe */
          navigate('right');
        } else {
          navigate('left');
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }


  }

  [].slice.call(document.querySelectorAll('.cd-slider')).forEach(function (item) {
    init(item);
  });
})();
