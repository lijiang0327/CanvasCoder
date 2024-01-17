import {FC, CSSProperties} from 'react';
import {Typography} from 'antd';
import {type TextProps} from 'antd/es/typography/Text'

import { IComponent } from '@/store/editorStore.d';
import usePageStateStore from '@/store/pageStateStore';

const {Text} = Typography;
interface TextComponentProps extends TextProps {
  componentData: IComponent
  isRendering: boolean
};

const TextComponent: FC<TextComponentProps> = ({children, style, componentData, isRendering, ...rest}) => {
  const pageState = usePageStateStore(state => state.pageState);

  const text = String(componentData.variable ? pageState[componentData.variable] : children);

  const textStyle: CSSProperties = {
    ...style,
    userSelect: isRendering ? 'all' : 'none', 
    cursor: isRendering ? 'default' : 'pointer'
  }

  return <Text {...rest} style={{...textStyle}}>{text}</Text>
}

export default TextComponent;
