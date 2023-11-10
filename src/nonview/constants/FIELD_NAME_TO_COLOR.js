import ETHNO_RELIGION_TO_COLOR from "../../nonview/constants/ETHNO_RELIGION_TO_COLOR";
import POLITICAL_PARTY_TO_COLOR from "../../nonview/constants/POLITICAL_PARTY_TO_COLOR";

const FIELD_NAME_TO_COLOR_INNER = {
  Others: "#F8F8FF",  // ghostwhite
  other: "#F8F8FF",   // ghostwhite
  others: "#F8F8FF",  // ghostwhite

  // economic-activity
  employed: "#008000",  // green
  economically_not_active: "#0000FF",  // blue
  unemployed: "#FF0000",  // red

  // gender_of_population
  female: "#FFC0CB",  // pink
  male: "#ADD8E6",  // lightblue

  // relationship_to_household_head_of_population
  son_or_daughter: "#008000",  // green
  head: "#0000FF",  // blue
  wife_or_husband: "#FFC0CB",  // pink
  grandchild_or_great_grand_child: "#006400",  // darkgreen
  other_relative: "#FFFF00",  // yellow
  non_relative: "#C0C0C0",  // silver
  son_or_daughter_in_law: "#90EE90",  // lightgreen
  parent_of_head_or_spouse: "#FF0000",  // red
  boarder: "#808080",  // gray
  domestic_employee: "#A52A2A",  // brown
  clergy: "#FFFF00",  // yellow

  // communication_items_owned_by_household
  tv: "#008000",  // green
  mobile: "#800080",  // purple
  radio: "#800000",  // maroon
  fixed_tp: "#0000FF",  // blue
  pc: "#FF0000",  // red
  laptop: "#FFC0CB",  // pink
  fax: "#C0C0C0",  // silver

  // cooking_fuel_of_household
  fire_wood: "#A52A2A",  // brown
  gas: "#FFA500",  // orange
  kerosene: "#800080",  // purple
  electricity: "#0000FF",  // blue

  // roof_type_in_housing_unit, rooms_in_housing_unit, floor_type_in_housing_unit
  asbestos: "#808080",  // gray
  tile: "#8B0000",  // darkred
  metal_sheet: "#C0C0C0",  // silver
  concrete: "#008000",  // green
  zink_aluminium_sheet: "#0000FF",  // blue
  cement: "#D3D3D3",  // lightgray
  tile_or_granite_or_terrazo: "#FFA500",  // orange
  mud: "#A52A2A",  // darkbrown
  wood: "#A52A2A",  // brown

  // solid_waste_disposal_by_household
  occupants_burn: "#FF0000",  // red
  occupants_bury: "#FFA500",  // orange
  collected_by_local_authorities: "#0000FF",  // blue
  occupants_composting_solid_waste: "#008000",  // green

  // source_of_drinking_water_of_household
  tap_within_unit_main_line: "#006400",  // darkgreen
  tap_within_premises_but_outside_unit_main_line: "#008000",  // green
  tap_outside_premises_main_line: "#FFA500",  // orange
  protected_well_within_premises: "#0000FF",  // blue
  protected_well_outside_premises: "#ADD8E6",  // lightblue
  unprotected_well: "#800080",  // purple
  tube_well: "#00FFFF",  // cyan
  rural_water_projects: "#FFC0CB",  // pink
  river_or_tank_or_stream: "#FF0000",  // red
  bottled_water: "#C0C0C0",  // silver

  // structure_of_housing_units
  single_house_single_floor: "#006400",  // darkgreen
  single_house_double_floor: "#008000",  // green
  single_house_more_than_2_floors: "#90EE90",  // lightgreen
  row_house_or_line_room: "#FFA500",  // orange
  attached_house_or_annex: "#C0C0C0",  // silver
  twin_house: "#00FFFF",  // cyan
  flat: "#0000FF",  // blue
  condominium: "#800080",  // purple
  hut_or_shanty: "#FF0000",  // red

  // housing_ownership_status_of_household
  owned_by_a_household_member: "#008000",  // green
  rent_or_lease_privately_owned: "#0000FF",  // blue
  rent_or_lease_government_owned: "#00FFFF",  // cyan
  occupied_free_of_rent: "#FFA500",  // orange
  encroached: "#FF0000",  // red

  // toilet_facilities_of_household
  water_seal_and_connected_to_a_piped_sewer_system: "#008000",  // green
  water_seal_and_connected_to_a_septic_tank: "#90EE90",  // lightgreen
  pour_flush_toilet_not_water_seal: "#FFA500",  // orange
  direct_pit: "#FF0000",  // red
  not_using_a_toilet: "#000000",  // black

  // lighting_of_household
  electricity_national_electricity_network: "#0000FF",  // blue
  solar_power: "#FFFF00",  // yellow
  bio_gas: "#FFA500",  // orange

  // living_quarters
  housing_unit: "#008000",  // green
  collective_living_quarter: "#FFA500",  // orange
  non_housing_unit: "#FF0000",  // red

  // type_of_housing_unit
  semi_permanent: "#FFA500",  // orange
  permanent: "#008000",  // green
  improvised: "#FF0000",  // red
  unclassified: "#000000",  // black

  // marital_status_of_population
  married_registered: "#0000FF",  // blue
  never_married: "#008000",  // green
  widowed: "#FFA500",  // orange
  married_customary: "#ADD8E6",  // lightblue
  separated_not_legally: "#FFC0CB",  // pink
  divorced: "#FF0000",  // red
  legally_separated: "#800000",  // maroon

  // wall_type_in_housing_units
  cement_block_or_stone: "#A9A9A9",  // darkgray
  brick: "#800000",  // maroon
  cabook: "#FFA500",  // orange
  soil_bricks: "#008000",  // green
  plank_or_metal_sheet: "#C0C0C0",  // silver

  // occupation_status_of_housing_units
  cadjan_or_palmyrah: "#FFA500",  // orange
  occupied: "#008000",  // green
  vacant: "#FF0000",  // red

  // year_of_construction_of_housing_unit
  // persons_living_in_housing_unit
};

const FIELD_NAME_TO_COLOR = {
  ...POLITICAL_PARTY_TO_COLOR,
  ...ETHNO_RELIGION_TO_COLOR,
  ...FIELD_NAME_TO_COLOR_INNER,
};
export default FIELD_NAME_TO_COLOR;
