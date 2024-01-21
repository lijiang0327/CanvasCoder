import {FC, ReactNode, Children, cloneElement, isValidElement} from 'react';
import {NodeProps} from 'reactflow';
import classNames from 'classnames';

type NodeWrapperProps = NodeProps & {
  children: ReactNode,
};

const NodeWrapper: FC<NodeWrapperProps> = ({children, ...rest}) => {
  return <div 
    className={classNames("border-2 border-gray-400 border-solid", {"border-red-300": rest.selected})}
  >
    {Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          ...rest,
        });
      }

      return child;
    })}
  </div>
}

export default NodeWrapper;
