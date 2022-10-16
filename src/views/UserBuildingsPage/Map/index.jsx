import styles from "styles/Map/Map.module.scss";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { useEffect } from "react";
import { fromLonLat } from "ol/proj";
import MVT from "ol/format/MVT";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import { useSelector } from "react-redux";
import { country, selectedCountry } from "./style";
import { Icon, Style } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import TileJSON from "ol/source/TileJSON";
import Overlay from "ol/Overlay";
import { Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MapLocation() {
  const selectedBuild = useSelector((state) => state?.getSelectedBuild);

  console.log(selectedBuild);
  useEffect(() => {
    if (selectedBuild?.selectedBuild) {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat(selectedBuild?.selectedBuild?.position)),
        name: "Null Island",
        population: 4000,
        rainfall: 500,
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: "data:image/png;base64,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",
          // src: "assets/icons/edit.png",
          scale: ".08",
        }),
      });

      iconFeature.setStyle(iconStyle);

      const vectorSource = new VectorSource({
        features: [iconFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      const rasterLayer = new TileLayer({
        source: new TileJSON({
          url: "https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1",
          crossOrigin: "",
        }),
      });

      let selection = {};
      let key = selectedBuild?.selectedBuild?.locationId;
      selection[key] = "RenderFeature";

      const vtLayer = new VectorTileLayer({
        declutter: true,
        source: new VectorTileSource({
          maxZoom: 15,
          format: new MVT({
            idProperty: "iso_a3",
          }),
          url:
            "https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/" +
            "ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf",
        }),
        style: country,
      });

      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        target: document.getElementById("map"),
        view: new View({
          center: fromLonLat(selectedBuild?.selectedBuild?.position),
          zoom: 2,
          multiWorld: false,
        }),
      });

      new VectorTileLayer({
        map: map,
        renderMode: "vector",
        source: vtLayer.getSource(),
        style: function (feature) {
          if (feature.getId() in selection) {
            return selectedCountry;
          }
        },
      });

      // POPUP

      const element = document.getElementById("popup");
      const popup = new Overlay({
        element: element,
        positioning: "bottom-center",
        stopEvent: false,
      });
      map.addOverlay(popup);

      let popover;
      function disposePopover() {
        if (popover) {
          popover.dispose();
          popover = undefined;
        }
      }

      // display popup on click
      map.on("click", function (evt) {
        const feature = map.forEachFeatureAtPixel(
          evt.pixel,
          function (feature) {
            return feature;
          }
        );
        disposePopover();
        if (!feature) {
          return;
        }
        popup.setPosition(evt.coordinate);
        popover = new Popover(element, {
          placement: "top",
          html: true,
          content: `${selectedBuild?.selectedBuild?.buildingName} located in ${selectedBuild?.selectedBuild?.location}`,
        });
        popover.show();
      });

      // change mouse cursor when over marker
      map.on("pointermove", function (e) {
        const pixel = map.getEventPixel(e.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? "pointer" : "";
      });
      // Close the popup when the map is moved
      map.on("movestart", disposePopover);
    }
  }, [selectedBuild]);

  return (
    <div className={styles.Map}>
      <div id="map" className="map" style={{ height: "100%", width: "100%" }}>
        <div id="popup"></div>
      </div>
    </div>
  );
}
