// function initMap() {

//   let elem = document.getElementById('maps');
//   let center = {
//     lat: 50.538016,
//     lng: 30.235329
//   };
//   let zoom = 13.5;

//   let map = new google.maps.Map(elem, {
//     zoom: zoom,
//     center: center,
//     mapTypeControl: false,

//     scaleControl: false,
//     streetViewControl: false,
//     fullscreenControl: false,

//     zoomControl: true,
//     zoomControlOptions: {
//       position: google.maps.ControlPosition.RIGHT_CENTER,
//     },
//     styles: [{
//         'featureType': 'administrative',
//         'elementType': 'all',
//         'stylers': [{
//             'color': '#dd7c56'
//           },
//           {
//             'visibility': 'simplified'
//           }
//         ]
//       },
//       {
//         'featureType': 'administrative.land_parcel',
//         'elementType': 'all',
//         'stylers': [{
//           'visibility': 'off'
//         }]
//       },
//       {
//         'featureType': 'landscape',
//         'elementType': 'all',
//         'stylers': [{
//           'hue': '#63ff00'
//         }]
//       },
//       {
//         'featureType': 'poi',
//         'elementType': 'all',
//         'stylers': [{
//           'visibility': 'on'
//         }]
//       },
//       {
//         'featureType': 'road',
//         'elementType': 'geometry.fill',
//         'stylers': [{
//             'color': '#f2d4c9'
//           },
//           {
//             'visibility': 'on'
//           }
//         ]
//       },
//       {
//         'featureType': 'road.highway',
//         'elementType': 'all',
//         'stylers': [{
//           'visibility': 'off'
//         }]
//       },
//       {
//         'featureType': 'road.arterial',
//         'elementType': 'all',
//         'stylers': [{
//           'visibility': 'simplified'
//         }]
//       },
//       {
//         'featureType': 'water',
//         'elementType': 'all',
//         'stylers': [{
//             'color': '#f3ac91'
//           },
//           {
//             'visibility': 'simplified'
//           }
//         ]
//       }
//     ],
//   });



// let marker = new google.maps.Marker({
//   position: center,
//   map: map,
//   icon: '/static/img/content/map/map_logo-M.svg',
//   url: 'https://goo.gl/maps/c6qzG6B8LWs',
// });

// marker.setMap(map);

// google.maps.event.addListener(marker, 'click', function () {
//   window.open(marker.url);
// });
// }

// $(document).ready(function () {
//   initMap();
// });
