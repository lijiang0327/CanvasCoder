import { CSSProperties } from "react";

const getDefaultCanvasStyle = () => {
  return {
    width: 1400,
    height: 900,
    position: 'relative',
    backgroundColor: "#ffffff",
    backgroundImage: "",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  } as CSSProperties
}

export default getDefaultCanvasStyle;
