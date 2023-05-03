// My position
if (!navigator.geolocation) {
    alert("Устройство не поддерживает геопозицию!")
} else {

}

// Получаем  данные
function geoPosition() {
    navigator.geolocation.getCurrentPosition(getPosition,
        error => console.log(error.message),
        { enableHighAccuracy: true })
}

var marker, circle;

// Запрос позиции
function getPosition(position) {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy

    // Если есть маркер и круг, то удаляем
    if (marker) {
        map.removeLayer(marker)
    }
    if (circle) {
        map.removeLayer(circle)
    }

    // Рисуем маркер и круг
    marker = L.marker([lat, long])
    circle = L.circle([lat, long], { radius: accuracy })

    var featureGroup = L.featureGroup([marker, circle]).addTo(map);
    map.fitBounds = (featureGroup.getBounds())
    return [lat, long, accuracy]
}

// Где я 
function WhereIam() {
    navigator.geolocation.getCurrentPosition(position => {
        data = getPosition(position)
        // console.log(data);
        // Устанавливаем местоположение по координатам со спутника
        setView([data[0], data[1]], localStorage.getItem("map_zoom"))
    })
}

var keyTimer = 0;

// Выбор режима геолокации (отключен, единоразово, автообновление)
function geolocationModeSelection() {
    // let mode = ["off", "WhereIam", "geoTracking"]
    statusGeo = localStorage.getItem("geo")

    // первый запуск
    if (statusGeo == null) {
        localStorage.setItem("geo", 0)
    }
    statusGeo = Number(statusGeo) + 1
    if (statusGeo > 2) {
        statusGeo = 0
    }
    localStorage.setItem("geo", statusGeo)
    // кнопка геопозиции
    geoBtn = document.getElementById('geoBtn')

    if (statusGeo == 0) {
        geoBtn.innerHTML = "🧭 Выкл";
        // console.log("выключено");
        // Если есть маркер и круг, то удаляем
        if (marker) {
            map.removeLayer(marker)
        }
        if (circle) {
            map.removeLayer(circle)
        }
        clearInterval(keyTimer)
        console.log("Остановка keyTimer: " + keyTimer);

    }
    if (statusGeo == 1) {
        WhereIam()
        geoBtn.innerHTML = "🧭 Где я?";
        // console.log("где я");
    }
    if (statusGeo == 2) {
        // Запрашивает и обновляет месоположение каждые 5 секунд
        keyTimer = setInterval(() => {
            WhereIam();
        }, 5000);
        console.log("keyTimer: " + keyTimer);

        geoBtn.innerHTML = "🧭 Слеж.";
        // console.log("Слежение");
    }

}

document.querySelectorAll('.geoBtn').forEach(el => el.addEventListener('click', () => { geolocationModeSelection() }));



