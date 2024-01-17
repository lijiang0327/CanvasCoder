import {CSSProperties} from 'react';

const getDefaultButtonStyle = () => {
  return {
    position: 'absolute' as CSSProperties['position'],
    top: 0,
    left: 0,
    width: 100,
    height: 60,
  }
}

export default getDefaultButtonStyle;
