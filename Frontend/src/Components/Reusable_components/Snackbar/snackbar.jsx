import "./snackbar.css";
import { useEffect } from "react";

function Snackbar({
  children,
  onClose,
  iconColor = "white",
  AutoHideDuration = 5000,
  bgColor = "#323232",
  fontColor = "white",
  sbHeight = "50px",
  sbWidth = "auto",
  sbMaxWidth = "300px",
  positionStyles = {
    top: "95%",
    left: "50%",
    transform: "translate(-50%,-95%)",
  },
}) {
  useEffect(() => {
    if (
      (!AutoHideDuration ||
        AutoHideDuration <= 0 ||
        AutoHideDuration === "" ||
        AutoHideDuration === " ",
      AutoHideDuration === null || AutoHideDuration === undefined)
    ) {
      return;
    }
    const timer = setTimeout(() => {
      onClose();
    }, AutoHideDuration);
    return () => clearTimeout(timer);
  }, [AutoHideDuration]);

  return (
    <div id="snackbar-container" style={{ ...positionStyles }}>
      <div
        id="snackbar"
        style={{
          maxWidth: sbMaxWidth,
          backgroundColor: bgColor,
          color: fontColor,
          height: sbHeight,
          width: sbWidth,
        }}
      >
        <div id="snackbar-contents">{children}</div>

        <button id="bg-iconbtn" onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Snackbar;