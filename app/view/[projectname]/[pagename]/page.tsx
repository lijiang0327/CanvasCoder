'use client'
import {useEffect, useCallback, useState} from 'react';
import {useParams} from 'next/navigation'
import classNames from 'classnames';
import {omit} from 'lodash';
import {useWindowSize} from '@uidotdev/usehooks'

import usePageStore, {setCanvasState} from '@/store/pageStore';
import {initState} from '@/store/pageStateStore';
import {getPage} from '@/utils/pages';
import Cmp from '@/components/Cmp';

const Page = () => {
  const canvasState = usePageStore((state) => state.canvas);
  const {projectname, pagename} = useParams<{projectname: string, pagename: string}>();
  const [loading, setLoading] = useState(false);
  const size = useWindowSize();

  const fetchPageData = useCallback(async (projectName: string, pageName: string) => {
    setLoading(true);
    const result = await getPage(projectName, pageName);
    setLoading(false);
    if (result.success) {
      setCanvasState(result.data.canvas);
      initState(result.data.pageState);
    } else {
      setCanvasState(null);
    }
  }, [])

  useEffect(() => {
    fetchPageData(projectname, pagename);

    return () => {
      setCanvasState(null);
    }
  }, [fetchPageData, projectname, pagename])

  if (loading) {
    return <div className="text-center mt-10">loading</div>
  }

  if (!canvasState) {
    return <div className='text-center mt-10'>not found this page</div>;
  }

  const {style, children} = canvasState;

  const ratioX = Number(style.width) / Number(size.width);
  const ratioY = Number(style.height) / Number(size.height);

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <div
        style={{
          ...omit(style, 'position', 'top', 'left'),
          position: 'relative',
          transform: `scaleX(${1 / (ratioX || 1)}) scaleY(${1 / (ratioY || 1)})`,
          transformOrigin: 'left top',
        }}
        className={classNames(
          'shadow flex-1',
        )}
        role="application"
      >
        {children?.map((id) => {
          const child = canvasState.childrenMap[id];

          return (
            <Cmp componentData={child} key={id} isRendering parent={canvasState} />
          )
        })}
      </div>
    </div>
  )
}

export default Page;
