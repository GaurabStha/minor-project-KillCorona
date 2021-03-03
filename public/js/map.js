mapboxgl.accessToken = 'pk.eyJ1IjoiZ2F1cmFiaWFuIiwiYSI6ImNrbHNsbnE3bTAwMTAycHF4MWMxazhveDgifQ.PbXbHDXE5CMUtpuUvc2EmA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 6.5,
    center: [84.1240, 28.3949]
});

function updateMap() {
    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                longitude = element.centroid.coordinates[0];
                latitude = element.centroid.coordinates[1];

                cases = element.cases;
                district = element.title_en;
                cases = element.cases;
                cases_active = element.cases_active;
                cases_recovered = element.cases_recovered;
                cases_death = element.cases_death;

                var info = `
                <h2>${district} :-</h2><br>
                <h4>Cases: ${cases},<br>
                Active: ${cases_active},<br>
                Recovered: ${cases_recovered},<br>
                Death: ${cases_death}</h4>
                `;

                if (cases > 255) {
                    color = "rgb(255,0,0)"
                } else {
                    color = `rgb(${cases},0,0)`
                }

                var popup = new mapboxgl.Popup({
                        closeButton: false,
                        closeonClick: true
                    })
                    .setHTML(info);

                // Mark on the map
                new mapboxgl.Marker({
                        draggable: false,
                        color: color
                    })
                    .setLngLat([longitude, latitude])
                    .setPopup(popup)
                    .addTo(map)
            });
        })
}
setInterval(updateMap(), 2000);