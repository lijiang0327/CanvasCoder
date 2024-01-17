import ReactFlow from 'reactflow';
import {FC} from 'react';
import 'reactflow/dist/style.css';

import useEditorStore, {} from '@/store/editorStore';
import usePageStateStore from '@/store/pageStateStore';

type FlowEditorProps = {};

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
const FlowEditor: FC<FlowEditorProps> = () => {
  const canvas = useEditorStore((state) => state.canvas);
  const {pageState, pageStateType} = usePageStateStore(state => ({pageState: state.pageState, pageStateType: state.pageStateType}));

  return (
    <div className="w-full h-full">
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}

export default FlowEditor;
