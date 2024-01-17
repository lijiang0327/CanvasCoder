import http from './http';

export const getEditorData = async (pageName: string) => {
  const url = '/api/editor';

  const result = await http.get(url, {params: {pageName}});

  return result.data;
}