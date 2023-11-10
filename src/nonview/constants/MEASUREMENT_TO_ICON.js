import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CopyrightIcon from "@mui/icons-material/Copyright";
import CottageIcon from "@mui/icons-material/Cottage";
import DeleteIcon from "@mui/icons-material/Delete";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HouseIcon from "@mui/icons-material/House";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import RoofingIcon from "@mui/icons-material/Roofing";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import VillaIcon from "@mui/icons-material/Villa";
import WcIcon from "@mui/icons-material/Wc";
import WorkIcon from "@mui/icons-material/Work";

const MEASUREMENT_TO_ICON = {
  "population-age_group": CalendarMonthIcon,
  "population-ethnicity": TempleBuddhistIcon,
  "population-gender": WcIcon,
  "population-marital_status": WcIcon,
  "population-religion": TempleBuddhistIcon,
  "social-household_number_of_persons": Diversity3Icon,
  "social-household_occupation_status": WorkIcon,
  "social-household_ownership": CopyrightIcon,
  "social-household_per_housing_unit": HolidayVillageIcon,
  "social-household_structure": HouseSidingIcon,
  "social-household-communication_items": PhonelinkIcon,
  "social-household-cooking_fuel": OutdoorGrillIcon,
  "social-household-drinking_water": LocalDrinkIcon,
  "social-household-floor_type": VillaIcon,
  "social-household-lighting": LightbulbIcon,
  "social-household-living_quarters": CottageIcon,
  "social-household-relationship_to_owner": Diversity2Icon,
  "social-household-roof_type": RoofingIcon,
  "social-household-rooms": BedroomChildIcon,
  "social-household-toilet_facilities": WcIcon,
  "social-household-type_of_unit": MapsHomeWorkIcon,
  "social-household-wall_type": HomeWorkIcon,
  "social-household-waste_disposal": DeleteIcon,
  "social-household-year_of_construction": HouseIcon,
};
export default MEASUREMENT_TO_ICON;
