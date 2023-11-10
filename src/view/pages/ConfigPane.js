import { Component } from "react";
import { STYLE } from "./HomePageStyle";
import MeasurementPicker from "../molecules/MeasurementPicker";

export default class ConfigPane extends Component {
  render() {
    const { onChangeTableName } = this.props;
    return (
      <div style={STYLE.BODY_CONTENT_SCROLLABLE}>
        <MeasurementPicker onChangeTableName={onChangeTableName} />
      </div>
    );
  }
}
