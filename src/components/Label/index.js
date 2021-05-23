import React from "react";

import {StyledLabel} from "./utils";

function Label({children, id, ...props}) {
  return (
    <StyledLabel htmlFor={id} {...props}>
      {children}
    </StyledLabel>
  );
}

export default Label;
