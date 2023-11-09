import LngLat from "./LngLat.js";
export default class GeoBlock {
  static getBlockLngLat(lngLat, dim) {
    const lngBlock = parseInt(lngLat.lng / dim) * dim;
    const latBlock = parseInt(lngLat.lat / dim) * dim;
    return new LngLat(lngBlock, latBlock);
  }
  static getBlockLngLatList(lngLatList, dim) {
    return LngLat.unique(
      lngLatList.map((lngLat) => GeoBlock.getBlockLngLat(lngLat, dim))
    );
  }
}
