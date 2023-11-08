import EntType from "./EntType";
import WWW from "./WWW";
import LngLat from "./LngLat";

const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/gig-data/master/geo";

export default class Geo {
  static getURLForRegionId(regionId) {
    const regionType = EntType.fromEntId(regionId);
    return `${URL_BASE}/${regionType.id}/${regionId}.json`;
  }

  static async getPolygonList(regionId) {
    const url = Geo.getURLForRegionId(regionId);
    return await WWW.json(url);
  }

  static async getIdToPolygonList(regionIdList) {
    const polygonListList = await Promise.all(
      regionIdList.map(async function (regionId) {
        return await Geo.getPolygonList(regionId);
      })
    );

    return regionIdList.reduce(function (idToPolygonList, regionId, i) {
      idToPolygonList[regionId] = polygonListList[i];
      return idToPolygonList;
    }, {});
  }

  static async getIdToLngLatSet(regionIdList) {
    const idToPolygonList = await Geo.getIdToPolygonList(regionIdList);
    return Object.fromEntries(
      Object.entries(idToPolygonList).map(function ([id, polygonList]) {
        return [
          id,
          new Set(
            LngLat.fromPolygonList(polygonList).map((lngLat) => lngLat.id)
          ),
        ];
      })
    );
  }

  static hasIntersection(set1, set2) {
    for (const elem of set1) {
      if (set2.has(elem)) {
        return true;
      }
    }
    return false;
  }

  static async getOverlapGraph(regionIdList) {
    const timerLabel = "Geo.getOverlapGraph-" + regionIdList.join(",");
    console.time(timerLabel);
    const idToLngLatSet = await Geo.getIdToLngLatSet(regionIdList);
    let overlapPairs = [];
    const n = regionIdList.length;
    for (let i1 = 0; i1 < n - 1; i1++) {
      const regionId1 = regionIdList[i1];
      const lngLatSet1 = idToLngLatSet[regionId1];

      for (let i2 = i1 + 1; i2 < n; i2++) {
        const regionId2 = regionIdList[i2];
        const lngLatSet2 = idToLngLatSet[regionId2];

        const isOverlapping = Geo.hasIntersection(lngLatSet1, lngLatSet2);
        if (isOverlapping) {
          overlapPairs.push([regionId1, regionId2]);
        }
      }
    }
    console.timeEnd(timerLabel);

    return overlapPairs;
  }
}
