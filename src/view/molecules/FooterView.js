import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

export default function FooterView({ onClick }) {
  return (
    <BottomNavigation>
      <BottomNavigationAction icon={<TuneIcon />} onClick={onClick} />
    </BottomNavigation>
  );
}
