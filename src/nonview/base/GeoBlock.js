import LngLat from "./LngLat.js";
import BBox from "./BBox.js";
export default class GeoBlock {
  static __get_dims__(bbox) {}

  constructor(polygonList) {
    this.polygonList = polygonList;
  }

  // Property Getters
  get latLngList() {
    return LngLat.fromPolygonList(this.polygonList);
  }

  get bbox() {
    return BBox.fromLngLatList(this.latLngList);
  }

  get dims() {
    const [lngMin, latMin, lngMax, latMax] = this.bbox.toArray();
    const [lngSpan, latSpan] = [lngMax - lngMin, latMax - latMin];
    const minSpan = Math.min(lngSpan, latSpan);
    const dim = minSpan / 4;
    const nLat = Math.ceil(latSpan / dim);
    const nLng = Math.ceil(lngSpan / dim);
    const dimLat = latSpan / nLat;
    const dimLng = lngSpan / nLng;

    function getIndicesFromLngLat(lngLat) {
      const [lng, lat] = lngLat.toArray();
      const iLng = parseInt((lng - lngMin) / dimLng);
      const iLat = parseInt((lat - latMin) / dimLat);

      return [iLat, iLng];
    }

    function getLngLatFromIndices(iLat, iLng) {
      const lng = lngMin + iLng * dimLng;
      const lat = latMin + iLat * dimLat;
      return new LngLat(lng, lat);
    }

    let indices = [];
    for (let iLat = 0; iLat < nLat; iLat++) {
      for (let iLng = 0; iLng < nLng; iLng++) {
        indices.push([iLat, iLng]);
      }
    }

    let containedIdSet = new Set();
    for (let latLng of this.latLngList) {
      const [iLat, iLng] = getIndicesFromLngLat(latLng);
      if (iLat < nLat && iLng < nLng) {
        // Ignore Max
        containedIdSet.add([iLat, iLng].join("-"));
      }
    }
    const containedIndices = Array.from(containedIdSet).map((id) =>
      id.split("-").map((x) => parseInt(x))
    );

    return {
      nLng,
      nLat,
      indices,
      containedIndices,
      dimLng,
      dimLat,
      getIndicesFromLngLat,
      getLngLatFromIndices,
    };
  }

  // Getters
  getBlockBBoxList() {
    const { containedIndices, dimLng, dimLat, getLngLatFromIndices } =
      this.dims;
    let bbox = [];
    for (let [iLng, iLat] of containedIndices) {
      const lngLat = getLngLatFromIndices(iLng, iLat);

      const blockBBox = new BBox(
        lngLat,
        new LngLat(lngLat.lng + dimLng, lngLat.lat + dimLat)
      );
      bbox.push(blockBBox);
    }
    return bbox;
  }

  getLargestRectBBox() {
    const { nLng, nLat, containedIndices, getLngLatFromIndices } = this.dims;
    const containedIdSet = new Set(
      containedIndices.map(([iLat, iLng]) => [iLat, iLng].join("-"))
    );

    function isRectComplete(sLng, sLat, iLng0, iLat0) {
      const id00 = [iLat0, iLng0].join("-");
      const id11 = [iLat0 + sLat - 1, iLng0 + sLng - 1].join("-");
      const id10 = [iLat0 + sLat - 1, iLng0].join("-");
      const id01 = [iLat0, iLng0 + sLng - 1].join("-");
      return (
        containedIdSet.has(id00) &&
        containedIdSet.has(id11) &&
        containedIdSet.has(id10) &&
        containedIdSet.has(id01)
      );
    }

    function cmpDim(sLng, sLat) {
      // return Math.max(sLng , sLat);
      return sLng * sLat;
    }

    function findCompleteRect() {
      let dimPairs = [];
      for (let sLng = nLng; sLng > 0; sLng--) {
        for (let sLat = nLat; sLat > 0; sLat--) {
          dimPairs.push([sLng, sLat]);
        }
      }

      const sortedDimPairs = dimPairs.sort(([sLng1, sLat1], [sLng2, sLat2]) => {
        const c1 = cmpDim(sLng2, sLat2) - cmpDim(sLng1, sLat1);
        if (c1 !== 0) {
          return c1;
        }
        return sLng2 - sLng1;
      });

      for (let [sLng, sLat] of sortedDimPairs) {
        for (let iLng0 = 0; iLng0 <= nLng - sLng + 1; iLng0++) {
          for (let iLat0 = 0; iLat0 <= nLat - sLat + 1; iLat0++) {
            if (isRectComplete(sLng, sLat, iLng0, iLat0)) {
              return { sLng, sLat, iLng0, iLat0 };
            }
          }
        }
      }

      return null;
    }

    const { sLng, sLat, iLng0, iLat0 } = findCompleteRect();
    const minLngLat = getLngLatFromIndices(iLat0, iLng0);
    const maxLngLat = getLngLatFromIndices(iLat0 + sLat, iLng0 + sLng);
    return new BBox(minLngLat, maxLngLat);
  }
}
