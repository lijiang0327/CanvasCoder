'use client';

import {FC, MouseEventHandler} from 'react';
import {Button, type ButtonProps} from 'antd'
import {IComponent} from '@/store/editorStore.d';
import {useRouter, useParams} from 'next/navigation'

interface ButtonComponentProps extends ButtonProps {
  componentData?: IComponent,
  isRendering?: boolean
}

const ButtonComponent: FC<ButtonComponentProps> = ({children, componentData, isRendering, style, ...rest}) => {
  const router = useRouter();
  const {projectname} = useParams<{projectname: string}>();

  const events: Record<string, MouseEventHandler | undefined> = {};
  const methods: Record<string, Function> = {
    'navigateTo': (page: string) => {
      router.push(`/view/${projectname}/${page}`)
    },
    'alert': (text: string) => {
      alert(text);
    }
  }

  if (componentData?.onClick) {
    events.onClick = () => {
      componentData.onClick?.forEach(({funcName, params}) => {
        methods[funcName](params);
      })
    }
  }

  return (
    <Button 
      {...rest} 
      onClick={isRendering ? events.onClick : undefined} 
      style={{...style, transition: 'none'}}
    >
      {children}
    </Button>
  )
}

export default ButtonComponent;
