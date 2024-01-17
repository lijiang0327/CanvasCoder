import http from './http';

export const getProjects = async () => {
  const url = '/api/projects';

  const result = await http.get(url);

  return result.data;
}

export const createProject = async (projectName: string) => {
  const url = '/api/projects';

  const result = await http.post(url, {
    projectName
  });

  return result.data;
}

export const deleteProject = async (projectName: string) => {
  const url = '/api/projects';

  const result = await http.delete(url, {
    params: {
      projectName
    }
  });

  return result.data;
}
