import DG from '2gis-maps';

const initMap = () => {
  let map;
  const coord = [55.728860, 37.670280];

  DG.then(() => {
    map = DG.map('map', {
      center: coord,
      zoom: 16,
      scrollWheelZoom: false, // откючение зумма при скроллинге
      fullscreenControl: false, // скрытие кнопки "во весь экран"
      zoomControl: false, // скрытие кнопок зумма
      poi: false,
    });

    DG.marker(coord)
      .addTo(map);
  });
};

export default initMap;
