import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { PAGE_IDX } from "../pages/pages.js";

export default function FooterView({ onClickPage, pageId: selectedPageId }) {
  return (
    <BottomNavigation>
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
    </BottomNavigation>
  );
}
