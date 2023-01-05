import {useCallback} from 'react';
import {useAuth} from '.';
import API, {LogInPayload} from '../../services';

export function useLogInAction() {
  const [, setAuth] = useAuth();

  return useCallback(
    async (loginPayload: LogInPayload) => {
      try {
        const result = await API.logIn(loginPayload);
        setAuth(result);
      } catch (error) {
        throw error;
      }
    },
    [setAuth],
  );
}
