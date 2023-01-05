import {atom, selector, useRecoilState, useRecoilValue} from 'recoil';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthState = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

const auth = atom<AuthState | null>({
  key: 'auth',
  default: null,
});

export function useAuth() {
  return useRecoilState(auth);
}

const isAuthenticatedSelector = selector({
  key: 'isAuthenticated',
  get: ({get}) => {
    return !!get(auth);
  },
});

export function useIsAuthenticated() {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  return {isAuthenticated};
}
