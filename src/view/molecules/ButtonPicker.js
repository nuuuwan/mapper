import { Button, Paper } from "@mui/material";
import { ShowHide } from "../atoms";


export default function ButtonPicker({ optionList, selectedOption, onClick, Icon }) {
  return (
    <ShowHide Icon={Icon} isShow={false}>
      <Paper sx={{ p: 1, m: 1,opacity: 0.95 }}>
        {optionList.map(function (option, iOption) {
          const key = "button-picker-option-" + iOption;
          const isSelected = option === selectedOption;
          const onClickInner = async function () {
            await onClick(option);
          };
          return (
            <Button key={key} onClick={onClickInner} disabled={isSelected}>
              {option.toString()}
            </Button>
          );
        })}
      </Paper>
    </ShowHide>
  );
}
