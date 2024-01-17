import type {ICanvas} from '@/store/editorStore.d';
import http from './http';

type SavePageDataType = {
  canvas: ICanvas
  pageState?: Record<string, unknown>
  globalState?: Record<string, unknown>
  title: string
}

export const savePage = async (projectName: string, data: SavePageDataType) => {
  const url = `/api/${projectName}/pages`;

  const result = await http.post(url, data);

  return result.data;
}

export const getPages = async (projectName: string) => {
  const url = `/api/${projectName}/pages`;

  const result = await http.get(url);

  return result.data;
}

export const getPage = async (projectName: string, pageName: string) => {
  const url = `/api/${projectName}/pages/${pageName}`;

  const result = await http.get(url);

  return result.data;
}

export const deletePage = async (projectName: string, pageName: string) => {
  const url = `/api/${projectName}/pages/${pageName}`;

  const result = await http.delete(url);

  return result.data;
}
