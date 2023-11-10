import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { PAGE_IDX } from "../pages/pages.js";

export default function FooterView({ onClickPage, pageId: selectedPageId }) {
  return (
    <BottomNavigation>
      {Object.entries(PAGE_IDX).map(function ([pageId, d]) {
        const key = "button-" + pageId;
        const isSelected = pageId === selectedPageId;
        const color = isSelected ? "#fff" : "#000";
        const background = isSelected ? "#eee" : "#fff";
        return (
          <BottomNavigationAction
            key={key}
            icon={<d.Icon />}
            onClick={function () {
              onClickPage(pageId);
            }}
            disabled={isSelected}
            sx={{ color, background, borderRadius: 6 }}
          />
        );
      })}
    </BottomNavigation>
  );
}
