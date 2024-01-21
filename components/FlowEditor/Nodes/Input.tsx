import {FC} from 'react';
import {NodeProps} from 'reactflow';

import Wrapper from './Wrapper';

const InputNode: FC<NodeProps> = (props) => {
  return <Wrapper {...props}>InputNode</Wrapper>
}

export default InputNode;
