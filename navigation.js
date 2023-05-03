// Блок навигации для leaflet. Сохраняет локально масштаб и последнее местоположение. Используется дополнительный модуль для записи в localStorage

// Домашняя точка
map_home = new Local_DB("map_home");

// Кнопка "Домой"
async function home() {
    if (map_home.read() == undefined) {
        // Запрос домашней точки у сервера
        // await getHome();
        map_home.write([50.1735,127.9495])
    }
    setView(map_home.read(), map_zoom.read())
}
document.querySelectorAll('.homeBtn').forEach(el => el.addEventListener('click', () => { home() }));


// Сохраняем текущее местоположение карты
map_centre = new Local_DB("map_centre");
map.on("moveend", function () {
    map_centre.write(map.getCenter())
})

// Сохраняем зум карты 
map_zoom = new Local_DB("map_zoom");
map.on("zoomend", function () {
    map_zoom.write(map.getZoom());
})

// Устанавливаем вид карты в точку
if (map_centre.read() != undefined & map_zoom.read() != undefined) {
    setView(map_centre.read(), map_zoom.read())
}

var popup = L.popup();

// Отображает координаты по правому клику
function locationPopup(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(JSON.stringify([+e.latlng['lat'].toFixed(4), +e.latlng['lng'].toFixed(4)])) // "+" Унарный оператор 
        .openOn(map);
}

map.on("contextmenu", locationPopup)



