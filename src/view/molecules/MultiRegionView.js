import RegionView from "../organisms/RegionView.js";

const SVG_WIDTH = 1000;
const SVG_PADDING = 10;

export default function MultiRegionView({ bbox, config, onClickRegion }) {
  const svg_height = (SVG_WIDTH * window.innerHeight) / window.innerWidth;

  const t = bbox.getTransform(SVG_WIDTH, svg_height, SVG_PADDING);

  const inner = config.sortedRegionInfoList.map(function (info) {
    const regionID = info.id;
    const key = "region-" + regionID;
    const onClickInner = function () {
      onClickRegion(regionID);
    };
    return (
      <RegionView
        key={key}
        regionID={regionID}
        info={info}
        t={t}
        onClick={onClickInner}
      />
    );
  });

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${svg_height}`}
      width="100%"
      height="85vh"
      xmlns="http://www.w3.org/2000/svg"
    >
      {inner}
    </svg>
  );
}
