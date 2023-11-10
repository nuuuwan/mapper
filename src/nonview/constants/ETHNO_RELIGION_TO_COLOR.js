import COLOR_SL_FLAG from "../../nonview/constants/COLOR_SL_FLAG";

const ETHNO_RELIGION_TO_COLOR = {
  // ethnicity_of_population
  bharatha: "#00ffff",
  burgher: "#ff00ff",
  chetty: "#0000ff",
  indian_tamil: COLOR_SL_FLAG.TAMIL,
  malay: COLOR_SL_FLAG.MOOR,
  moor: COLOR_SL_FLAG.MOOR,
  sinhalese: COLOR_SL_FLAG.SINHALA,
  sri_lankan_tamil: COLOR_SL_FLAG.TAMIL,
  // religious_affiliation_of_population
  buddhist: COLOR_SL_FLAG.BUDDHIST,
  islam: COLOR_SL_FLAG.MOOR,
  hindu: COLOR_SL_FLAG.TAMIL,
  roman_catholic: "#ff00ff",
  other_christian: "0000ff",
  //
  ind_tamil: COLOR_SL_FLAG.TAMIL,
  sl_tamil: "#ff8888",
  sl_moor: COLOR_SL_FLAG.MOOR,
};

export default ETHNO_RELIGION_TO_COLOR;
