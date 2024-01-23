import ReactFlow, {Node, Edge} from 'reactflow';
import {FC, useMemo} from 'react';
import 'reactflow/dist/style.css';

import useEditorStore, {} from '@/store/editorStore';
import usePageStateStore from '@/store/pageStateStore';
import isIComponent from '@/utils/isIComponent';
import nodeTypes from './nodeTypes';

type FlowEditorProps = {};

const FlowEditor: FC<FlowEditorProps> = () => {
  const {canvas, selectedComponent} = useEditorStore((state) => ({canvas: state.canvas, selectedComponent: state.selectedComponent}));
  const {pageState, pageStateType} = usePageStateStore(state => ({pageState: state.pageState, pageStateType: state.pageStateType}));

  const nodes: Node[] = useMemo(() => {
    return canvas.children.map((id) => {
      const child = canvas.childrenMap[id];
      const selected = !!(selectedComponent && isIComponent(selectedComponent) && selectedComponent.id === id);

      return {
        id: String(id),
        type: child.type,
        position: {
          x: Number(child.style.left),
          y: Number(child.style.top),
        },
        data: {
          label: child.id
        },
        draggable: true,
        selected: selected,
      }
    })
  }, [canvas.children, canvas.childrenMap, selectedComponent]);

  const edges: Edge[] = [];

  return (
    <div className="w-full h-full">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes}
        fitView 
        style={{
          backgroundColor: '#fff'
        }}
      />
    </div>
  );
}

export default FlowEditor;
