import { Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Feature from "ol/Feature";
import MVT from "ol/format/MVT";
import Point from "ol/geom/Point";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorTileLayer from "ol/layer/VectorTile";
import Map from "ol/Map";
import "ol/ol.css";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import VectorTileSource from "ol/source/VectorTile";
import { Icon, Style } from "ol/style";
import View from "ol/View";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "styles/Map/Map.module.scss";
import { country, selectedCountry } from "./style";

export default function MapLocation() {
  const selectedBuild = useSelector((state) => state?.getSelectedBuild);

  useEffect(() => {
    if (selectedBuild?.selectedBuild) {
      const iconFeature = new Feature({
        geometry: new Point(
          fromLonLat(selectedBuild?.selectedBuild?.position.reverse())
        ),
        // name: "Null Island",
        population: 4000,
        rainfall: 500,
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 100],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: "https://raw.githubusercontent.com/MahmoudHefnii/admin/main/src/assets/icons/location.png",
          scale: "0.3",
        }),
      });

      iconFeature.setStyle(iconStyle);

      const vectorSource = new VectorSource({
        features: [iconFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      let selection = {};
      let key = selectedBuild?.selectedBuild?.locationId;
      selection[key] = "RenderFeature";

      const vtLayer = new VectorTileLayer({
        declutter: true,
        source: new VectorTileSource({
          maxZoom: 5,
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
          center: fromLonLat(selectedBuild?.selectedBuild?.position.reverse()),
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
