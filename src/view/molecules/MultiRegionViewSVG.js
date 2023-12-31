import { RegionViewShapeSVG } from "../organisms";
import ColorLegendSVG from "./ColorLegendSVG";

const SVG_WIDTH = 1000;
const SVG_PADDING = 10;

export default function MultiRegionViewSVG({ bbox, config, onClickRegion }) {
  const svg_height =
    (0.8 * (SVG_WIDTH * window.innerHeight)) / window.innerWidth;

  const t = bbox.getTransform(SVG_WIDTH, svg_height, SVG_PADDING);

  const innerShapes = config.sortedRegionInfoList.map(function (info) {
    const regionId = info.id;
    const key = "region-shape-" + regionId;

    return (
      <RegionViewShapeSVG
        key={key}
        regionId={regionId}
        info={info}
        t={t}
        showPolygonList={true}
        onClickRegion={onClickRegion}
      />
    );
  });

  const innerLabels = config.sortedRegionInfoList.map(function (info) {
    const regionId = info.id;
    const key = "region-label-" + regionId;

    return (
      <RegionViewShapeSVG
        key={key}
        regionId={regionId}
        info={info}
        t={t}
        onClickRegion={onClickRegion}
        showLabel={true}
        showBBox={false}
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
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Akshar');
        </style>
      </defs>
      {innerShapes}
      {innerLabels}

      <text
        x={950}
        y={40}
        fill="black"
        fontFamily="Akshar"
        fontSize="40"
        textAnchor="end"
      >
        {config.name}
      </text>
      <ColorLegendSVG config={config} x={950} y={75} />
    </svg>
  );
}
