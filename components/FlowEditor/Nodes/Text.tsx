import {FC} from 'react';
import {NodeProps} from 'reactflow';

import Wrapper from './Wrapper';

const TextNode: FC<NodeProps> = (props) => {
  return <Wrapper {...props}>TextNode</Wrapper>
}

export default TextNode;
