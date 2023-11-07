import { RegionViewShape, RegionViewLabel } from "../organisms";

const SVG_WIDTH = 1000;
const SVG_PADDING = 10;

export default function MultiRegionView({ bbox, config, onClickRegion }) {
  const svg_height = 0.8 * (SVG_WIDTH * window.innerHeight) / window.innerWidth;

  const t = bbox.getTransform(SVG_WIDTH, svg_height, SVG_PADDING);

  const innerShapes = config.sortedRegionInfoList.map(function (info) {
    const regionID = info.id;
    const key = "region-shape-" + regionID;

    return (
      <RegionViewShape
        key={key}
        regionID={regionID}
        info={info}
        t={t}
        onClickRegion={onClickRegion}
      />
    );
  });

  const innerLabels = config.sortedRegionInfoList.map(function (info) {
    const regionID = info.id;
    const key = "region-label-" + regionID;

    return (
      <RegionViewLabel
        key={key}
        regionID={regionID}
        info={info}
        t={t}
        onClickRegion={onClickRegion}
      />
    );
  });

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${svg_height}`}
      width="100%"
      height="80vh"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Akshar');
        </style>
      </defs>
      {innerShapes}
      {innerLabels}
    </svg>
  );
}
