function initMap(position) {
  console.log(position);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: position.latitude || 41.85, lng: position.longitude || -87.65}
  });

  var ourCoordinates = new google.maps.LatLng(position.latitude,position.longitude);
  console.log(ourCoordinates);
  var marker = new google.maps.Marker({
       position: ourCoordinates,
       map: map
     });
     marker.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
}

function success(posObj){
  let coords = posObj.coords;
  initMap(coords);
}

function error(errorObj){
  let message = errorObj.message; 
}

window.initMap = initMap;

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(success,error);
}