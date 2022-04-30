import React from "react";
import { Polygon } from "react-native-maps";

function CustomPolygon({ onLayout, ...props }) {
  const ref = React.useRef();

  function onLayoutPolygon() {
    if (ref.current) {
      ref.current.setNativeProps({ fillColor: props.fillColor });
    }
    // call onLayout() from the props if you need it
  }

  return <Polygon ref={ref} onLayout={onLayoutPolygon} {...props} />;
}

export default CustomPolygon;
