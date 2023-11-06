const OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default class GeoLocation {
  static async getPosition() {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, OPTIONS)
    );
  }
  static async getLatLng() {
    let position;
    try {
      position = await GeoLocation.getPosition();
    } catch (error) {
      return null;
    }
    if (!position) {
      return null;
    }
    const coords = position.coords;
    return [coords.latitude, coords.longitude];
  }
}
