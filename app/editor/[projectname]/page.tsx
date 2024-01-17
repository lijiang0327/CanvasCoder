'use client'
import {useEffect, useCallback} from 'react';
import {useParams} from 'next/navigation';
import {isEmpty, cloneDeep} from 'lodash';

import Center from './components/center/center';
import Header from './components/header/header';
import LeftSideBar from './components/leftSide/leftSideBar';
import RightSideBar from './components/rightSide/rightSideBar';
import {getPages, getPage} from '@/utils/pages';
import useEditorStore, {initCanvasData, setPages, setCurrentPage, initDefaultCanvasData} from '@/store/editorStore';
import {initState} from '@/store/pageStateStore';
import {initState as initGlobalState} from '@/store/globalStateStore';

const Editor = () => {
  const {projectname} = useParams<{projectname: string}>();
  const {pages, currentPage} = useEditorStore((state) => ({pages: state.allPages, currentPage: state.currentPage}))

  const fetchPages = useCallback(async () => {
    const result = await getPages(projectname);

    if (result.success) {
      setPages(result.data)
    }
  }, [projectname])

  const fetchPageData = useCallback(async (projectName: string, pageName: string) => {
    const result = await getPage(projectName, pageName);

    if (result.success) {
      initCanvasData(cloneDeep(result.data.canvas));
      result.data.pageState && initState(result.data.pageState);
      !isEmpty(result.data.globalState) && initGlobalState(result.data.globalState); 
    } else {
      initState({});
      initDefaultCanvasData();
    }
  }, [])

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    if (!pages.length || currentPage) {
      return;
    }

    setCurrentPage(pages.includes('index.json') ? 'index.json' : pages[0])
  }, [pages, currentPage])

  useEffect(() => {
    if (!currentPage || !projectname) {
      return;
    }

    fetchPageData(projectname, currentPage)
  }, [currentPage, projectname, fetchPageData])

  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <Header className="h-14"/>
      <div className="flex-1 flex relative">
        <LeftSideBar className="h-full bg-slate-100" />
        <Center className="w-full h-full bg-slate-50 flex-1 flex items-center justify-center overflow-hidden" />
        <RightSideBar className="h-full bg-slate-100 w-80" />
      </div>
    </div>
  )
}

export default Editor;
