import {FC} from 'react';
import {NodeProps} from 'reactflow';

import Wrapper from './Wrapper';

const ImageNode: FC<NodeProps> = (props) => {
  return <Wrapper {...props}>ImageNode</Wrapper>
}

export default ImageNode;
