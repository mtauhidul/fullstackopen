import React, { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, refs) => {
  const [isVisible, setIsVisible] = useState(false);
  const { buttonLabelShow, buttonLabelHide, children } = props;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      {!isVisible && (
        <button onClick={toggleVisibility}>{buttonLabelShow}</button>
      )}
      {isVisible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>{buttonLabelHide}</button>
        </div>
      )}
    </div>
  );
});

export default Togglable;
