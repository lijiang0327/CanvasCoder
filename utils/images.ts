import http from './http';

export const getAllImages = async () => {
  const url = `/api/images`;

  const {data} = await http.get(url);

  if (data.success) {
    return data.data;
  }

  return [];
}

export const deleteImage = async (image: string) => {
  const url = `${image}`;

  const {data} = await http.delete(url);

  return data;
}

export const uploadImage = async () => {}
