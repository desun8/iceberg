import DG from '2gis-maps';
import { mqIsDesktop } from './utils/mediaQueryEvent';

class Map {
  private map: DG | undefined;
  private coords: number[];
  private marker: DG;

  constructor() {
    this.map = undefined;
    this.coords = [55.80918971707443, 37.48324268700438];
    this.marker = DG.icon({
      iconUrl: 'images/icons/map-marker.svg',
      iconSize: mqIsDesktop ? [80, 80] : [38, 38],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

    this.init();
  }

  init() {
    DG.then(() => {
      this.map = DG.map('map', {
        center: this.coords,
        zoom: 16,
        scrollWheelZoom: false, // откючение зумма при скроллинге
        fullscreenControl: false, // скрытие кнопки "во весь экран"
        zoomControl: false, // скрытие кнопок зумма
        poi: false,
      });

      DG.marker(this.coords, { icon: this.marker })
        .addTo(this.map);

      DG.control.zoom({ position: 'bottomleft' })
        .addTo(this.map);
    });
  }
}

export default Map;
