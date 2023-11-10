const COLOR_TO_POLITICAL_PARTIES = {
  "#0000cc": ["SLFP", "PA", "UPFA"],
  "#008800": ["UNP", "NDF"],
 "#00aa00": ["SJB"],
  "#880000": ["SLPP"],
  "#ff8800": ["ACTC"],
  "#ff0088": ["NPP"],
  "#ff0000": ["JVP", "LSSP", "EPDP", "NMPP", "JJB", "TMVP", "TULF", "DPLF","TELO"],
  "#ffee00": ["ITAK", "AITC"],
  "#004400": ["MNA", "SLMC", "NUA"],
};

const POLITICAL_PARTY_TO_COLOR = Object.entries(
  COLOR_TO_POLITICAL_PARTIES
).reduce(function (COLOR_TO_POLITICAL_PARTIES, [color, polical_parties]) {
  for (let political_party of polical_parties) {
    COLOR_TO_POLITICAL_PARTIES[political_party] = color;
  }
  return COLOR_TO_POLITICAL_PARTIES;
}, {});

export default POLITICAL_PARTY_TO_COLOR;
