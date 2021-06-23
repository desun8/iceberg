import isMobile from "../../utils/isMobile";

export default () => {
  const loadMap = (initMap:  ()=>void) => {
    const key = "26674719-897d-4084-a4cb-2abab74e7a8f";
    const url = `https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU&load=Map,Placemark`;

    const script = document.createElement("script");
    script.src = url;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);
  };

  const initMap = () => {
    if (window.ymaps) {
      console.log("init map");
      const ymaps = window.ymaps;

      ymaps.ready(function () {
        const maps = [
          {
            mapID: "map-0",
            coords: [55.810010, 37.483355],
            mapControlsID: "map-0-controls",
          },
          {
            mapID: "map-1",
            coords: [55.729316, 37.609173],
            mapControlsID: "map-1-controls",
          },
        ];

        maps.forEach(mapOpt => {
          const map = new ymaps.Map(mapOpt.mapID, {
            center: mapOpt.coords,
            zoom: 16,
          });

          map.geoObjects.add(new ymaps.Placemark(mapOpt.coords));
          map.behaviors.disable(["scrollZoom"]);

          if (isMobile()){
            //... отключаем перетаскивание карты
            map.behaviors.disable('drag');
          }

          const controlElm = document.getElementById(mapOpt.mapControlsID) as HTMLElement;
          const controlBtns = Array.from(controlElm.querySelectorAll(".btn")) as HTMLButtonElement[];

          controlBtns.forEach(btn => {
            const isZoomIn = btn.classList.contains("btn--plus");
            btn.onclick = () => {
              const currZoom = map.getZoom();
              let newZoom: number;

              if (isZoomIn) {
                newZoom = currZoom + 1;
              } else {
                newZoom = currZoom - 1;
              }

              if (newZoom >= 10 && newZoom <= 20) {
                map.setZoom(newZoom);
              }
            };
          });
        });
      });
    } else {
      console.warn("init map");
    }
  };

  loadMap(initMap);
}
