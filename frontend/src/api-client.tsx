import axios, { AxiosInstance } from 'axios';

export class HttpClient {
  private api: AxiosInstance;
  constructor() {
    const baseURL = 'http://localhost:3000';

    this.api = axios.create({ baseURL });
  }

  get<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.api
        .get(url)
        .then((response) => {
          resolve(response.data as T);
        })
        .catch((response) => {
          console.error(response);
          reject(response);
        });
    });
  }
  post<T, K>(url: string, payload: K): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.api
        .post(url, payload)
        .then((response) => {
          resolve(response.data as T);
        })
        .catch((response) => {
          console.error(response);
          reject(response);
        });
    });
  }
}
