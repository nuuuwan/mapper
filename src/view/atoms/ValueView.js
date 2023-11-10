import ColorView from "./ColorView";

export default function ValueView({ value, color }) {
  return <ColorView color={color} label={value} />;
}
