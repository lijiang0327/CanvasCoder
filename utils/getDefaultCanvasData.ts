import getDefaultCanvasStyle from "./getDefaultCanvasStyle";

const getDefaultCanvasData = () => {
  return {
    title: '',
    children: [],
    childrenMap: {},
    style: getDefaultCanvasStyle(),
    translateX: 0,
    translateY: 0,
    zoom: 1,
  }
}

export default getDefaultCanvasData;
