(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function initMap(position) {
  console.log(position);
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: { lat: position.latitude || 41.85, lng: position.longitude || -87.65 }
  });

  var ourCoordinates = new google.maps.LatLng(position.latitude, position.longitude);
  console.log(ourCoordinates);
  var marker = new google.maps.Marker({
    position: ourCoordinates,
    map: map
  });
  marker.setMap(map);

  var onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
}

function success(posObj) {
  let coords = posObj.coords;
  initMap(coords);
}

function error(errorObj) {
  let message = errorObj.message;
}

window.initMap = initMap;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
}

},{}]},{},[1])


//# sourceMappingURL=app.js.map
