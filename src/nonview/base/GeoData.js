import EntTypes from "../../nonview/base/EntTypes";
import WWW from "../../nonview/base/WWW";

const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/gig-data/master/geo";

export const DEFAULT_ZOOM = 7;
export const DEFAULT_ZOOM_GEO = 14;
// export const DEFAULT_CENTER = [7.8742, 80.6511]; // Dambulla
export const DEFAULT_CENTER = [6.9157, 79.8636]; // Townhall Colombo

export default class GeoData {
  static async getGeoForRegion(regionID) {
    const regionType = EntTypes.getEntType(regionID);
    const url = URL_BASE + `/${regionType}/${regionID}.json`;
    return [await WWW.json(url)];
  }
}
