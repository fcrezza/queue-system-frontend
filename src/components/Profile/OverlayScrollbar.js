import React from "react";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";
import "overlayscrollbars/css/OverlayScrollbars.css";

function OverlayScrollbar({children}) {
  const options = {
    scrollbars: {autoHide: "leave", autoHideDelay: 200},
    overflowBehavior: {y: "hidden"}
  };

  return (
    <OverlayScrollbarsComponent options={options}>
      {children}
    </OverlayScrollbarsComponent>
  );
}

export default OverlayScrollbar;
