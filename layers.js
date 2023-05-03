//  Управление слоями

// Контура

// Контура полей (fields)
var fields = L.geoJson(field, {

  onEachFeature: function (feature, lyr) {
    // Выводим ярлык с номером поля (можно HTML)
    let text_html = '<div><h3>Поле №' + feature?.properties?.Name + '</h3><h4> Площадь: ' + feature?.properties?.area + ' га</h4></div>'
    lyr.bindPopup(text_html);
    // lyr.bindTooltip(feature?.properties?.Name, {
    //   direction: 'bottom',
    //   // permanent: true,  //  отключать на мелких масштабах. грузит общии контура и зоны
    //   sticky: true,
    //   offset: [0, 20],
    //   opacity: 0.75,
    //   className: 'leaflet-tooltip-field'
    // }
    // )

  },
  style: {
    "color": "#006eff", // Цвет контура файл (leaflet.js)
    "weight": 1, // Толщина контура
    "opacity": 0.65, // Прозрачность контура
    "fillColor": "#00FF00", // Заливка контура
    "fillOpacity": 0.04, // Прозрачность заливки
  },
  // Фильтр
  filter: function (feature) {
    // if (feature?.properties?.area > 200){
    return true
    // }
  }

}).addTo(map); // Сразу добавляет слой на карту

var UAV = L.tileLayer('https://ardbot.ru/tiles/{z}/{x}/{y}.png', {
  opacity: 1.0, // Прозрачность подложки
  attribution: '<a href="https://ardbot.ru">Ardbot</a>',
  minZoom: 0,
  maxZoom: 20
}).addTo(map);


var baseMaps = {
  "OpenStreetMap": osm,
};

var overlayMaps = {
  "Поля": fields,
  "БПЛА": UAV
};


var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);