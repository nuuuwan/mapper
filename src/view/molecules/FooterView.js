import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import BugIcon from "@mui/icons-material/BugReport";

import { PAGE_IDX } from "../pages/pages.js";

export default function FooterView({
  onClickPage,
  pageId: selectedPageId,
  isColorPickerOpen,
  onToggleColorPicker,
}) {
  const onClickBug = function () {
    window.open("https://github.com/nuuuwan/mapper/issues/new", "_blank");
  };



  return (
    <BottomNavigation>
      <BottomNavigationAction icon={<BugIcon />} onClick={onClickBug} />
      {Object.entries(PAGE_IDX).map(function ([pageId, d]) {
        const key = "button-" + pageId;
        const isSelected = pageId === selectedPageId;
        const color = isSelected ? "#eee" : "#000";
        return (
          <BottomNavigationAction
            key={key}
            icon={<d.Icon />}
            onClick={function () {
              onClickPage(pageId);
            }}
            disabled={isSelected}
            sx={{ color: color }}
          />
        );
      })}
      {selectedPageId === "map" ? (
      <BottomNavigationAction
        icon={<PaletteIcon />}
        onClick={onToggleColorPicker}
        disabled={!isColorPickerOpen}
        sx={{ color: isColorPickerOpen ? "#eee" : "#000" }}
      />) : null}
    </BottomNavigation>
  );
}
