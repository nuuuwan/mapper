import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import BugIcon from "@mui/icons-material/BugReport";

export default function FooterView({ onClick }) {
  const onClickBug = function () {
    window.open("https://github.com/nuuuwan/mapper/issues/new", "_blank");
  };

  return (
    <BottomNavigation>
      <BottomNavigationAction icon={<BugIcon />} onClick={onClickBug} />
      <BottomNavigationAction icon={<TuneIcon />} onClick={onClick} />
    </BottomNavigation>
  );
}
