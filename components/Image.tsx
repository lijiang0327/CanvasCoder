import {FC} from 'react';
import {Image, ImageProps} from 'antd';

import {IComponent} from '@/store/editorStore.d';
import defaultImage from '@/assets/images/defaultImage.svg';

interface ImageComponentProps extends ImageProps {
  componentData: IComponent
  isRendering: boolean
  alt: string
};

const ImageComponent: FC<ImageComponentProps> = ({componentData, isRendering, alt, ...rest}) => {
  const {style, src} = componentData;

  return (
    <Image src={src ?? defaultImage.src} width={style.width} height={style.height} fallback={defaultImage.src} alt={alt} {...rest}/>
  )
}

export default ImageComponent;
