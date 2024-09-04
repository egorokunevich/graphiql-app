import axios, { AxiosResponse } from 'axios';

export const sendHttpRequest = async (
  method: string,
  url: string,
): Promise<AxiosResponse | undefined> => {
  switch (method) {
    case 'GET':
      return axios.get(url);
    case 'POST':
      return axios.post(url);
    case 'PUT':
      return axios.put(url);
    case 'PATCH':
      return axios.patch(url);
    case 'DELETE':
      return axios.delete(url);
    case 'HEAD':
      return axios.head(url);
    case 'OPTIONS':
      return axios.options(url);
    default:
      throw new Error('Invalid HTTP method');
  }
};
