import {FC} from 'react';
import {NodeProps, Handle, Position} from 'reactflow';

import Wrapper from './Wrapper';

const TitleNode: FC<NodeProps> = (props) => {
  return <Wrapper {...props}>
    TitleNode
    <Handle position={Position.Left} type="target" isConnectable={props.isConnectable} />
    <Handle position={Position.Right} type="source" isConnectable={props.isConnectable} />
  </Wrapper>
}

export default TitleNode;
