import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useAuthCheck } from './useAuthCheck';
import { api } from '../../../main';
import tokenStorage from '../../../token/tokenStorage';

export function useLogin() {
   const { checkAuth } = useAuthCheck();

   const { mutateAsync, ...rest } = useMutation({
      mutationFn: (data: LoginRequest) => api.auth.login(data),
   });

   const login = useCallback(
      async (values: LoginRequest) => {
         const response = await mutateAsync(values);
         const token = response.token;

         if (!token) {
            return;
         }

         tokenStorage.setToken(token);
         await checkAuth();
      },
      [mutateAsync, checkAuth]
   );

   return {
      login,
      ...rest,
   };
}
