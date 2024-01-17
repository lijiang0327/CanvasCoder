import {FC} from 'react';
import {Typography} from 'antd';
import {type TextProps} from 'antd/es/typography/Text'

import { IComponent } from '@/store/editorStore.d';
import usePageStateStore from '@/store/pageStateStore';

const {Text} = Typography;
interface TextComponentProps extends TextProps {
  componentData: IComponent
};

const TextComponent: FC<TextComponentProps> = ({children, style, componentData, ...rest}) => {
  const pageState = usePageStateStore(state => state.pageState);

  const text = String(componentData.variable ? pageState[componentData.variable] : children);

  return <Text {...rest} style={{...style, userSelect: 'none', cursor: 'pointer'}}>{text}</Text>
}

export default TextComponent;
