import { Color_Main } from "constants";
import { MAP_COLOR } from "constants";
import { Fill, Stroke, Style } from "ol/style";

export const country = new Style({
  stroke: new Stroke({
    color: "gray",
    width: 1,
  }),
  fill: new Fill({
    color: "rgba(20,20,20,0.9)",
  }),
});

export const selectedCountry = new Style({
  stroke: new Stroke({
    color: Color_Main,
    width: 2,
  }),
  fill: new Fill({
    color: MAP_COLOR,
  }),
});
