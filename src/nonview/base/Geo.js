import EntType from "./EntType";
import WWW from "./WWW";

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
}
