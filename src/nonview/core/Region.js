
export default class Region {
    constructor(regionID) {
        this.regionID = regionID;
    }

    get regionType() {
        return 'province'; // TODO: Implement RegionType and getter from regionID
    }

    get url() {
        return `https://github.com/nuuuwan/gig-data/blob/master/geo/${this.regionType}/${this.regionID}.json`
    }
|}