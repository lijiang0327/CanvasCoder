import {FC} from 'react';
import {NodeProps} from 'reactflow';

import Wrapper from './Wrapper';

const ButtonNode: FC<NodeProps> = (props) => {
  return <Wrapper {...props}>ButtonNode</Wrapper>
}

export default ButtonNode;
