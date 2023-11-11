import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { PAGE_IDX } from "../pages/pages.js";

export default function FooterView({
  onClickPage,
  pageId: selectedPageId,
  tableName,
}) {
  const isTableNameSelected = tableName !== null;
  return (
    <BottomNavigation>
      {Object.entries(PAGE_IDX).map(function ([pageId, d]) {
        const key = "button-" + pageId;
        const isSelected = pageId === selectedPageId;
        let disabled = isSelected;
        if (!isTableNameSelected && pageId !== "config") {
          disabled = true;
        }
        const color = disabled ? "#fff" : "#000";
        const background = disabled ? "#ccc" : "#fff";
        return (
          <BottomNavigationAction
            key={key}
            icon={<d.Icon />}
            onClick={function () {
              onClickPage(pageId);
            }}
            disabled={disabled}
            sx={{ color, background }}
          />
        );
      })}
    </BottomNavigation>
  );
}
