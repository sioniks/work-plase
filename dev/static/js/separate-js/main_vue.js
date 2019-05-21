let priceContainer = document.getElementById('price-wrapper');

if (priceContainer) {
  new Vue({
    el: '#price-wrapper',
    data() {
      return {
        info: null,
        currentCity: null,
        currentLocation: null,
        currentWorkplace: null,
        isOpen: false,
        isOpen2: false,
        slides: 1,
        active: 1,
        locationUrl: null
      };
    },
    computed: {
      cardCount: function () {
        if (this.slides == 1) {
          return "one-card";
        } else if (this.slides == 2) {
          return 'two-card';
        } else if (this.slides == 3) {
          return 'three-card';
        } else if (this.slides == 4) {
          return 'four-card';
        } else {
          return 'more';
        }
      },

      mobile: function () {
        if (window.innerWidth <= 768) {
          return true;
        } else {
          return false;
        }
      }

    },
    async beforeCreate() {
      let responseData = await axios
        .post('/api/get-tariff/')
        .then(response => (this.info = response.data));

      this.info = responseData
      if (document.querySelector('.page__one-location')) {
        let locCity = document.getElementById('locCity').value;
        let locTitle = document.getElementById('locTitle').value;



        this.currentCity = locCity
        this.currentLocation = locTitle
        this.currentWorkplace = Object.keys(this.info.content.city[this.currentCity].location[this.currentLocation].workplaces)[0];
        this.slides = this.info.content.city[this.currentCity].location[this.currentLocation].workplaces[this.currentWorkplace].length;
        this.locationUrl = this.info.content.city[this.currentCity].location[this.currentLocation].location_url;

      } else {
        let locCity = document.getElementById('locCity').value;
        this.currentCity = locCity
        this.currentLocation = Object.keys(this.info.content.city[this.currentCity].location)[0]
        this.currentWorkplace = Object.keys(this.info.content.city[this.currentCity].location[this.currentLocation].workplaces)[0];
        this.slides = this.info.content.city[this.currentCity].location[this.currentLocation].workplaces[this.currentWorkplace].length;
        this.locationUrl = this.info.content.city[this.currentCity].location[this.currentLocation].location_url;

      }
    },


    methods: {
      firstWorkplace: function () {
        let elems = document.querySelectorAll('.price__nav-item');
        [].forEach.call(elems, function (el) {
          el.classList.remove('is-active');
        });
        document.querySelector('.price__nav').firstChild.classList.add('is-active');
      },
      selectCity: function (key) {

        this.active = 1;
        this.currentCity = key;
        this.currentLocation = Object.keys(this.info.content.city[this.currentCity].location)[0];
        this.currentWorkplace = Object.keys(this.info.content.city[this.currentCity].location[this.currentLocation].workplaces)[0];
        this.slides = this.info.content.city[this.currentCity].location[this.currentLocation].workplaces[this.currentWorkplace].length;
        this.locationUrl = this.info.content.city[this.currentCity].location[this.currentLocation].location_url;
        this.firstWorkplace();
      },
      selectLocation: function (key, index) {
        this.active = 1;
        this.currentLocation = Object.keys(this.info.content.city[this.currentCity].location)[index];
        this.currentWorkplace = Object.keys(this.info.content.city[this.currentCity].location[this.currentLocation].workplaces)[0];
        this.slides = this.info.content.city[this.currentCity].location[this.currentLocation].workplaces[this.currentWorkplace].length;
        this.locationUrl = this.info.content.city[this.currentCity].location[this.currentLocation].location_url;
        this.firstWorkplace();
      },
      selectWorkplace: function (index) {
        this.active = 1;
        this.currentWorkplace = Object.keys(this.info.content.city[this.currentCity].location[this.currentLocation].workplaces)[index];
        this.slides = this.info.content.city[this.currentCity].location[this.currentLocation].workplaces[this.currentWorkplace].length;
      },
      formData: function (id, wId, cId, lId, title) {
        document.querySelector('.popup__request-wrap .cityH').value = cId;
        document.querySelector('.popup__request-wrap .locationH').value = lId;
        document.querySelector('.popup__request-wrap .worktypeH').value = wId;
        document.querySelector('.popup__request-wrap .priceH').value = id;

        document.querySelector('input#city').value = this.currentCity;
        document.querySelector('input#location').value = this.currentLocation;
        document.querySelector('input#worktype').value = this.currentWorkplace;
        document.querySelector('input#price').value = title;
      },
      move(amount) {
        this.slides = this.info.content.city[this.currentCity].location[this.currentLocation].workplaces[this.currentWorkplace].length;
        let newActive
        const newIndex = this.active + amount
        if (newIndex > this.slides) newActive = 1
        if (newIndex === 0) newActive = this.slides
        this.active = newActive || newIndex

      }
      // openDrop: function () {
      //   if (this.isOpen ) {
      //     this.isOpen = !this.isOpen
      //   }
      // }

    }
  });
}
