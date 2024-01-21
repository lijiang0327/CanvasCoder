import TextNode from './Nodes/Text';
import ImageNode from './Nodes/Image';
import InputNode from './Nodes/Input';
import TitleNode from './Nodes/Title';
import ButtonNode from './Nodes/Button';

const nodeTypes = {
  'text': TextNode,
  'input': InputNode,
  'image': ImageNode,
  'title': TitleNode,
  'button': ButtonNode,
}

export default nodeTypes;
