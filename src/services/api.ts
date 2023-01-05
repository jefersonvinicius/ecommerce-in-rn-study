import axios from 'axios';
import {useEffect} from 'react';
import {useAuth} from '../modules/auth';

const api = axios.create({
  baseURL: 'http://192.168.122.1:3000/api',
});

export function configureAuthorizationTokenInterceptor(token: string) {
  return api.interceptors.request.use(config => {
    config.headers!.Authorization = `Bearer ${token}`;
    return config;
  });
}

export function removeAuthorizationTokenInterceptor(interceptorId: number) {
  api.interceptors.request.eject(interceptorId);
}

export function SetupAPI() {
  const [auth] = useAuth();

  useEffect(() => {
    if (!auth?.accessToken) return;
    const id = configureAuthorizationTokenInterceptor(auth.accessToken);
    return () => {
      removeAuthorizationTokenInterceptor(id);
    };
  }, [auth]);

  return null;
}

export default api;
