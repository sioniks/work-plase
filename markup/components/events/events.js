// city , category, location, pagination

// eslint-disable-next-line no-var
var eventData = {
  city: 1,
  pagination: 1,
  sort: 1
};

window.onload = function () {
  let filtersWrapper = document.querySelector('.filter-wrap');
  filtersWrapper && new renderDropdown(filtersWrapper);

};

function drawEvents(data) {
  let container = document.getElementById('event__list');
  container.innerHTML = '';
  let events = data.events;

  events.forEach(element => {
    eventList(element.category_id, element.title, element.url, element.event_time, element.price, element.img_min);
  });
  let paginationSize = data.pagination;
  if (paginationSize > 1) {
    Pagination.Init(document.getElementById('pagination'), {
      size: paginationSize, // pages size
      page: 1, // selected page
      step: 1 // pages before and after current
    });
  } else {
    document.getElementById('pagination').classList.add('hide');
  }
}

class renderDropdown {
  constructor(item) {
    this.item = item;
    this.selects = item.querySelectorAll('.one-filter');
    this.data = false;
    this.init();
  }

  init() {
    !this.data && this.getAllData(eventData);
    this.selects && this.observeExpand();
  }
  observeExpand() {
    this.selects.forEach(item => {

      item.querySelector('.one-filter_title').addEventListener('click', () => {
        this.selects.forEach(elem => {
          elem.classList.remove('active');
        });
        item.classList.add('active');
      });
    });
  }
  getAllData(dataObj) {
    fetch('/api/get-events/', {
        method: 'post',
        body: JSON.stringify(dataObj),
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        this.renderSelects(data.result);
        this.data = data.result;
        drawEvents(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllDataCity(dataObj) {
    fetch('/api/get-events/', {
        method: 'post',
        body: JSON.stringify(dataObj),
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        this.data = data.result;
        this.renderLocation(data.result.location);
        this.renderCategory(data.result.category);
        drawEvents(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getNewEvents(dataObj) {
    fetch('/api/get-events/', {
        method: 'post',
        body: JSON.stringify(dataObj),
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        this.data = data.result;
        drawEvents(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  renderSelects(data) {
    this.renderCity(data.city);
    this.renderLocation(data.location);
    this.renderCategory(data.category);
    this.renderSort(data.sort);
  }
  renderCity(data, index = 0) {
    let container = document.querySelector('.filter-city .one-filter_items');
    container.innerHTML = '';
    data.map((x, i) => {
      let selectItem = document.createElement('div');
      selectItem.classList.add('one-filter_item');
      selectItem.innerHTML = x.title_ua;
      selectItem.dataset.id = x.id;
      selectItem.addEventListener('click', () => {
        this.toggleItem('city', x.title_ua, x.id);

      });
      container.appendChild(selectItem);
    });
    container.previousElementSibling.innerHTML = data[index].title_ua;
  }

  renderLocation(data) {
    let container = document.querySelector('.filter-location .one-filter_items');
    container.innerHTML = '';
    data.map((x, i) => {
      let selectItem = document.createElement('div');
      selectItem.classList.add('one-filter_item');
      selectItem.innerHTML = x.title;
      selectItem.dataset.id = x.id;
      selectItem.addEventListener('click', () => {
        this.toggleItem('location', x.title, x.id);
      });
      container.appendChild(selectItem);
    });
    container.previousElementSibling.innerHTML = data[0].title;
  }

  renderCategory(data) {
    let container = document.querySelector('.filter-category .one-filter_items');
    container.innerHTML = '';
    data.map((x, i) => {
      let selectItem = document.createElement('div');
      selectItem.classList.add('one-filter_item');
      selectItem.innerHTML = x.title;
      selectItem.dataset.id = x.id;
      selectItem.addEventListener('click', () => {
        this.toggleItem('category', x.title, x.id);
      });
      container.appendChild(selectItem);
    });
    container.previousElementSibling.innerHTML = data[0].title;
  }

  renderSort() {
    let container = document.querySelector('.filter-sort .one-filter_items');
    let items = [...container.children];
    console.log(items);
    items.map((x, i) => {
      x.addEventListener('click', () => {
        this.toggleItem('sort', x.textContent, x.id);
      });
    });
    container.previousElementSibling.innerHTML = items[0].textContent;
  }





  toggleItem(category, item, id) {
    document.querySelector(`.filter-${category} .one-filter_title`).innerHTML = item;
    document.querySelector(`.filter-${category}`).classList.remove('active');
    if (category === 'city') {
      eventData.city = id;
      this.getAllDataCity({
        'city': id
      });
    } else if (category === 'sort') {
      eventData.sort = id;
      this.getNewEvents({
        'sort': id
      });
    } else if (category === 'category') {
      eventData.category = id;
      this.getNewEvents({
        'category': id
      });
    } else if (category === 'location') {
      eventData.location = id;
      this.getNewEvents({
        'location': id
      });
    }
  }
}

function eventList(subtitle, title, link, date, price, img) {
  let container = document.getElementById('event__list');
  let block = document.createElement('div');
  block.className = 'event__item';
  let blockContent = `
      
      <div class="image-wrap">
          <a href="${ link }">
              <div class="event-img"
              style="background-image: url('/images/${img}')"> </div>
          </a>
      </div>
      <div class="event__item-content">
          <a href="${ link }">
              <div class="event-subtitle">${subtitle}</div>
          </a>
          <a href="${ link }">
              <div class="event-title">${title}</div>
          </a>
          <div class="event-date">${ date }</div>
          <div class="event-price">${ price }</div>
      </div>
  `;
  block.innerHTML = blockContent;
  return container.appendChild(block);
}


/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript page navigation
 * * * * * * * * * * * * * * * * */

// eslint-disable-next-line no-var
var Pagination = {

  code: '',

  // --------------------
  // Utility
  // --------------------

  // converting initialize data
  Extend: function (data) {
    data = data || {};
    Pagination.size = data.size || 10;
    Pagination.page = data.page || 1;
    Pagination.step = data.step || 1;
  },

  // add pages by number (from [s] to [f])
  Add: function (s, f) {
    for (var i = s; i < f; i++) {
      Pagination.code += '<a class="pagi" data-name="pagination-item" data-id="' + i + '">' + i + '</a>';
    }
  },

  // add last page with separator
  Last: function () {
    Pagination.code += '<i>...</i><a class="pagi" data-name="pagination-item" data-id="' + Pagination.size + '">' + Pagination.size + '</a>';
  },

  // add first page with separator
  First: function () {
    Pagination.code += '<a class="pagi" data-name="pagination-item" data-id="1">1</a><i>...</i>';
  },



  // --------------------
  // Handlers
  // --------------------

  // change page
  Click: function (event) {
    Pagination.page = +this.innerHTML;
    let container = document.getElementById('event__list');
    container.innerHTML = '';

    eventData.pagination = event.target.dataset.id;

    console.log(eventData.pagination);

    Pagination.Start();
    fetch('/api/get-events/', {
        method: 'post',
        body: JSON.stringify(eventData),
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        let events = data.result.events;
        events.forEach(element => {
          eventList(element.category_id, element.title, element.url, element.event_time, element.price, element.img_min);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // previous page
  Prev: function () {
    Pagination.page--;
    if (Pagination.page < 1) {
      Pagination.page = 1;
    }
    Pagination.Start();
  },

  // next page
  Next: function () {
    Pagination.page++;
    if (Pagination.page > Pagination.size) {
      Pagination.page = Pagination.size;
    }
    Pagination.Start();
  },



  // --------------------
  // Script
  // --------------------

  // binding pages
  Bind: function () {
    var a = Pagination.e.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === Pagination.page) a[i].className = 'current pagi';
      a[i].addEventListener('click', Pagination.Click, false);
    }
  },

  // write pagination
  Finish: function () {
    Pagination.e.innerHTML = Pagination.code;
    Pagination.code = '';
    Pagination.Bind();
  },

  // find pagination type
  Start: function () {
    if (Pagination.size < Pagination.step * 2 + 6) {
      Pagination.Add(1, Pagination.size + 1);
    } else if (Pagination.page < Pagination.step * 2 + 1) {
      Pagination.Add(1, Pagination.step * 2 + 4);
      Pagination.Last();
    } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
      Pagination.First();
      Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
    } else {
      Pagination.First();
      Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
      Pagination.Last();
    }
    Pagination.Finish();
  },



  // --------------------
  // Initialization
  // --------------------

  // binding buttons
  Buttons: function (e) {
    var nav = e.getElementsByTagName('a');
    nav[0].addEventListener('click', Pagination.Prev, false);
    nav[1].addEventListener('click', Pagination.Next, false);
  },

  // create skeleton
  Create: function (e) {

    // eslint-disable-next-line no-var
    var html = [
      '<a class="pagi-btn pagi-prev"><svg class="icon-svg"> <use xlink:href="#icon-left"></use></svg></a>', // previous button
      '<span class="pagi-wrap"></span>', // pagination container
      '<a class="pagi-btn pagi-next"><svg class="icon-svg"> <use xlink:href="#icon-right"></use></svg></a>' // next button
    ];

    e.innerHTML = html.join('');
    Pagination.e = e.getElementsByTagName('span')[0];
    Pagination.Buttons(e);
  },

  // init
  Init: function (e, data) {
    Pagination.Extend(data);
    Pagination.Create(e);
    Pagination.Start();
  }
};
