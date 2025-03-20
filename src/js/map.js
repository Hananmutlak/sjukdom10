import L from 'leaflet';

export function initMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) {
        console.error('Map container not found!');
        return;
    }

    const map = L.map('mapContainer').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let markers = [];

    fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const marker = L.marker([country.countryInfo.lat, country.countryInfo.long], {
                    icon: L.icon({
                        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                        shadowSize: [41, 41]
                    })
                }).addTo(map);

                marker.bindPopup(`
                    <b>${country.country}</b><br>
                    Cases: ${country.cases.toLocaleString()}<br>
                    Deaths: ${country.deaths.toLocaleString()}<br>
                    Recovered: ${country.recovered.toLocaleString()}
                `);

                markers.push({
                    marker: marker,
                    name: country.country.toLowerCase(),
                    latlng: [country.countryInfo.lat, country.countryInfo.long]
                });
            });
        })
        .catch(error => {
            console.error('Error fetching disease data:', error);
        });

    // وظيفة البحث
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    const searchLocation = () => {
        const query = searchInput.value.toLowerCase();
        let found = false;

        markers.forEach(markerData => {
            if (markerData.name.includes(query)) {
                markerData.marker.setIcon(
                    L.icon({
                        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-red.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                        shadowSize: [41, 41]
                    })
                );
                markerData.marker.openPopup();
                map.setView(markerData.latlng, 4);
                found = true;
            } else {
                markerData.marker.setIcon(
                    L.icon({
                        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                        shadowSize: [41, 41]
                    })
                );
                markerData.marker.closePopup();
            }
        });

        if (!found) {
            alert('Country not found!');
        }
    };

    // البحث عند النقر على الزر
    searchButton.addEventListener('click', searchLocation);

    // البحث عند الضغط على Enter في حقل البحث
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchLocation();
        }
    });
}