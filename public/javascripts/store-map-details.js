let mapInstance;

function initApp() {
    drawMap();
    getPlacesFromAPI();
}

function drawMap() {
    mapInstance = new google.maps.Map(
        document.setAttribute('id'),
        { center: { lat: 40.42761062670862, lng: -3.7030849368586 }, zoom: 13, styles: mapStyles.aubergine }
    )
}


function getPlacesFromAPI() {

    axios
        .get('/api/tiendas/detalle/:store_id')
        .then(response => {
            drawMarker(response.data)
        })
        .catch(err => console.log(err))
}


function drawMarker() {

        let position = { lat: location.coordinates[0], lng: location.coordinates[1] }

        new google.maps.Marker({
            map: mapInstance,
            position,
            title: name
        })
  

    mapInstance.setCenter({ lat: stores[1].location.coordinates[0], lng: stores[1].location.coordinates[1]})
}
// TO DO : findById