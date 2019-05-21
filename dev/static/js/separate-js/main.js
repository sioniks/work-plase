function openMapMarker(mymap, marker, coord1, coord2) {
  // function openPopup() {
  //   popup.openOn(mymap);
  // }

  function openInNewTab() {
    $('<a>').attr('href', 'https://www.google.com.ua/maps/place/' + coord1 + '+' + coord2 + '/@' + coord1 + ',' + coord2 + ',16z/50.4427075,30.5269195').attr('target', '_blank')[0].click();
  }

  // marker.on('click', openPopup);
  marker.on('click', openInNewTab);
}

let mapContainer = document.getElementById('mapid');

if (mapContainer) {
  // получение координат со страницы локации
  let coord1 = document.querySelector('input[name=coordinates1]').value;
  let coord2 = document.querySelector('input[name=coordinates2]').value;

  let mymap = L.map('mapid').setView([(coord1 - 0.0005), coord2], 15);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    attribution: '',
    maxZoom: 18,
    attributionControl: false,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZmFjaWxpdHkiLCJhIjoiY2pwZHdrem14MGJqNTNrcWdqY2FkcWllZiJ9.82LElL6oamSmlNRG52cxvw'
  }).addTo(mymap);

  let locMarker = L.icon({
    iconUrl: '/static/img/minified-svg/map-marker.svg',
    iconSize: [50, 45], // size of the icon
    iconAnchor: [25, 44], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  let marker = L.marker([coord1, coord2], {
    icon: locMarker
  }).addTo(mymap);

  // let popup = L.popup()
  //   .setLatLng([coord1, coord2])
  //   .setContent('I am a standalone popup.');
  // .openOn(mymap);
  // TODO чтобы добавить попап с нужным кодом раскоментировать


  let circle = L.circle([coord1, coord2], {
    // color: 'orange',
    // fillColor: '#CB6F62',
    fillOpacity: 0.2,
    radius: 500000
  }).addTo(mymap);

  // передать сюда popup когда нужно будет его открывать
  openMapMarker(mymap, marker, coord1, coord2);
};
