import Cache from "../../nonview/base/Cache";
import MathX from "../../nonview/base/MathX";

const R_FACTOR = 120_000;
const MAX_GENERATIONS = 100;
const SPEED = 0.0000001;
export class PositionInfo {
  constructor(regionID, centroid, radius) {
    this.regionID = regionID;
    this.centroid = centroid;
    this.radius = radius;
  }

  getGeoDistanceVector(other) {
    const [lat1, lng1] = this.centroid;
    const [lat2, lng2] = other.centroid;

    const dlat = lat1 - lat2;
    const dlng = lng1 - lng2;
    return [dlat, dlng];
  }

  static getGeoDistance([dlat, dlng]) {
    return Math.sqrt(dlat ** 2 + dlng ** 2);
  }

  getRadiusDistance(other) {
    return this.radius + other.radius;
  }
}

export default class Dorling {
  static reposition(posInfoList) {
    return Cache.getSync(JSON.stringify(posInfoList), function () {
      return Dorling.repositionNonCache(posInfoList);
    });
  }
  static repositionNonCache(posInfoList) {
    console.debug("⌛", "Dorling.repositionNonCache", posInfoList.length);
    const n = posInfoList.length;
    let iGeneration = 0;
    while (true) {
      iGeneration += 1;
      if (iGeneration > MAX_GENERATIONS) {
        break;
      }
      let newPosInfoList = [];
      let hasSomeOverlapGlobal = false;
      for (let i1 of MathX.range(0, n)) {
        const posInfo1 = posInfoList[i1];
        let [slat, slng] = [0, 0];
        let hasSomeOverlap = false;
        for (let i2 of MathX.range(0, n)) {
          if (i2 === i1) {
            continue;
          }
          const posInfo2 = posInfoList[i2];

          const [dlat, dlng] = posInfo1.getGeoDistanceVector(posInfo2);
          const geoDistance = PositionInfo.getGeoDistance([dlat, dlng]);
          const radiusDistance = posInfo1.getRadiusDistance(posInfo2);
          const isOverlapping = geoDistance * R_FACTOR < radiusDistance;
          if (isOverlapping) {
            hasSomeOverlap = true;
            const force = radiusDistance / geoDistance ** 2;
            [slat, slng] = [dlat, dlng].map((x) => x * force * SPEED);
          }
        }

        let newPosInfo1 = new PositionInfo(
          posInfo1.regionID,
          posInfo1.centroid,
          posInfo1.radius
        );
        if (hasSomeOverlap) {
          hasSomeOverlapGlobal = true;
          let [lat, lng] = posInfo1.centroid;
          lat += slat;
          lng += slng;
          newPosInfo1.centroid = [lat, lng];
        }
        newPosInfoList.push(newPosInfo1);
      }
      if (!hasSomeOverlapGlobal) {
        break;
      }
      posInfoList = newPosInfoList;
    }
    return posInfoList;
  }
}
