let mapInstance;

function initApp() {
    drawMap();
    getPlacesFromAPI();
}

function drawMap() {
    mapInstance = new google.maps.Map(
        document.querySelector('figure'),
        { center: { lat: 40.42761062670862, lng: -3.7030849368586 }, zoom: 13, styles: mapStyles.aubergine }
    )
}

function getPlacesFromAPI() {
    axios
        .get(`/api/tiendas/detalle/${document.querySelector('figure').getAttribute('storeID')}`)
        .then(response => {
            drawMarker(response.data)
        })
        .catch(err => console.log(err))
}

function drawMarker(data) {
        let position = { lat: data.location.coordinates[0], lng: data.location.coordinates[1] }

        new google.maps.Marker({
            map: mapInstance,
            position,
            title: data.name
        })
  
    mapInstance.setCenter({ lat: data.location.coordinates[0], lng: data.location.coordinates[1] })
}