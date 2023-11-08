export default class LngLat {
  constructor(lng, lat) {
    this.lng = lng;
    this.lat = lat;
  }

  equals(lngLat) {
    return this.id === lngLat.id;
  }

  get id() {
    return `${this.lng.toFixed(4)},${this.lat.toFixed(4)}`;
  }

  static fromCoordinate(coordinate) {
    const [lng, lat] = coordinate;
    return new LngLat(lng, lat);
  }

  static fromPolygon(polygon) {
    return polygon.reduce(function (lngLatList, coordinate) {
      lngLatList.push(LngLat.fromCoordinate(coordinate));
      return lngLatList;
    }, []);
  }

  static fromPolygonList(polygonList) {
    return polygonList.reduce(function (lngLatList, polygon) {
      return [].concat(lngLatList, LngLat.fromPolygon(polygon));
    }, []);
  }

  static fromPolygonListList(polygonListList) {
    return polygonListList.reduce(function (lngLatList, polygonList) {
      return [].concat(lngLatList, LngLat.fromPolygonList(polygonList));
    }, []);
  }

  static fromPolygonListListList(polygonListListList) {
    return polygonListListList.reduce(function (lngLatList, polygonListList) {
      return [].concat(lngLatList, LngLat.fromPolygonListList(polygonListList));
    }, []);
  }

  // constants
  static MIN = new LngLat(-180, -180);
  static MAX = new LngLat(180, 180);

  // Extreme Points in Sri Lanka
  static LK_NORTH = new LngLat(80.212222, 9.835556);
  static LK_SOUTH = new LngLat(80.589694, 5.923389);
  static LK_EAST = new LngLat(81.879167, 7.022222);
  static LK_WEST = new LngLat(79.516667, 9.383333);
}
