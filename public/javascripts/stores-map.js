let mapInstance;

function initApp() {
    drawMap();
    getPlacesFromAPI();
}

function drawMap() {
    mapInstance = new google.maps.Map(
        document.querySelector('#storesMap'),
        { center: { lat: 40.42761062670862, lng: -3.7030849368586 }, zoom: 13, styles: mapStyles.aubergine }
    )
}


function getPlacesFromAPI() {

    axios
        .get('/api/tiendas')
        .then(response => {
            drawMarkers(response.data)
        })
        .catch(err => console.log(err))
}


function drawMarkers(stores) {

    stores.forEach(elm => {

        let position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }

        new google.maps.Marker({
            map: mapInstance,
            position,
            title: elm.name
        })
    })

    // mapInstance.setCenter({ lat: stores[1].location.coordinates[0], lng: stores[1].location.coordinates[1]})
}
